const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../model')


async function authenticatoken(req, res, next) {
    const authHeader = req.headers['authorization']
    // console.log({ authHeader });

    if (!authHeader) return res.sendStatus(401)
    let token = authHeader.split(' ')[1];
    // const token=authHeader.slice(7);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        const decodeToken = jwt.decode(token);
        if (err) {

            console.log('JWT Error', err)
            return res.status(403).json({ message: 'Unauthorized' })
        }
        req.name = decodeToken.name
        req.email = decodeToken.email
        next()
        // console.log(decodeToken.UserEmail); 
    });
};

module.exports = authenticatoken;