import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import SideNavInstructor from './SideNavInstructor'
import { useNavigate } from 'react-router-dom'
import { listOfAssignedLectures } from '../apis/instructorApis'

const HomeInstructor = () => {

    const [lectureDetails, setLectureDetails] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAssignedLectures() {
            try {
                let payload = {
                    instructorId: localStorage.getItem('instructorId')
                }
                const response = await listOfAssignedLectures(payload)
                console.log(response.response)
                setLectureDetails(response.response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAssignedLectures()
    }, [])

    const handleSwitchToAdminLogin = () => {
        localStorage.clear();
        navigate('/adminLogin');
    }

    return (
        <div className='wrapper'>
            <Header />
            <SideNavInstructor />
            <div className="content-wrapper">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">
                                    Hello {localStorage.getItem('name')}
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active">Instructor</li>
                                    <a onClick={handleSwitchToAdminLogin} style={{ color: 'blue', cursor: 'pointer' }} className="breadcrumb-item">Switch to Admin</a>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Assigned Lectures</h3>
                                    </div>

                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Course Name</th>
                                                    <th>Lecture</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {lectureDetails.map((detail, index) => (
                                                    <tr key={index}>
                                                        <td>{detail.course.name}</td>
                                                        <td>{detail.lecture.name}</td>
                                                        <td>{new Date(detail.date).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
            <Footer />
        </div>
    )
}

export default HomeInstructor