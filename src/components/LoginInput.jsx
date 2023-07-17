import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginInput = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({
            email,
            password,
        });
    };

    return (
        <form onSubmit={onSubmitHandler} className='note-input'>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={onEmailChangeHandler}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={onPasswordChangeHandler}
            />
            <button className='note-input-item'>Masuk</button>
        </form>
    );
};

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginInput;
