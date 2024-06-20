import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
                <h1 className="text-4xl font-bold mb-6">Welcome to ShopSmartly!</h1>
                <p className="text-gray-700 mb-6">
                ShopSmartly is your go-to e-commerce destination, offering a seamless shopping experience 
                with a user-friendly interface and a vast product range. Enjoy secure transactions, 
                personalized recommendations, and efficient order management. Our robust customer support 
                and exclusive deals ensure a satisfying and convenient shopping journey. Discover the best 
                of online shopping with ShopSmartly
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/login" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
