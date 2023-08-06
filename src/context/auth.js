import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            username: event.target.username.value,
            password: event.target.password.value
        })
        const data = await response.data;
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate("/admin");
        } 

    } catch (error) {
        toast.error(`${error.response.status}: ${error.response.statusText}`, {position: toast.POSITION.TOP_CENTER});
        console.log(error.response);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate("/");
    };
    
    const updateToken = async () => {
    try {
        console.log("chamando update!")
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: authTokens.refresh
        })
        const data = await response.data;

        if(response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }
    } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        
        let fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={{user, authTokens, loginUser, logoutUser}}>{children}</AuthContext.Provider>
    );
}

export {AuthProvider};
export default AuthContext;

// import { createContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//     const [user, setUser] = useState();
    
//     useEffect(()=> {
//         const userToken = localStorage.getItem("user_token");
//         const usersStorage = localStorage.getItem("users_db");

//         if (userToken && usersStorage) {
//             const hasUser = JSON.parse(usersStorage)?.filter((user) => user.email === JSON.parse(userToken).email);
//             if (hasUser) setUser(hasUser[0]);
//         }
//     }, []);

//     const signin = (email, password) => {
//         const usersStorage = JSON.parse(localStorage.getItem("users_db"));
//         const hasUser = usersStorage?.filter((user) => user.email === email);

//         if (hasUser?.length) {
//             if (hasUser[0].email === email && hasUser[0].password === password) {
//                 const token = Math.random().toString(36).substring(2);
//                 localStorage.setItem("user_token", JSON.stringify({email, token}));
//                 setUser({ email, password});
//                 return;
//             } else {
//                 return "Confira seu e-mail e senha!";
//                 }
//             } else {
//                 return "Usuário não está cadastrado.";
//             }
//         };   

//     const signout = () => {
//         setUser(null);
//         localStorage.removeItem("user_token");
//     }
//     return <AuthContext.Provider value={{user, signed: !!user, signin, signout}}>{children}</AuthContext.Provider>;
// }

// export { AuthProvider };
// export default AuthContext;




