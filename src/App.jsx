import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/user/Register';
import UserLandingPage from './components/user/UserLandingPage';
import Home from './components/Home'
import './index.css';
import AdminLandingPage from './components/admin/AdminLandingPage';
import VendorLandingPage from './components/vendor/VendorLandingPage';
import CourierLandingPage from './components/courier/CourierLandingPage';
import UserProfile from './components/user/UserProfile';
import Navbar from './components/Navbar';
import UserLogout from './components/user/UserLogout';
import Cart from './components/user/UserCart';
import UserWishList from './components/user/UserWishList';
import UserWishListDetails from './components/user/UserWishListDetails';
import { UserProvider } from './components/useContext/UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/home/:id" element={<UserLandingPage />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/cart" element={<Cart />} />
              <Route path="/user/wishList" element={<UserWishList />} />
              <Route path="/user/wishListDetails/:id" element={<UserWishListDetails />} />
              <Route path="/user/logout" element={<UserLogout />} />
              <Route path="/admin/home" element={<AdminLandingPage />} />
              <Route path="/vendor/home" element={<VendorLandingPage />} />
              <Route path="/courier/home" element={<CourierLandingPage />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
