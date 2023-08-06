import { useContext } from "react";
import AuthContext from "../context/auth";

function useAuth () {
    const context = useContext(AuthContext);

    return context;
};

export default useAuth;