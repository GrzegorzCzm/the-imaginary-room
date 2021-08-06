import React, {useState} from 'react';
import userService from './services/user';

const CreateUser = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();

        const newUser = {
            user_name: userName,
            email: email,
            password: password,
            name: name,
            surname: surname,
            stories: []
        }

        const registeredUser = await userService.createNewUser(newUser);

    }

    return(
        <div className="create-user">
            <form onSubmit={registerUser}>
                User Name: <input value={userName} onChange={(event) => setUserName(event.target.value)}></input>
                Email: <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                Password: <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
                Name: <input value={name} onChange={(event) => setName(event.target.value)}></input>
                Surname: <input value={surname} onChange={(event) => setSurname(event.target.value)}></input>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default CreateUser;