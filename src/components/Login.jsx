import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserstate } from '../components/useContext/UserContext';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const {setUserLoggedInStatus} = useUserstate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/login', {
                id,
                password
            });
            console.log(response.data);
            if (response.data.success) {
                setSuccessMessage('Login successful!');
                setErrorMessage('');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.details.role);
                setTimeout(() => {
                    if (response.data.details.role === `USER`) {
                        setUserLoggedInStatus();
                        navigate(`/user/home/products`);
                    }
                }, 2000);
                setLoggedInStatus();
            } else {
                setErrorMessage(response.data.message);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
        }
        console.log('Email: ', id);
        console.log('Password: ', password);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setErrorMessage('');
    };

    return (
        <div className="min-h-svh flex items-center justify-center relative bg-[url('https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bG9naW58ZW58MHx8MHx8fDA%3D')] bg-cover">
            {successMessage && (
                <div className="absolute top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div className="absolute top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}
            <div className="bg-cyan-400 p-8 rounded-3xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={id}
                            onChange={handleInputChange(setId)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
