import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../ServerUrl';
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../Redux/Ducks/GetUser';
import { ReqestDelete } from '../../Redux/Ducks/DeleteUser';



function ViewUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Loading = useSelector((state) => ({ ...state.user }));
    const GetAllData = useSelector((state) => ({ ...state.getAllUsers }));

    //----------------------------------------------Logout-------------------------------------------------------------------------------
    const logout = () => {
        const logout = window.confirm("Are you sure you want to log out?");
        if (logout) {
            sessionStorage.clear();
            navigate('/');
        }

    }

    //---------------------------------------------Delete User----------------------------------------------------------------------------------------
    const deleteUser = (id) => {
        const logout = window.confirm("Are you sure to delete user?");
        if (logout) {
            dispatch(ReqestDelete(id));
            fetch();
        }

    }
    useEffect(() => {
        fetch()
    }, [])
    //---------------------------------------------Fetch User----------------------------------------------------------------------------------------
    const fetch = () => {
        dispatch(GetUser());
    }

    if (Loading.loading) {
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
                                    GetAllData.users.map(getUser => (
                                        <tr key={getUser._id}>
                                            <td>{getUser.name}</td>
                                            <td>{getUser.email}</td>
                                            <td>
                                                <Link to={'/updateUser/' + getUser._id}>
                                                    <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger"
                                                    onClick={() => {
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <button className="btn btn-danger" onClick={logout}><AiIcons.AiOutlineLogout /> Log Out</button>
                </div>

            </>
        )
    } else {
        // window.alert("Please Login to Access")
        return (
            <>
                {navigate('/')}
            </>
        )
    }
}

export default ViewUser
