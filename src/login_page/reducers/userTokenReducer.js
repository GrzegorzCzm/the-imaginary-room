const userTokenReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return action.data;
        default:
            return state;
    }
}

export const setTokenAction = (token) => {
    return{
        type: 'SET_TOKEN',
        data: token
    }
}

export default userTokenReducer;