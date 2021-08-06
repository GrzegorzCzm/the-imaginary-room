import React, {useState} from 'react';
import loginService from './services/login';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setTokenAction} from './reducers/userTokenReducer';
import '../styles/login_page.css';

const LoginPage = ({onLogin}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const userInfo = await loginService.login({
                user_name: userName,
                password: password
            });
            window.localStorage.setItem('user_info', JSON.stringify(userInfo));
            onLogin(userInfo.user_name);
            dispatch(setTokenAction('bearer ' + userInfo.token));
            setUserName('');
            setPassword('');
            history.push('/');
        }
        catch(exception) {
            console.log('Wrong credentials');
        }
    }
    return(
        <div className="login_page">
            <div className="login_page_title">LOGIN</div>
        <div className="login_form">
        <form onSubmit={handleLogin}>
            <div className="login_form_section">
                <p>USER NAME</p>
                <input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
            </div>
            <div className="login_form_section">
                <p>PASSWORD</p>
                <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button className="login_button" type='submit'>LOGIN</button>
        </form>
    </div>
    </div>
    );
}

export default LoginPage;


