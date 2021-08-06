import axios from 'axios'

const PORT = 3001;
const endPoint = 'api/login';
const baseUrl = `http://localhost:${PORT}/${endPoint}`;

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default {login};