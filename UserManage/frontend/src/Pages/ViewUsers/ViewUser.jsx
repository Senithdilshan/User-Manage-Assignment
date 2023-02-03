import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../ServerUrl';
import * as AiIcons from "react-icons/ai";
import { useSelector } from 'react-redux';



function ViewUser() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const data=useSelector((state)=>state.user);
    console.warn("This is redux",data);

    const deleteUser = (id) => {
        axios.
            delete(`${serverUrl}/api/auth/deleteUser/`+id, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then((user) => {
                window.alert('User Deleted Sucessfully')
                fetch()
            })
            .catch((error) => {
                console.error(error)
                window.alert('User Delete Failed')
            })
    }
    const fetch = () => {
        axios
            .get(`${serverUrl}/api/auth/getAll`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                // console.log(res.data)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
                window.alert("Please Login to Access")
                navigate('/')
            })
    }
    useEffect(() => {
        fetch()
    }, [])

    if (!token) {
        return (
            <>
                {navigate('/')}
            </>
        )}
    return (
        <>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>User List</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '100vw' }}>

                <div style={{ width: '600px' }}>
                    <table className="table table-bordered table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col-dark">Name</th>
                                <th scope="col-dark">Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(getUser => (
                                    <tr key={getUser._id}>
                                        <td>{getUser.name}</td>
                                        <td>{getUser.email}</td>
                                        <td>
                                            <Link to={'/updateUser/'+getUser._id}>
                                                <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => {
                                                    console.log(getUser._id);
                                                    deleteUser(getUser._id)
                                                }}
                                            ><AiIcons.AiTwotoneDelete /></button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewUser
