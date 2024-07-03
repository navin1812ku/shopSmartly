import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import productImage from '../../../public/product.jpg';

const UserWishListDetails = () => {
    const { id } = useParams();
    const [wishList, setWishList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [wishListName, setWishListName] = useState('');
    const [isHavingProduct, setIsHavingProduct] = useState(false);

    useEffect(() => {
        const fetchList = async (id) => {
            try {
                const token = localStorage.getItem(`token`);
                const response = await axios.get(`http://localhost:8081/user/wishListById/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
                if (response.data.success) {
                    setWishListName(response.data.wishList.name);
                    setWishList(response.data.wishList.products);
                    setIsHavingProduct(false);
                } else {
                    setIsHavingProduct(true);
                    console.log(response.data.message);
                }
            }
            catch (error) {
                console.log(`Failed to fetch wish list details`, error);
            }
        };

        fetchList(id);
    }, [id]);

    return (
        <div>
            <div className=" font-bold mt-5 text-5xl flex relative">
                <h1 className=" text-left">Wish List</h1>
                <h1 className=" absolute ml-72 text-red-800">{wishListName.charAt(0).toUpperCase()+wishListName.substring(1)}</h1>
            </div>
            <div className="w-full max-w-4xl mt-4 ml-72">
                {wishList && wishList.length > 0 ? (
                    wishList.map((product, index) => (
                        <div key={index} className=" bg-slate-100 shadow-md rounded-2xl p-4 mb-4 flex items-center">
                            <img src={productImage} alt={product.title} className=" rounded-3xl w-72 p-3" />
                            <div className="mt-10 space-y-1.5 ml-12">
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <p><span className="font-bold">Price</span>: {product.price}</p>
                                <p><span className="font-bold">Category</span>: {product.category}</p>
                                <p><span className="font-bold">Brand</span>: {product.brand}</p>
                                <div className="">
                                    <button className="mr-8 mt-5 hover:text-orange-600 font-bold text-lg">Remove</button>
                                    <button className="mr-8 mt-5 hover:text-orange-600 font-bold text-lg">Buy</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products in this wishlist.</p>
                )}
            </div>
        </div>
    )
};

export default UserWishListDetails;
