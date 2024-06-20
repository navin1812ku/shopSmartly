import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function UserNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
                <div className="relative cursor-pointer" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <div className="flex flex-col justify-between w-8 h-5 cursor-pointer">
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                    </div>
                    <div className={`absolute top-full left-0 flex-col bg-gray-800 list-none min-w-[200px] z-10 shadow-lg ${dropdownOpen ? "flex" : "hidden"}`} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                        <Link className="block bg-gray-700 text-white p-2 mb-1 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/home">Search</Link>
                        <Link className="block bg-gray-700 text-white p-2 mb-1 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/profile">Profile</Link>
                        <Link className="block bg-gray-700 text-white p-2 mb-1 rounded transition duration-300 ease-in-out transform hover:bg-gray-600 hover:text-yellow-500 hover:scale-105 shadow-sm" to="/user/logout">Logout</Link>
                    </div>
                </div>
                <h1 className="m-0 text-xl text-right">ShopSmartly</h1>
            </nav>
            <Outlet />
        </div>
    );
}

export default UserNavBar;
