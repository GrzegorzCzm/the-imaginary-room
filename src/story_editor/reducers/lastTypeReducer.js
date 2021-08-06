const lastTypeReducer = (state = 'title', action) => {
    switch(action.type){
        case 'SET_LAST_TYPE':
            return action.data
        default:
            return state
    }
}

export const setLastTypeAction = (lastType) => {
    return {
        type: 'SET_LAST_TYPE',
        data: lastType 
    }
}

export default lastTypeReducer;