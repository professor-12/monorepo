import { onAuthStateChanged } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";
import { login, registerUser } from "../services/auth";
import { useEffect } from "react";
import { useState } from "react";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }) => {
            return await login({ email, password });
        },
        onSuccess: (user) => {
            toast.success("Login successful!");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log("Login failed:", error.message);
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (credentials) => {
            return await registerUser(credentials);
        },
        onSuccess: (user) => {
            toast.success("Registration successful!");
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
            // console.log("Registration failed:", error.message);
        },
    });
};

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to Firebase auth state
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};
