import './Register.scss';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }

    const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput)

    let history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    useEffect(() => {

    })

    const isValidInputs = () => {
        setObjectCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is required !");
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a vaild email address !");
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        if (!phone) {
            toast.error("Phone number is required !");
            setObjectCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required !");
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your password is not the same !");
            setObjectCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }



        return true;
    }

    let handleRegister = async () => {
        let check = isValidInputs();

        if (check) {
            let res = await registerNewUser(email, phone, username, password);

            let serverData = res;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push("/login");

            } else {
                toast.error(serverData.EM);
            }
        }
    }

    return (
        <div className='register-container'>
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

                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className={objectCheckInput.isValidEmail ? 'form-control ' : 'form-control is-invalid'} placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className={objectCheckInput.isValidPhone ? 'form-control ' : 'form-control is-invalid'} placeholder='Phone number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className={objectCheckInput.isValidPassword ? 'form-control ' : 'form-control is-invalid'} placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type='password' className={objectCheckInput.isValidConfirmPassword ? 'form-control ' : 'form-control is-invalid'} placeholder='Re-enter password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;