import React, { useState } from 'react'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { instructorLogin } from '../apis/instructorApis'
import { useNavigate } from 'react-router-dom';

const LoginInstructor = () => {

    const [instructorUsername, setInstructorUsername] = useState('')
    const [instructorPassword, setInstructorPassword] = useState('')
    const navigate = useNavigate();

    const handleInstructorLogin = async (event) => {
        event.preventDefault();

        if (!instructorUsername.trim()) {
            toastr.error('Username required')
            return
        } else if (!instructorPassword.trim()) {
            toastr.error('Password required')
            return
        } else {

            try {
                let instructorPayload = {
                    username: instructorUsername,
                    password: instructorPassword
                }
                const response = await instructorLogin(instructorPayload)
                console.log(response)
                toastr.success(response.message)

                localStorage.setItem('token', response.token);
                localStorage.setItem('name', response.name);
                localStorage.setItem('instructorId', response.instructorId);

                setTimeout(() => {
                    window.location.href = '/instructor/home'
                }, 1200)

            } catch (error) {
                toastr.error('Invalid Credentials')
                console.log(error)
            }
        }

    }

    const handleInstructorUsernameChange = (event) => {
        setInstructorUsername(event.target.value);
    };

    const handleInstructorPasswordChange = (event) => {
        setInstructorPassword(event.target.value);
    };

    const handleSwitchToAdminLogin = () => {
        localStorage.clear();
        navigate('/adminLogin');
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div style={{ paddingBottom: '1rem', textAlign: 'end' }}>
                    Login as&nbsp;<a onClick={handleSwitchToAdminLogin} style={{ color: 'blue', cursor: 'pointer' }}>Admin</a>
                </div>

                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a className="h1">Instructor Login</a>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleInstructorLogin}>
                            <div className="input-group mb-3">
                                <input type="text" value={instructorUsername} onChange={handleInstructorUsernameChange} className="form-control" placeholder="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" value={instructorPassword} onChange={handleInstructorPasswordChange} className="form-control" placeholder="Password" />
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

export default LoginInstructor