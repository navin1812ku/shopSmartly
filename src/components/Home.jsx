import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-end bg-[url('https://img.freepik.com/free-photo/composition-black-friday-shopping-cart-with-copy-space_23-2148667046.jpg?size=626&ext=jpg&ga=GA1.1.594201402.1720270747&semt=ais_user')] bg-cover">
            <div className=" p-8 rounded-lg text-center max-w-lg text-white mr-24">
                <div>
                    <h1 className="transition duration-300 ease-out hover:ease-in hover:text-red-400 hover:scale-110 text-4xl font-bold mb-20">Welcome to ShopSmartly!</h1>
                    <p className="text-white mb-6 text-xl transition duration-300 ease-out hover:ease-in hover:text-red-400 hover:scale-110">
                        ShopSmartly is your go-to e-commerce destination, offering a seamless shopping experience
                        with a user-friendly interface and a vast product range. Enjoy secure transactions,
                        personalized recommendations, and efficient order management. Our robust customer support
                        and exclusive deals ensure a satisfying and convenient shopping journey. Discover the best
                        of online shopping with ShopSmartly
                    </p>
                </div>
                <div className="flex justify-center space-x-4 mt-20">
                    <Link to="/login" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 hover:scale-110">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 hover:scale-110">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
