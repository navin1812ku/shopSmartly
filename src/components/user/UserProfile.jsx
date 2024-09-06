import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [addAddressMode, setAddAddressMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [newAddress, setNewAddress] = useState({
        fullName: '',
        mobileNumber: '',
        pincode: '',
        houseNo: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        isDefault: false
    });
    const [editAddressMode, setEditAddressMode] = useState(false);
    const [editAddressId, setEditAddressId] = useState('');
    const [editAddressDetails, setEditAddressDetails] = useState({
        fullName: '',
        mobileNumber: '',
        pincode: '',
        houseNo: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        isDefault: false
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8081/user/details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setProfile(response.data.details);
                } else {
                    console.error('Error fetching profile:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8081/user/profileUpdate', profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setProfile(response.data.details);
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 1000);
            } else {
                console.error('Error updating profile:', response.data.message);
            }
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleAddAddress = () => {
        setAddAddressMode(true);
    };

    const handleAddressInputChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleAddAddressSubmit = async() => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8081/user/address', newAddress, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                window.location.reload();
            } else {
                console.error('Error updating profile:', response.data.message);
            }
            setNewAddress({
                fullName: '',
                mobileNumber: '',
                pincode: '',
                houseNo: '',
                street: '',
                landmark: '',
                city: '',
                state: '',
                country: '',
                isDefault: false
            });
            setAddAddressMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditAddress = (addressId) => {
        const selectedAddress = profile.address.find(address => address._id === addressId);
        if (selectedAddress) {
            setEditAddressMode(true);
            setEditAddressId(addressId);
            setEditAddressDetails({
                fullName: selectedAddress.fullName,
                mobileNumber: selectedAddress.mobileNumber,
                pincode: selectedAddress.pincode,
                houseNo: selectedAddress.houseNo,
                street: selectedAddress.street,
                landmark: selectedAddress.landmark,
                city: selectedAddress.city,
                state: selectedAddress.state,
                country: selectedAddress.country,
                isDefault: selectedAddress.isDefault
            });
        } else {
            console.error(`Address with ID ${addressId} not found in profile.`);
        }
    };

    const handleEditAddressInputChange = (e) => {
        setEditAddressDetails({
            ...editAddressDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveEditedAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8081/user/address/${editAddressId}`, editAddressDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuccessMessage(`Address edited`);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                setEditAddressMode(false);
                window.location.reload();
            } else {
                console.error('Error updating address:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleCancelEditAddress = () => {
        setEditAddressMode(false);
        setEditAddressId('');
        setEditAddressDetails({
            fullName: '',
            mobileNumber: '',
            pincode: '',
            houseNo: '',
            street: '',
            landmark: '',
            city: '',
            state: '',
            country: '',
            isDefault: false
        });
    };

    const handleRemoveAddress = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8081/user/address/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuccessMessage(`Address deleted`);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 1000);
                window.location.reload();
            } else {
                console.error('Error removing address:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing address:', error);
        }
    };

    const handleSetDefaultAddress = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8081/user/setDefaultAddress`, {
                id: addressId,
                isDefault: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuccessMessage(`Address set to default`);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 1000);
                window.location.reload();
            } else {
                console.error('Error setting default address:', response.data.message);
            }
        } catch (error) {
            console.error('Error setting default address:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
            {successMessage && (
                <div className="absolute top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-screen-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>
                <div className="mb-6 p-4 bg-gray-200 rounded">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Profile Information</h3>
                        {!editMode ? (
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none"
                            >
                                Save Profile
                            </button>
                        )}
                    </div>
                    {!editMode ? (
                        <div className="mb-2">
                            <p className="text-sm text-gray-700"><span className="font-medium">First Name:</span> {profile.firstName}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Last Name:</span> {profile.lastName}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> {profile.email}</p>
                            <p className="text-sm text-gray-700"><span className="font-medium">Phone Number:</span> {profile.phoneNumber}</p>
                        </div>
                    ) : (
                        <div className="mb-2">
                            <label className="block text-gray-700 font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={profile.phoneNumber}
                                onChange={handleInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4 flex justify-between items-center">
                        Addresses
                        {!addAddressMode && (
                            <button
                                onClick={handleAddAddress}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none"
                            >
                                Add
                            </button>
                        )}
                    </h3>
                    {addAddressMode && (
                        <div className="mb-4 p-4 bg-gray-200 rounded">
                            <h3 className="text-lg font-medium mb-2">Add New Address</h3>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={newAddress.fullName}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={newAddress.mobileNumber}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={newAddress.pincode}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">House No</label>
                            <input
                                type="text"
                                name="houseNo"
                                value={newAddress.houseNo}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Street</label>
                            <input
                                type="text"
                                name="street"
                                value={newAddress.street}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={newAddress.landmark}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={newAddress.city}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">State</label>
                            <input
                                type="text"
                                name="state"
                                value={newAddress.state}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <label className="block text-gray-700 font-medium mb-1">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={newAddress.country}
                                onChange={handleAddressInputChange}
                                className="bg-white p-2 rounded w-full"
                            />
                            <div className="flex mt-4">
                                <button
                                    onClick={handleAddAddressSubmit}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none mr-2"
                                >
                                    Save Address
                                </button>
                                <button
                                    onClick={() => setAddAddressMode(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    {profile.address && profile.address.length > 0 ? (
                        profile.address.map((address) => (
                            <div key={address._id} className="mb-4 p-4 bg-gray-200 rounded">
                                {editAddressMode && editAddressId === address._id ? (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Edit Address</h3>
                                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={editAddressDetails.fullName}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            value={editAddressDetails.mobileNumber}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={editAddressDetails.pincode}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">House No</label>
                                        <input
                                            type="text"
                                            name="houseNo"
                                            value={editAddressDetails.houseNo}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">Street</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={editAddressDetails.street}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">Landmark</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={editAddressDetails.landmark}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={editAddressDetails.city}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={editAddressDetails.state}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <label className="block text-gray-700 font-medium mb-1">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={editAddressDetails.country}
                                            onChange={handleEditAddressInputChange}
                                            className="bg-white p-2 rounded w-full"
                                        />
                                        <div className="flex mt-4">
                                            <button
                                                onClick={handleSaveEditedAddress}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEditAddress}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-700">{address.fullName}</p>
                                        <p className="text-sm text-gray-700">{address.houseNo}, {address.street}, {address.landmark}</p>
                                        <p className="text-sm text-gray-700">{address.city}, {address.state}, {address.country}, {address.pincode}</p>
                                        <div className="flex mt-2 space-x-2">
                                            <button
                                                onClick={() => handleEditAddress(address._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleRemoveAddress(address._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none"
                                            >
                                                Remove
                                            </button>
                                            {!address.isDefault && <button
                                                onClick={() => handleSetDefaultAddress(address._id)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded focus:outline-none"
                                            >
                                                Set as Default
                                            </button>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700">No addresses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

