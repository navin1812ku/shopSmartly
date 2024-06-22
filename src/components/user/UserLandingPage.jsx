import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import productImage from '../../../public/product.jpg';
import { useParams } from 'react-router';

const UserLandingPage = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [suggestedNames, setSuggestedNames] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isSuggestionClicked, setIsSuggestionClicked] = useState(true);

    const inputRef = useRef(null);

    useEffect(() => {
        if (id !== 'products') {
            setSearchTerm(id);
            searchById(id);
        } else {
            fetchAllProducts();
        }
    }, [id]);   

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            setErrorMessage(false);
            setIsSuggestionClicked(true);
            fetchSuggestions();
        } else {
            setSuggestedNames([]);
        }
    }, [searchTerm]);

    const searchById = async (id) => {
        try {
            setProducts([]);
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/product/searchProduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                setErrorMessage(true);
            }
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/product/set`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                setErrorMessage(true);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const fetchSuggestions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/product/search/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuggestedNames(response.data.products);
            } else {
                setSuggestedNames([]);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            setProducts([]);
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/product/searchProduct/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                setErrorMessage(true);
            }
            setSuggestedNames([]);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/cart/addProduct/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setSuccessMessage('Added to cart');
                setTimeout(() => setSuccessMessage(''), 2000);
            } else if (response.data.message === `Already added`) {
                setSuccessMessage('Already added');
                setTimeout(() => setSuccessMessage(''), 2000);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (suggestedNames && suggestedNames.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedIndex(prevIndex => {
                    const newIndex = Math.min(prevIndex + 1, suggestedNames.length - 1);
                    setSearchTerm(formatSuggestion(suggestedNames[newIndex].title, searchTerm));
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedIndex(prevIndex => {
                    const newIndex = Math.max(prevIndex - 1, 0);
                    setSearchTerm(formatSuggestion(suggestedNames[newIndex].title, searchTerm));
                    return newIndex;
                });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < suggestedNames.length) {
                    setSearchTerm(formatSuggestion(suggestedNames[focusedIndex].title, searchTerm));
                    setIsSuggestionClicked(false);
                    setTimeout(() => {
                        inputRef.current.focus();
                        document.getElementById('searchForm').requestSubmit();
                    }, 0);
                } else {
                    handleSearch(e);
                }
            }
        }
    };

    const formatSuggestion = (suggestion, searchTerm) => {
        if (searchTerm === searchTerm.toUpperCase()) {
            return suggestion.toUpperCase();
        } else if (searchTerm === searchTerm.toLowerCase()) {
            return suggestion.toLowerCase();
        } else if (searchTerm[0] === searchTerm[0].toUpperCase()) {
            return suggestion[0].toUpperCase() + suggestion.slice(1).toLowerCase();
        } else {
            return suggestion;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            {successMessage && (
                <div className="absolute top-13 right-5 bg-green-500 text-white p-2 rounded">
                    {successMessage}
                </div>
            )}
            <form id="searchForm" onSubmit={handleSearch} className="flex justify-center mb-1 w-1/2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                    ref={inputRef}
                    placeholder="Search for products"
                    className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
                {isSuggestionClicked && suggestedNames && suggestedNames.length > 0 && isFocused && (
                    <div className='absolute flex flex-col w-1/2 bg-white rounded-sm mt-14 shadow-md overflow-y-auto z-50'>
                        {suggestedNames.map((item, index) => (
                            <p
                                key={item.imdbID}
                                className={`p-6 ${focusedIndex === index ? 'bg-gray-200' : ''}`}
                                onMouseEnter={() => setFocusedIndex(index)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSearchTerm(formatSuggestion(item.title, searchTerm));
                                    setIsSuggestionClicked(false);
                                    setIsFocused(false);
                                }}
                            >
                                {formatSuggestion(item.title, searchTerm)}
                            </p>
                        ))}
                    </div>
                )}
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={productImage} alt={product.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-gray-800 font-bold mb-2">Price: ${product.price}</p>
                                <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500">
                        {errorMessage ? 'Searched product not found.' : 'No products available.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLandingPage;
