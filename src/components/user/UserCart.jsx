import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import productImage from '../../../public/product.jpg';
import { useNavigate } from 'react-router';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [allSelected, setAllSelected] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRefs = useRef({});
    const navigate=useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8081/cart/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    await setCartProducts(response.data.cart.products.map(product => ({
                        ...product,
                        quantity: 1, // Initialize quantity with 1
                        selected: false // Initialize selection state
                    })));
                } else {
                    setErrorMessage('Failed to fetch cart products');
                }
            } catch (error) {
                console.error('Error fetching cart products:', error);
                setErrorMessage('Error fetching cart products');
            }
        };

        const getAllList = async () => {
            try {
                const token = localStorage.getItem(`token`);
                const response = await axios.get(`http://localhost:8081/user/wishListDetsils`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.success) {
                    setWishList(response.data.wishList);
                }
                else {
                    console.log(response.data.message);
                }
            }
            catch (error) {
                console.log(`Failed to get list`);
            }
        }

        fetchCartProducts();
        getAllList();
    }, []);

    const handleRemove = async (cartProductId) => {
        try {
            const token = localStorage.getItem(`token`);
            const response = await axios.delete(`http://localhost:8081/cart/removeProduct/${cartProductId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setSuccessMessage(`Product removed`);
                setTimeout(() => setSuccessMessage(''), 2000);
                window.location.reload();
            }
            else {
                console.log(response.data.message);
            }
        }
        catch (error) {
            console.log(`Failed to remove product`);
        }
    };

    const handleSaveToList = async (listId, productId, cartProductId) => {
        try {
            console.log(listId, '\n', productId, '\n', cartProductId);
            const body={
                listId: listId,
                productId: productId,
                cartProductId: cartProductId
            }
            console.log(body);
            const token=localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8081/user/wishList`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.success) {
                setSuccessMessage(`Saved to list`);
                setTimeout(() => setSuccessMessage(''), 2000);
                window.location.reload();
            }
        }
        catch (error) {
            console.log(`Failed to save product to list`);
        }
    };

    const handleSeeMoreLikeThis = (productname) => {
        console.log(productname);
        navigate(`/user/home/${productname}`)
    };

    const handleQuantityChange = (cartProductId, quantity) => {
        setCartProducts(cartProducts.map(product =>
            product.cartProductId === cartProductId ? { ...product, quantity } : product
        ));
    };

    const toggleSelectAll = () => {
        setAllSelected(!allSelected);
        setCartProducts(cartProducts.map(product => ({
            ...product,
            selected: !allSelected
        })));
    };

    const getTotalAmount = () => {
        return cartProducts
            .filter(product => product.selected)
            .reduce((total, product) => total + (product.quantity * product.product.price), 0);
    };

    const getTotalItems = () => {
        return cartProducts
            .filter(product => product.selected)
            .reduce((total, product) => total + product.quantity, 0);
    };

    const handleDropdownToggle = (productId) => {
        setDropdownVisible(dropdownVisible === productId ? null : productId);
    };

    const handleClickOutside = (event) => {
        if (dropdownVisible && dropdownRefs.current[dropdownVisible] && !dropdownRefs.current[dropdownVisible].contains(event.target)) {
            setDropdownVisible(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row space-x-5 md:space-x-0">
            <div className="w-full ml-1 mt-10 p-4 h-48 bg-white shadow-md rounded-lg md:w-1/4 md:ml-8 md:mt-36 md:p-4 md:h-48 md:bg-white md:shadow-md md:rounded-lg">
                <h2 className="text-xl font-bold mb-4">Total</h2>
                <p className="text-lg">Total Amount: ${getTotalAmount().toFixed(2)}</p>
                <p className="text-lg">Number of Items: {getTotalItems()}</p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Buy
                </button>
            </div>
            <div className="flex-1 flex flex-col items-center mt-10">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div className="mb-4">
                    <button onClick={toggleSelectAll} className="bg-blue-500 text-black py-1 px-3 rounded-full hover:bg-blue-600">
                        {allSelected ? 'Deselect All Products' : 'Select All Products'}
                    </button>
                </div>
                {successMessage && (
                    <div className="absolute top-20 right-10 bg-green-500 text-white p-2 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="absolute top-20 right-10 bg-red-500 text-white p-2 rounded">
                        {errorMessage}
                    </div>
                )}
                <div className="w-full max-w-4xl mt-4">
                    {cartProducts.length > 0 ? (
                        cartProducts.map((cartItem) => (
                            <div
                                key={cartItem.cartProductId}
                                className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center"
                            >
                                <div className="mr-4">
                                    <input
                                        type="checkbox"
                                        checked={cartItem.selected || false}
                                        onChange={() => {
                                            setCartProducts(cartProducts.map(product =>
                                                product.cartProductId === cartItem.cartProductId
                                                    ? { ...product, selected: !product.selected }
                                                    : product
                                            ));
                                        }}
                                    />
                                </div>
                                <div className="flex">
                                    <img src={productImage} alt={cartItem.product.title} className="w-48 h-full object-cover" />
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-semibold">{cartItem.product.title}</h3>
                                        <p className="text-gray-600">{cartItem.product.description}</p>
                                        <p className="text-gray-800 font-bold">Price: ${cartItem.product.price}</p>
                                        <p className="text-gray-600">Category: {cartItem.product.category}</p>
                                        <p className="text-gray-600">Brand: {cartItem.product.brand}</p>
                                        <div className="mt-2">
                                            <label htmlFor={`quantity-${cartItem.cartProductId}`} className="text-gray-600">
                                                Quantity:
                                            </label>
                                            <input
                                                type="number"
                                                id={`quantity-${cartItem.cartProductId}`}
                                                value={cartItem.quantity}
                                                onChange={(e) => handleQuantityChange(cartItem.cartProductId, Math.min(Math.max(1, parseInt(e.target.value)), cartItem.product.stockQuantity))}
                                                min="1"
                                                max={cartItem.product.stockQuantity}
                                                className="ml-2 w-16 p-1 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="mt-4 flex space-x-2 relative">
                                            <button
                                                onClick={() => handleRemove(cartItem.cartProductId)}
                                                className="text-black font-bold py-1 px-2 rounded hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Remove
                                            </button>
                                            <div className="relative" ref={(el) => (dropdownRefs.current[cartItem.cartProductId] = el)}>
                                                <button
                                                    onClick={() => handleDropdownToggle(cartItem.cartProductId)}
                                                    className="text-black font-bold py-1 px-2 rounded hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                >
                                                    Save to List
                                                </button>
                                                {dropdownVisible === cartItem.cartProductId && wishList.length > 0 && (
                                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                                                        {wishList.map((list) => (
                                                            <button
                                                                key={list._id}
                                                                onClick={() => handleSaveToList(list._id, cartItem.product._id, cartItem.cartProductId)}
                                                                className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                                            >
                                                                {list.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleSeeMoreLikeThis(cartItem.product.title.toLowerCase())}
                                                className="text-black font-bold py-1 px-2 rounded hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                See More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No products in the cart</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
