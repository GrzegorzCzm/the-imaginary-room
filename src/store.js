import {createStore, combineReducers} from 'redux';
import contentReducer from './story_editor/reducers/contentReducer';
import lastTypeReducer from './story_editor/reducers/lastTypeReducer';
import storyIdReducer from './story_editor/reducers/storyIdReducer';
import userTokenReducer from './login_page/reducers/userTokenReducer';

const reducer = combineReducers({
    content: contentReducer,
    lastType: lastTypeReducer,
    storyId: storyIdReducer,
    userToken: userTokenReducer
});

const store = createStore(reducer);

export default store;