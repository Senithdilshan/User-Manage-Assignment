const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const models = require('../model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Joi = require('joi')
const URL = process.env.PASSWORDRESETURL;
//-------------------------------------------Sign Up---------------------------
async function signup(req, res) {

    // console.log(req.body);
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
    })

    const results = userSchema.validate(req.body)
    // console.log(results);
    if (results.error) {
        res.status(403).send();
    } else {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);

        if (!req.body) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        try {
            const UserDoc = models.User({
                name: name,
                email: email,
                password: hashpass,

            });
            await UserDoc.save();
            res.json({
                userid: UserDoc.id
            });

        } catch (error) {
            console.log(error);
            res.json({
                Error: "Already Exists"
            });
        }
    }




}
//-------------------------------------------Get All---------------------------
async function getAll(req, res) {
    try {
        models.User.find()
            .then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            })

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

//-------------------------------------------LOG IN---------------------------
async function login(req, res) {

    const { email, password } = req.body;
    // console.log(req.body);

    if (!email || !password) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }


    try {
        const userEmail = await models.User.findOne(
            { email: email }
        )

        if (!userEmail) throw new error('User Not found ');
        const userHashedPass = userEmail.password;
        const comparedPass = bcrypt.compareSync(password, userHashedPass);
        if (comparedPass) {
            const accessToken = jwt.sign({
                userName: userEmail.name,
                UserEmail: userEmail.email,
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            })
            const refreshToken = createRefreshToken(userEmail.email);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,//ACCESSIBLE ONLY WEB SERVER
                sameSite: 'None',//CROSS-SITE COOKIE
                secure: true,//HTTPS
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.send({
                name:userEmail.name,
                email: userEmail.email,
                accessToken: accessToken,
            });

            try {
                const userDb = await models.RefreshToken.findOne(
                    { email: userEmail.email }
                );
                // console.log(userDb);
                if (!userDb) {
                    const AuthUserRefreshToken = models.RefreshToken({
                        email: userEmail.email,
                        refreshToken: refreshToken,
                    });
                    await AuthUserRefreshToken.save();
                }
            } catch (error) {
                res.status(500).send();
            }


            // res.json({
            //     accessToken: accessToken,
            //     refreshToken: refreshToken,
            //     userName: userEmail.name
            // });
        } else {
            res.status(500).send();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}
//-------------------------------------------Refresh---------------------------
async function refresh(req, res) {
    const cookies = req.cookies;
    // console.log(req.cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    const decodeToken = jwt.decode(refreshToken);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        const foundUser = await models.User.findOne(
            { email: decodeToken.email }
        );

        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
        const accessToken = jwt.sign({
            userName: foundUser.name,
            UserEmail: foundUser.email,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        res.json({ accessToken });
    })
}

//-------------------------------------------LogOut---------------------------------
const LogOut = (req, res) => {
    const cookies = req.cookies;
    console.log(req.cookies);
    if (!cookies?.jwt) return res.status(204);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });

}



//-------------------------------------------Reset Pasword---------------------------
async function resetPassword(req, res) {
    const email = req.body.email;
    // console.log(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const userEmail = await models.User.findOne(
            { email: email }
        );
        if (!userEmail) throw new error('User Not found ');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dealzsuperproject@gmail.com',
                pass: 'rwsnwviflkvrpkfi'
            }
        });

        transporter.sendMail({
            from: 'dealzsuperproject@gmail.com',
            to: userEmail.email,
            subject: 'Password Reset',
            text: `It seems like you forgot your password ${userEmail.name}. \nIf this is true, click the link below to reset your password.\nReset my password [${URL}/updatePassword/${userEmail.id}]\n\n\nIf you did not forget your password, please disregard this email.`
        })

        res.json({
            email: userEmail.email,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }

}



//-------------------------------------------Reset & Update Pasword---------------------------

async function updatePassword(req, res) {
    const userSchema = Joi.object({
        id: Joi.string().required(),
        password: Joi.string().min(6).max(15).required(),
    })

    const results = userSchema.validate(req.body)
    if (results.error) {
        res.status(403).send();
    } else {
        const id = req.body.id;
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);
        // console.log(req.body);

        if (!req.body) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        try {
            const userEmail = await models.User.findById(id);
            if (!userEmail) throw new error('User Not found ');
            const updateUSer = await models.User.findByIdAndUpdate(userEmail.id, {
                password: hashpass
            }, { new: true })
            // res.json({
            //     password: password,
            // })

        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }

}
//-------------------------------------------Update User---------------------------
async function UpdateUser(req, res) {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const userEmail = await models.User.findById(id);
        if (!userEmail) throw new error('User Not found ');
        const updateUSer = await models.User.findByIdAndUpdate(userEmail.id, {
            name: name,
            email: email
        }, { new: true })
        res.send({
            name: name,
            email: email
        })

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}
//-------------------------------------------Delete User---------------------------
async function DeleteUser(req, res) {
    models.User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "No user found with id " + req.params.id
                });
            }
            res.json({ message: 'User Deleted Successfully' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        })
}

//-------------------------------------------Create Refresh Token---------------------------
function createRefreshToken(email) {
    return jwt.sign({
        email: email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    });

}


module.exports = {
    signup,
    getAll,
    login,
    resetPassword,
    refresh,
    LogOut,
    updatePassword,
    UpdateUser,
    DeleteUser,
};