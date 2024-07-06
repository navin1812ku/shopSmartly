
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserstate } from '../../components/useContext/UserContext'

function UserLogout() {
    const navigate = useNavigate();
    const { setUserLoggedInStatus, setLoggedInStatus } = useUserstate();

    useEffect(() => {
        localStorage.clear();
        setUserLoggedInStatus();
        setLoggedInStatus();
        navigate("/")
    })
}

export default UserLogout;