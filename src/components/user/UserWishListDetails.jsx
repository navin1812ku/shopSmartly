import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserWishListDetails = () => {
    const { id } = useParams();    
    const [wishList, setWishList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isHavingProduct, setIsHavingProduct] = useState(false);

    useEffect(() => {
        const fetchList = async (id) => {
            try {
                const token = localStorage.getItem(`token`);
                const response = await axios.get(`http://localhost:8081/user/wishListDetsils/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.success) {
                    setWishList(response.data.wishList);
                    setIsHavingProduct(false);
                } else {
                    setIsHavingProduct(true);
                    console.log(response.data.message);
                }
            }
            catch (error) {
                console.log(`Failed to remove list`);
            }
        };

        fetchList(id);
    }, [id]);

    return(
        <div>
            <h1>Products</h1>
        </div>
    )
};

export default UserWishListDetails;