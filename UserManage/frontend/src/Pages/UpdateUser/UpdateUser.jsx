import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Space, } from 'antd';
import { serverUrl } from '../../ServerUrl';
import { useDispatch } from 'react-redux';
import { ReqestUpdate } from '../../Redux/Ducks/UpdateUser';
import { GetUser } from '../../Redux/Ducks/GetUser';

function UpdateUser() {
    const token = sessionStorage.getItem('token');
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const data = {
            id: id,
            name: name,
            email: email,
        }

        dispatch(ReqestUpdate(data));
        dispatch(GetUser(token));
        navigate('/viewUsers');

    }
    useEffect(() => {
    }, [])

    if (!token) {
        return (
            <>
                {navigate('/')}
            </>
        )
    }
    return (
        <>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>Update User</h1>
            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <Form wrapperCol={{ span: 40 }}>
                    <Form.Item name="name" label='Name'
                        rules={[
                            { required: true, message: "Please Enter Your Name" },
                            { whitespace: true, message: "Fields are required" }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item name="email" label='Email'
                        rules={[
                            { required: true, message: "Please Enter Your Email" },
                            { type: "email", message: "Email is not a valid one" }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Space>
                        <Button type="primary" htmlType='submit'
                            onClick={() => {
                                handleSubmit()
                            }}
                        >Update User</Button>
                        <Button type="primary" danger htmlType='reset'>Reset</Button>
                        <Link to={'/viewUsers'}>
                            <Button type="primary">Back</Button>
                        </Link>
                    </Space>
                </Form>
            </div>
        </>
    )
}

export default UpdateUser
