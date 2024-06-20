
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate("/")
    })
}

export default UserLogout;