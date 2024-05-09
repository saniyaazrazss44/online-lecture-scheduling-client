import axios from "axios";
const backendUrl = `https://online-lecture-scheduling-server.onrender.com/admin`

export const adminLogin = async ({ username, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`
        const reqPayload = { username, password }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        toastr.error('Invalid Admin Credentials')
        console.log(error)
    }
}

export const listOfInstructors = async () => {
    try {
        const reqUrl = `${backendUrl}/listOfInstructors`
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(reqUrl, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addInstructors = async ({ name, username, password }) => {
    try {
        const reqUrl = `${backendUrl}/addInstructors`
        const reqPayload = { name, username, password }
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            toastr.error(error.response.data.message)
            return
        }
    }
}

export const addCourses = async ({ name, level, description, image }) => {
    try {
        const reqUrl = `${backendUrl}/addCourses`
        const reqPayload = { name, level, description, image }
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addLectures = async ({ courseId, name }) => {
    try {
        const reqUrl = `${backendUrl}/courses/addLectures`
        const reqPayload = { courseId, name }
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const assignLectures = async ({ courseId, instructorId, lectureId, date }) => {
    try {
        const reqUrl = `${backendUrl}/courses/assignLectures`
        const reqPayload = { courseId, instructorId, lectureId, date }
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
        toastr.error(error.response.data.message)
    }
}

export const getListOfAllCourses = async () => {
    try {
        const reqUrl = `${backendUrl}/courses/getListOfAllCourses`
        const token = sessionStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.get(reqUrl, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}