import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useUserstate } from '../components/useContext/UserContext'

function UserNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isUserLoggedIn} = useUserstate();
    console.log(isUserLoggedIn);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            {isUserLoggedIn &&
                <nav className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
                    <div className="relative cursor-pointer lg:hidden" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <div className="flex flex-col justify-between w-8 h-5 cursor-pointer">
                            <div className="w-full h-0.5 bg-white"></div>
                            <div className="w-full h-0.5 bg-white"></div>
                            <div className="w-full h-0.5 bg-white"></div>
                        </div>
                        <div className={`absolute top-full left-0 flex-col bg-gray-800 list-none min-w-[200px] z-10 shadow-lg ${dropdownOpen ? "flex" : "hidden"}`} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                            <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/home/products">Search</Link>
                            <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/cart">Cart</Link>
                            <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/wishList">Wish List</Link>
                            <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/profile">Profile</Link>
                            <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/logout">Logout</Link>
                        </div>
                    </div>
                    <h1 className="m-0 text-xl text-right">ShopSmartly</h1>
                    <div className="hidden lg:flex space-x-4">
                        <Link className="text-white text-lg p-2 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105" to="/user/home/products">Search</Link>
                        <Link className="text-white text-lg p-2 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105" to="/user/cart">Cart</Link>
                        <Link className="text-white text-lg p-2 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105" to="/user/wishList">Wish List</Link>
                        <Link className="text-white text-lg p-2 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105" to="/user/profile">Profile</Link>
                        <Link className="text-white text-lg p-2 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105" to="/user/logout">Logout</Link>
                    </div>
                </nav>
            }
            {!isUserLoggedIn &&
                <div className="relative cursor-pointer lg:hidden" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <div className="flex flex-col justify-between w-8 h-5 cursor-pointer">
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                    </div>
                    <div className={`absolute top-full left-0 flex-col bg-gray-800 list-none min-w-[200px] z-10 shadow-lg ${dropdownOpen ? "flex" : "hidden"}`} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                        <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/login">Login</Link>
                        <Link className="block bg-gray-700 text-white p-2 mb-1 rounded-lg transition duration-300 ease-in transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/register">Register</Link>
                    </div>
                </div>
            }
            <Outlet />
        </div>
    );
}

export default UserNavBar;
