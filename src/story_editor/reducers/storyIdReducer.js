const storyIdReducer = (state='', action) => {
    switch(action.type){
        case 'SET_STORY_ID':
            return action.data
        default:
            return state
    }
}

export const setStoryIdAction = (storyId) => {
    return {
        type: 'SET_STORY_ID',
        data: storyId
    }
}

export default storyIdReducer;