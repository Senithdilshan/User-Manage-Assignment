import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Space, } from 'antd';
import { serverUrl } from '../../ServerUrl';

function FillResetPassword() {
    const {id}=useParams();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {
            id: id,
            password:password,
        }
        console.log(data)
        axios
            .put(`${serverUrl}/api/auth/updatePassword`, data)
            .then(res => {
                navigate('/');
                window.alert('Password Reset Success!')
            })
            .catch(err => {
                window.alert('Password reset failed!');
            })

    }
    useEffect(()=>{
    },[])

    return (
        <>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>Update Password</h1>
        <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
            <Form wrapperCol={{ span: 40 }}>
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
                        onClick={() => {
                            handleSubmit()
                        }}
                    >Reset Password</Button>
                    <Button type="primary" danger htmlType='reset'>Reset</Button>
                </Space>
            </Form>
        </div>
        </>
    )
}

export default FillResetPassword