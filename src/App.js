import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./styles/header.css";
import IRLogo from "./images/IR-Logo-White.png";

import LoginPage from './login_page/LoginPage';
import CreateUser from './create_user/CreateUser';
import HomePage from './home_page/HomePage';
import CreateStory from './create_story/CreateStory';
import MyStories from './my_stories/MyStories';
import StoryEditor from './story_editor/StoryEditor';
import ReadStory from './read_story/ReadStory';
import BrowseStory from './browse_stories/BrowseStories';
import Documentation from './documentation/Documentation';
import SearchBar from './search_bar/SearchBar';

import {useDispatch} from 'react-redux';

import {setTokenAction} from './login_page/reducers/userTokenReducer';

function App() {

  const [userName, setUserName] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoJSON = window.localStorage.getItem('user_info');
    if(userInfoJSON){
      const userInfoObject = JSON.parse(userInfoJSON);
      setUserName(userInfoObject.user_name);
      dispatch(setTokenAction('bearer ' + userInfoObject.token));
    }
  }, [dispatch]);

 const onLogin = (userFromLogin) => {
    setUserName(userFromLogin);
  }

  return (
    <Router>
      <div className="App">
        {
          userName ?
          <div className="header header-logged">
            <Link to='/' className="header-home-logo">
              <img src={IRLogo} alt="IR-Logo" className="ir-logo" />
              <p>THE IMAGINARY ROOM</p>
            </Link>
            <SearchBar />
            <div className="header-right">
              <Link to='/browse_stories' className="header-border">BROWSE STORIES</Link>
              <Link to='/create_story' className="header-border">CREATE STORY</Link>
              <Link to='/my_stories' className="header-border">MY STORIES</Link>
              <p className="logged_in_text">{userName} LOGGED IN</p>
            <button className="header-border" onClick={() => {
              window.localStorage.clear()
              setUserName(null)
              dispatch(setTokenAction(null))}}>LOGOUT</button>
            </div> 
          </div>
          :
          <div className="header header-not-logged">
            <Link to='/' className="header-home-logo">
              <img src={IRLogo} alt="IR-Logo" className="ir-logo" />
              <p>THE IMAGINARY ROOM</p>
            </Link>
            <SearchBar />
            <div className="header-right">
              <Link to='/browse_stories' className="header-border">BROWSE STORIES</Link>
              <Link to='/documentation' className="header-border">DOCUMENTATION</Link>
              <Link to='/login' className="header-border">LOGIN</Link>
              <Link to='/register' className="header-border">REGISTER</Link>
            </div>
          </div>
        }
    
    <Switch>
      <Route path='/login'>
        <LoginPage onLogin={onLogin}/>
      </Route>
      <Route path='/register'>
        <CreateUser />
      </Route>
      <Route path='/create_story'>
        <CreateStory />
      </Route>
      <Route path='/story_editor/:id'>
        <StoryEditor />
      </Route>
      <Route path='/read_story/:id'>
        <ReadStory />
      </Route>
      <Route path='/my_stories'>
        <MyStories />
      </Route>
      <Route path='/browse_stories'>
        <BrowseStory />
      </Route>
      <Route path='/documentation'>
        <Documentation />
      </Route>
      <Route path='/'>
        <HomePage />
      </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;