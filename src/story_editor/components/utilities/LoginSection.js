import React, {useState} from 'react';
import loginService from '../../services/login';
import nodeService from '../../services/nodes';

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);

const handleLogin = (event) => {
    event.preventDefault();

    try{
        const user = await loginService.login({
            user_name: userName,
            password: password
        });
        nodeService.setToken(user.token);
        setUser(user);
        setUserName('');
        setPassword('');
    }
    catch(exception) {
        console.log('Wrong credentials');
    }
}

const loginForm = () => {
    return(
        <div className="login_form">
        <form onSubmit={handleLogin}>
            <div>
                user name: <input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
            </div>
            <div>
                password: <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type='submit'>login</button>
        </form>
    </div>
    );
}

const LoginSection = () => {
    return(
        <div>
            {user === null ? loginForm() : 
                <div>
                    <p>{user.name} logged-in</p>
                </div>
            }
        </div>
    );
}

export default LoginSection;