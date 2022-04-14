import { useLocation, Navigate } from "react-router-dom"

const setToken = (token) => {
    localStorage.setItem('magicToken', token)
};

const fetchToken = () => {
    return localStorage.getItem('magicToken')
};

function RequireToken({ children }) {
    // requires authentication
    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {

        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
};


export { RequireToken, fetchToken, setToken }