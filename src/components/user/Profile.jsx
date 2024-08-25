import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const [profile, setProfile] = useState({});

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
                    console.log(response.data.details);
                }
                else {
                    console.log(`Error fetching profile: `, response.data.message);
                }
            }
            catch (error) {
                console.error(`Error in fetching the user data: `, error);
            }
        }
        fetchProfile();
    }, []);


    return (
        <div className="bg-slate-300 h-screen">
            <div className="justify-center items-center flex flex-col mt-5 text-3xl font-bold text-red-600">
                <h1 className="">Your Profile</h1>
            </div>
            <div>
                <h1>Hello {profile.firstName}</h1>
            </div>
        </div>
    )
};

export default Profile;