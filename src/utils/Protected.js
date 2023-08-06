import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth";

const Protected = ({ children}) => {
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/signin" replace />
    }
    return children;    
};

export default Protected;