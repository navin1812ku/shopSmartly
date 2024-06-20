import React from 'react';
import { Link } from 'react-router-dom';

const CourierLandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold">Film Fetch</h1>
                    <nav>
                        <Link to="/" className="px-4 hover:underline">Home</Link>
                        <Link to="/login" className="px-4 hover:underline">Login</Link>
                        <Link to="/register" className="px-4 hover:underline">Register</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-xl">
                    <h2 className="text-4xl font-bold mb-4">Welcome Courier</h2>
                    <p className="text-gray-700 mb-6">
                        Discover and share your favorite films. Join our community and enjoy an extensive collection of movies, reviews, and ratings.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/login" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Login</Link>
                        <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200">Register</Link>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-600 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Film Fetch. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CourierLandingPage;
