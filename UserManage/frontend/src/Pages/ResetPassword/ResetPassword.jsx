import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space, } from 'antd';
import { serverUrl } from '../../ServerUrl';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {
            email: email,
        }
        // console.log(data)
        axios
            .post(`${serverUrl}/api/auth/resetPassword`, data)
            .then(res => {
                navigate('/');
                window.alert('Email sent successfully!')
            })
            .catch(err => {
                window.alert('Email sent failed!');
            })

    }

    return (
        <>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>Reset Password</h1>
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
            <Form wrapperCol={{ span: 40 }}>
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
                    >Send Link to Email</Button>
                    <Button type="primary" danger htmlType='reset'>Reset</Button>
                    <Link to={'/'}>
                        <Button type="primary">Back to Login</Button>
                    </Link>
                </Space>
            </Form>
        </div>
        </>
    )
}

export default ResetPassword
