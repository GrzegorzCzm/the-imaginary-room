import axios from 'axios';

const PORT = 3001;
const endPoint = 'api/stories';
const baseUrl = `http://localhost:${PORT}/${endPoint}`;

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const createNewStory = async (storyDetails, userToken) => {
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    try{
        const response = await axios.post(baseUrl, storyDetails, config);
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const getStory = async (storyId) => {
    try{
        const response = await axios.get(baseUrl+'/'+storyId);
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const getAllStories = async () => {
    try{
        console.log('GET ALL STORIES!!')
        const response = await axios.get(baseUrl+'/browseStories');
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const updateStory = async (newStory, userToken) => {
    const storyId = newStory.id;
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    try{
        const response = await axios.put(baseUrl+'/'+storyId, newStory, config);
        return response.data;
    }
    catch(err) {
        throw err;
    }

}

const updateStoryNode = async (storyId, newStoryNode, userToken) => {
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    try{
        const response = await axios.put(baseUrl+'/updateStoryNode/'+storyId, newStoryNode, config);
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const createStoryNode = async (storyId, newStoryNode, userToken) => {
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    try{
        const response = await axios.put(baseUrl+'/createStoryNode/'+storyId, newStoryNode, config);
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const deleteStoryNode = async (storyId, nodeId, userToken) => {
    const config = {
        headers: { 
            Authorization: userToken 
        }
    }
    const nodeToDelete = {
        node_id: nodeId
    }
    try{
        const response = await axios.put(baseUrl+'/deleteStoryNode/'+storyId, nodeToDelete, config);
        return response.data;
    }
    catch(err) {
        throw err;
    }
}

const cancelRequests = () => {
    source.cancel();
}

export default {
    createNewStory,
    getStory,
    updateStory,
    updateStoryNode,
    createStoryNode,
    deleteStoryNode,
    cancelRequests,
    getAllStories
}