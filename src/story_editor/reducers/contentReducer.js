const contentReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CONTENT':
            {
                return action.data;
            } 
        default:
            return state
    }

}

export const newContentAction = (content) => {
    return {
        type: 'NEW_CONTENT',
        data: content
    }
}

export const deleteContentAction = (nodeToDelete) => {
    return{
        type: 'DELETE_CONTENT',
        data: nodeToDelete
    }
}

export const updateContentAction = (newContent) => {
    return{
        type: 'UPDATE_CONTENT',
        data: newContent
    }
}

export const initializeContent = (nodes) => {
    return{
        type: 'INIT_CONTENT',
        data: nodes
    }
}

export const setContentAction = (newContent) => {
    return{
        type: 'SET_CONTENT',
        data: newContent
    }
}

export default contentReducer;