import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Input, Space, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import { serverUrl } from '../../ServerUrl';



function SignIn() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit=()=>{
        const data={
            name:name,
            email:email,
            password:password
        }
        // console.log(data)
        axios
        .post(`${serverUrl}/api/auth/signup`,data)
        .then(res =>{
            navigate('/');
            window.alert('Signed up successfully')
        })
        .catch(err =>{
            window.alert('Sign up failed');
        })

    }

    return (
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
            <Form wrapperCol={{ span: 40 }}>
                <Form.Item name="name" label='Name'
                    rules={[
                        { required: true, message: "Please Enter Your Name" },
                        { whitespace: true, message: "Fields are required" }
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Enter Your Name" value={name} onChange={e=>setName(e.target.value)} />
                </Form.Item>

                <Form.Item name="email" label='Email'
                rules={[
                    { required: true, message: "Please Enter Your Email" },
                    { type:"email",message:"Email is not a valid one" }
                ]}
                hasFeedback
                >
                    <Input placeholder="Enter Your Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </Form.Item>

                <Form.Item name="password" label='Password'
                rules={[
                    { required: true, message: "Password is required" },
                    { min: 6, message: "Password must be at least 6 characters long"},
                    {max: 20, message: "Password must be at most 20 characters long"},
                ]}
                hasFeedback
                >
                    <Input.Password placeholder="Enter a Password" value={password} onChange={e=>setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item name="confirmPassword" label='Confirm Password'
                dependencies={['password']}
                rules={[
                    { required: true, message: "Confirm Password is required" },
                    ({getFieldValue})=>({
                        validator(_,value){
                            if(!value || getFieldValue('password')===value){
                                return Promise.resolve();
                            }
                            return Promise.reject("Password does not match")
                        }
                    })
                ]}
                hasFeedback
                >
                    <Input.Password placeholder="Confirm Password" value={confirmpassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType='submit' 
                        onClick={()=>{
                            handleSubmit()
                        }}
                    >Sign Up</Button>
                    <Button type="primary" danger htmlType='reset'>Reset</Button>
                    <Link to={'/'}>
                        <Button type="primary">Back</Button>
                    </Link>
                </Space>
            </Form>
        </div>
    )
}

export default SignIn
