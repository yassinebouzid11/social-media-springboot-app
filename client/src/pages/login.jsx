import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../store/AuthContext";

    const emailReducer = (prevState, actions) => {
    switch (actions.name) {
        case "USER_TYPING":
        return { value: actions.payload, isValid: actions.payload.includes("@") };
        case "user 5raj mel input":
        return { value: prevState.value, isValid: prevState.value.includes("@") };
        default:
        return { value: "", isValid: null };
    }
    };

    const passwordReducer = (prevState, actions) => {
    switch (actions.name) {
        case "USER_TYPING":
        return {
            value: actions.payload,
            isValid: actions.payload.trim().length > 6,
        };
        case "user 5raj mel input":
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 6,
        };
        default:
        return { value: "", isValid: null };
    }
    };

export const Login=()=>{
    const navigate = useNavigate()
    const [isSigningIn,setIsSigningIn]=useState(false);


    const signInWithGoogle= async ()=>{
            if(isSigningIn)return;

            setIsSigningIn(true);
            
        try{ 

            await auth.signOut();

            provider.setCustomParameters({
                prompt:'select_account'
            });
            const result=await signInWithPopup(auth,provider);
            console.log(result);

            const response = await axios.post(`http://localhost:8080/users/add`, {
                username:result.user.displayName,
                email:result.user.email,
                password:"google"
            });
            
            console.log(response)
            navigate("/");

        } catch (error) {
            console.error("Error during sign-in:", error);
            navigate("/");
        } finally {
            setIsSigningIn(false); // Re-enable button after process is complete
        }
    }


    
    const testLogin = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:8080/users/email", {
            email,
            });
            console.log(res);

            if(res.data.password===password){
                navigate("/");
            }
            
        } catch (error) {
            console.log(error)
        }
        
    };
    const [formIsValid, setFormIsValid] = useState(false);

    const [email, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });
    const [password, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });
    const { loginHandler } = useContext(AuthContext);

    const { isValid: emailIsValid } = email;
    const { isValid: passwordIsValid } = password;

    useEffect(() => {
        const timer = setTimeout(() => {
        setFormIsValid(emailIsValid && passwordIsValid);
        console.log("aaaa");
        }, 1000);
        return () => {
        clearTimeout(timer);
        console.log("zzz");
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ name: "USER_TYPING", payload: event.target.value });

    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ name: "USER_TYPING", payload: event.target.value });

    };

    const validateEmailHandler = () => {
        dispatchEmail({ name: "user 5raj mel input" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ name: "user 5raj mel input" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        testLogin(email.value, password.value);
    };
    return(
        <>
            <form onSubmit={submitHandler}>
                <div
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                    type="email"
                    id="email"
                    value={email.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    />
                </div>
                <div
                >
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    />
                </div>
                <div >
                    <button
                    type="submit"

                    >
                    Login
                    </button>
                </div>
            </form>
            <div>
                <p>Sign in with google</p>
                <button onClick={signInWithGoogle} disabled={isSigningIn}>
                    {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
                </button>
            </div>
        </>
    );
}
