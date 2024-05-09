import React, { useState } from 'react'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { adminLogin } from '../apis/adminApis'
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {

    const [adminUsername, setAdminUsername] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const navigate = useNavigate();

    const handleAdminLogin = async (event) => {
        event.preventDefault();

        if (!adminUsername.trim()) {
            toastr.error('Username required')
            return
        } else if (!adminPassword.trim()) {
            toastr.error('Password required')
            return
        } else {

            try {
                let adminPayload = {
                    username: adminUsername,
                    password: adminPassword
                }
                const response = await adminLogin(adminPayload)
                console.log(response)
                toastr.success(response.message)

                sessionStorage.setItem('token', response.token);

                setTimeout(() => {
                    window.location.href = '/admin/home'
                }, 1200)

            } catch (error) {
                toastr.error('Invalid Admin Credentials')
                console.log(error)
            }
        }

    }

    const handleAdminUsernameChange = (event) => {
        setAdminUsername(event.target.value);
    };

    const handleAdminPasswordChange = (event) => {
        setAdminPassword(event.target.value);
    };

    const handleSwitchToInstructorLogin = () => {
        sessionStorage.clear();
        navigate('/instructorLogin');
    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div style={{ paddingBottom: '1rem', textAlign: 'end' }}>
                    Login as&nbsp;<a onClick={handleSwitchToInstructorLogin} style={{ color: 'blue', cursor: 'pointer' }}>Instructor</a>
                </div>

                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a className="h1">Admin Login</a>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAdminLogin}>
                            <div className="input-group mb-3">
                                <input type="text" value={adminUsername} onChange={handleAdminUsernameChange} className="form-control" placeholder="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" value={adminPassword} onChange={handleAdminPasswordChange} className="form-control" placeholder="Password" />
                            </div>
                            <div className="row">

                                <div className="col-4">
                                    <button type='submit' className="btn btn-primary btn-block">Log In</button>
                                </div>

                            </div>
                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginAdmin