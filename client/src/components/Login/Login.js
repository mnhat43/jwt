import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
    const { user, loginContext } = useContext(UserContext);
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateNewAccount = () => {
        history.push("/register");
    }

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if (!valueLogin) {
            toast.error("Please enter your email address or phone number");
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            return;
        }

        let res = await loginUser(valueLogin, password);

        if (res && +res.EC === 0) {
            let token = res.DT.access_token;
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }

            localStorage.setItem('jwt', token);
            loginContext(data)
            history.push("/users");
            // window.location.reload();
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.code === "Enter") {
            handleLogin();
        }
    }

    // useEffect(() => {
    //     if (user && user.isAuthenticated) {
    //         history.push('/');
    //     }
    // }, [])

    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px3 px-sm-0'>
                    <div className='content-left col-12 d-sm-block d-none col-sm-7'>
                        <div className='brand'>
                            facebook
                        </div>
                        <div className='detail'>
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            facebook
                        </div>
                        <input
                            type='text'
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(e) => { setValueLogin(e.target.value) }}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Forgotten password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;