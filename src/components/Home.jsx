import React, { useEffect, useState } from 'react'
import Header from './Header'
import SideNav from './SideNav'
import Footer from './Footer'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { listOfInstructors, addInstructors, addCourses, addLectures, assignLectures, getListOfAllCourses } from '../apis/adminApis'
import { useNavigate } from 'react-router-dom';

function Home() {

    const [selectedDate, setSelectedDate] = useState('');
    const [instName, setInstName] = useState('');
    const [instUsername, setInstUsername] = useState('');
    const [instPassword, setInstPassword] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseImg, setCourseImg] = useState('');
    const [nameOfLecture, setNameOfLecture] = useState('');
    const [courseId, setCourseId] = useState('');
    const [lectureId, setLectureId] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const response = await listOfInstructors()
                setInstructors(response.instructors)
            } catch (error) {
                console.log(error)
            }
        }
        fetchInstructors()
    }, [])

    useEffect(() => {
        async function fetchAllCourses() {
            try {
                const response = await getListOfAllCourses()
                console.log(response.courses)
                setCourses(response.courses)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCourses()
    }, [])

    const handleAssignLectureModal = (lectureId, courseId) => {
        setLectureId(lectureId)
        setCourseId(courseId)
        console.log("course id:", courseId)
        console.log("lecture id:", lectureId)
    }

    const handleAssignLecture = async () => {
        if (!selectedDate.trim()) {
            toastr.error('Please select a date')
            return
        } else if (!selectedInstructor.trim()) {
            toastr.error('Please select instructor')
            return
        } else {

            try {
                let payload = {
                    courseId: courseId,
                    instructorId: selectedInstructor,
                    lectureId: lectureId,
                    date: selectedDate
                }
                const response = await assignLectures(payload)
                console.log(response)
                toastr.success(response.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1200)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleAddLectureModalClick = (courseId) => {
        setCourseId(courseId)
    }

    const handleAddLectureClick = async () => {
        if (!nameOfLecture.trim()) {
            toastr.error('Name of lecture is required')
            return
        } else {
            try {
                let payload = {
                    courseId: courseId,
                    name: nameOfLecture
                }
                const response = await addLectures(payload)
                console.log(response)

                toastr.success(response.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1200)

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleNameOfLectureChange = (event) => {
        setNameOfLecture(event.target.value)
    }

    const handleAddNewCourse = async (event) => {
        event.preventDefault();
        if (!courseName.trim()) {
            toastr.error('Course Name is required')
            return
        } else if (!courseLevel.trim()) {
            toastr.error('Course Level is required')
            return
        } else if (!courseDescription.trim()) {
            toastr.error('Course Description is required')
            return
        } else if (!courseImg.trim()) {
            toastr.error('Course Image is required')
            return
        } else {

            try {
                let payload = {
                    name: courseName,
                    level: courseLevel,
                    description: courseDescription,
                    image: courseImg
                }
                const response = await addCourses(payload)
                toastr.success(response.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1200)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCourseNameChange = (event) => {
        setCourseName(event.target.value)
    }
    const handleCourseLevelChange = (event) => {
        setCourseLevel(event.target.value)
    }
    const handleCourseDescriptionChange = (event) => {
        setCourseDescription(event.target.value)
    }
    const handleCourseImgChange = (event) => {
        setCourseImg(event.target.value)
    }

    const handleAddInstructor = async () => {

        if (!instName.trim()) {
            toastr.error('Name is required')
            return
        } else if (!instUsername.trim()) {
            toastr.error('Username is required')
            return
        } else if (!instPassword.trim()) {
            toastr.error('Password is required')
            return
        } else {

            try {
                let payload = {
                    name: instName,
                    username: instUsername,
                    password: instPassword
                }
                const response = await addInstructors(payload)

                toastr.success(response.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1200)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleInstNameChange = (event) => {
        setInstName(event.target.value);
    }

    const handleInstUsernameChange = (event) => {
        setInstUsername(event.target.value);
    }

    const handleInstPasswordChange = (event) => {
        setInstPassword(event.target.value);
    }

    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        const parsedDate = new Date(inputDate);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setSelectedDate(formattedDate);
        console.log('Selected date:', formattedDate);
    };

    const handleSwitchToInstructorLogin = () => {
        localStorage.clear();
        navigate('/instructorLogin');
    };

    return (
        <div className='wrapper'>
            <Header />
            <SideNav />
            <div className="content-wrapper">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active">Admin</li>
                                    <a onClick={handleSwitchToInstructorLogin} style={{ color: 'blue', cursor: 'pointer' }} className="breadcrumb-item">Switch to Instructor</a>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-block btn-primary" data-toggle="modal" data-target="#modal-default">Add Instructor</button>
                            </div>
                        </div>

                        <div className="row" style={{ paddingBottom: '1rem' }}>

                            <div className="col-md-12">

                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Add New Course</h3>
                                    </div>

                                    <form onSubmit={handleAddNewCourse}>
                                        <div className="card-body" style={{ display: 'flex' }}>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input value={courseName} onChange={handleCourseNameChange} type="text" className="form-control" id="" placeholder="Enter name" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Level</label>
                                                    <input value={courseLevel} onChange={handleCourseLevelChange} type="text" className="form-control" id="" placeholder="Enter level" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <input value={courseDescription} onChange={handleCourseDescriptionChange} type="text" className="form-control" id="" placeholder="Enter description" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Image</label>
                                                    <input value={courseImg} onChange={handleCourseImgChange} type="text" className="form-control" id="" placeholder="Enter image url" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Add Course</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h3 className="m-0 pb-4">All Courses</h3>
                                    </div>
                                </div>

                                {courses.map((course, index) => (

                                    <div className="card" key={index}>
                                        <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h3 className="card-title">{course.name}</h3>
                                            <div className="card-tools ml-auto">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <button onClick={() => handleAddLectureModalClick(course._id)}
                                                    type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-sm">Add Lecture</button>
                                            </div>
                                        </div>

                                        {course.lectures.map((lecture, index) => (

                                            <div key={index} className="card-body" style={{ display: 'flex' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                                    <i className="fas fa-angle-right"></i>
                                                    <a>{lecture.name}</a>
                                                </div>
                                                <div className='ml-auto'>
                                                    <button onClick={() => handleAssignLectureModal(lecture._id, course._id)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-lg">Assign Lecture</button>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                <div className="modal fade" id="modal-default">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Instructor</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input value={instName} onChange={handleInstNameChange} type="text" className="form-control" id="" placeholder="Name of the instructor" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Username</label>
                                        <div className="col-sm-10">
                                            <input value={instUsername} onChange={handleInstUsernameChange} type="text" className="form-control" id="" placeholder="Enter Username" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input value={instPassword} onChange={handleInstPasswordChange} type="password" className="form-control" id="" placeholder="Enter password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button onClick={handleAddInstructor} type="button" className="btn btn-primary">Add instructor</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-sm">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Lecture</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="col-form-label">Name of the Lecture</label>
                                    <div className="">
                                        <input type="text" value={nameOfLecture} onChange={handleNameOfLectureChange} className="form-control" id="" placeholder="Enter Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" onClick={handleAddLectureClick} className="btn btn-primary">Add Lecture</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-lg">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Assign Lecture</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label>Select Instructors</label>
                                    <select onChange={(e) => setSelectedInstructor(e.target.value)} className="form-control select2" style={{ width: '100%' }}>
                                        {instructors.map((instructor, index) => (
                                            <option key={instructor._id} value={instructor._id}>
                                                {instructor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Select Date</label>
                                    <input className="form-control" value={selectedDate}
                                        onChange={handleDateChange} type='date' />
                                </div>

                            </div>
                            <div className="modal-footer justify-content-between">
                                <button onClick={handleAssignLecture} type="button" className="btn btn-primary">Assign</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Home
