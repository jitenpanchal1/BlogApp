import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login as authlogin } from '../store/AuthSlice';
import { BasicButton, Input, Logo } from './Index';
import { useDispatch } from 'react-redux';
import authentication from '../auth/auth';
import { useForm } from 'react-hook-form';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState(null);

    const login = async (data) => {
        setError(null); // clear previous error
        try {
            const session = await authentication.login(data);
            if (session) {
                const userData = await authentication.getcurrentacount();
                if (userData) {
                    dispatch(authlogin(userData));
                    navigate('/');
                } else {
                    setError('Unable to fetch user data.');
                }
            }
        } catch (error) {
            if (error?.message?.toLowerCase().includes('invalid')) {
                setError('Invalid email or password');
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="logo text-center">
                    <Logo />
                </div>
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(login)} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="form-input"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/,
                                    message: 'Invalid email format',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="field-error">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="form-input"
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value:
                                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
                                    message:
                                        'Password must contain uppercase, lowercase, number, and special character',
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="field-error">{errors.password.message}</p>
                        )}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <BasicButton type="submit" className="form-button">
                        Log In
                    </BasicButton>
                </form>
            </div>
        </div>
    );
}

export default Login;
