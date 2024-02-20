import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [nutrition, setNutrition] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(name, email, contact, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, nutrition, setNutrition }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}