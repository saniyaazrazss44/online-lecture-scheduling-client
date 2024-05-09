import axios from "axios";
const backendUrl = `https://online-lecture-scheduling-server.onrender.com/instructor`

export const instructorLogin = async ({ username, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`
        const reqPayload = { username, password }
        const response = await axios.post(reqUrl, reqPayload)
        console.log(response)
        return response.data
    } catch (error) {
        toastr.error('Invalid Credentials')
        console.log(error)
    }
}

export const listOfAssignedLectures = async ({ instructorId }) => {
    try {
        const reqUrl = `${backendUrl}/listOfAssignedLectures`
        const reqPayload = { instructorId }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}