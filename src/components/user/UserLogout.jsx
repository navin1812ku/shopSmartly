
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserstate } from '../../components/useContext/UserContext'

function UserLogout() {
    const navigate = useNavigate();
    const { setUserLoggedInStatus } = useUserstate();

    useEffect(() => {
        localStorage.clear();
        setUserLoggedInStatus();
        navigate("/")
    });
}

export default UserLogout;