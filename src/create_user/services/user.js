import axios from 'axios';

const PORT = 3001;
const endPoint = 'api/users';
const baseUrl = `http://localhost:${PORT}/${endPoint}`;

const createNewUser = async (newUser) => {
    const response = await axios.post(baseUrl, newUser);
    return response.data;
}

const getAllUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const getUser = async (userToken) => {
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    const response = await axios.get(baseUrl, config);
    return response.data;
}

const updateUser = async (user) => {
    const response = await axios.put(baseUrl+'/'+user.id, user);
    return response.data;
}

export default {
    createNewUser,
    getAllUsers,
    getUser,
    updateUser
}