import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserWishList = () => {
    const [wishList, setWishList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isHavingList, setIsHavingList] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishList = async () => {
            try {
                const token = localStorage.getItem(`token`);
                const response = await axios.get(`http://localhost:8081/user/wishListDetsils`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    setWishList(response.data.wishList);
                    console.log(response.data);
                    setIsHavingList(false);
                } else {
                    setIsHavingList(true);
                }
            } catch (error) {
                console.log(`Failed to fetch list` + error);
            }
        };
        fetchWishList();
    }, []);

    const handleViewList = async (wishListId) => {
        try {
            navigate(`/user/wishListDetails/${wishListId}`);
        }
        catch (error) {
            console.log(`Failed to remove list`);
        }
    };

    const handleRemoveList = async (wishListId) => {
        try {
            const token = localStorage.getItem(`token`);
            const response = await axios.get(`http://localhost:8081/user/wishListDetsils/${wishListId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setSuccessMessage(`List removed`);
            } else {
                console.log(response.data.message);
            }
        }
        catch (error) {
            console.log(`Failed to remove list`);
        }
    };

    return (
        <div className="grid bg-gray-100 flex-row justify-center mb-10 w-full h-screen relative">
            <div className=" mt-14 w-full text-center">
                <h1 className="font-bold text-5xl">Wish List</h1>
            </div>
            {isHavingList &&
                <div className="text-center text-black-500 ">No wish list available</div>
            }
            {successMessage && (
                <div className="absolute top-20 right-10 bg-green-500 text-white p-2 rounded">
                    {successMessage}
                </div>
            )}
            {wishList &&
                <div className="mt-20 grid grid-rows-3 grid-flow-col gap-10 md:grid-cols-2 md:grid-rows-10 md:grid-flow-row lg:grid-cols-4 lg:grid-rows-10 lg:grid-flow-row lg:ml-20">
                    {wishList.length > 0 && wishList.map((list) => {
                        return (
                            <div className="flex-col bg-slate-300 w-80 rounded-2xl">
                                <h1 className="font-bold m-3 p-3 text-center text-2xl">{list.name[0].toUpperCase() + list.name.substring(1)}</h1>
                                <div className="h-1/2 items-center mb-3">
                                    <button onClick={() => handleRemoveList(list._id)} className="p-2 bg-red-700 rounded-2xl m-2 ml-14 w-24 h-11 font-bold hover:bg-orange-400 hover:text-gray-100">Remove</button>
                                    <button onClick={() => handleViewList(list._id)} className="p-2 bg-red-700 rounded-2xl m-2 w-24 h-11 font-bold hover:bg-orange-400 hover:text-gray-100">View</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default UserWishList;
