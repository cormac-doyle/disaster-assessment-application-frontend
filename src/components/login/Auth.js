import { useLocation, Navigate } from "react-router-dom"

const setToken = (token) => {
    console.log("Applying token:" + token)
    localStorage.setItem('magicToken', token)
};

const fetchToken = (token) => {
    return localStorage.getItem('magicToken')
};

function RequireToken({ children }) {

    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {

        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
};


export { RequireToken, fetchToken, setToken }