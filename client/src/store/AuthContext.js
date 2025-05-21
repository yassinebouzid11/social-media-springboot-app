import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
    email: "",
    password: "",
    users:[],
    isLoggedIn: false,
    loginHandler: (email, password) => {},
    logoutHandler: () => {},
    setIsLoggedIn:()=>{},
    fetchAllUsers :()=>{}
    });
    export default AuthContext;

    export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[users,setUsers]=useState([])

    useEffect(() => {

        setIsLoggedIn(true);

    }, []);
    
    const loginHandler = (email, password) => {
        setIsLoggedIn(true);
        
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };


    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users/all");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            loginHandler: loginHandler,
            logoutHandler: logoutHandler,
            setIsLoggedIn,
            fetchAllUsers,
            users,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};