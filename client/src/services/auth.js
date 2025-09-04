// services/authService.ts
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    deleteUser,
} from "firebase/auth";
import { auth } from "../config/firebase";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export async function registerUser(payload) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
        );

        const firebaseUser = userCredential.user;

        // 2️⃣ Send user details to backend
        const response = await fetch(`${API_BASE_URL}/auth/create-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: payload.email,
                username: payload.username,
                department: payload.department,
                password: payload.password,
                matricNo: payload.matricNo,
                firebaseUid: firebaseUser.uid,
            }),
        });

        if (!response.ok) {
            // rollback
            try {
                if (auth.currentUser) {
                    await deleteUser(auth.currentUser);
                }
            } catch (rollbackError) {
                console.error("Rollback failed:", rollbackError);
            }

            const errorText = await response.json();
            throw new Error(errorText.message || response.statusText);
        }

        const data = await response.json();
        return { firebaseUser, backendUser: data };
    } catch (error) {
        console.error("Registration failed:", error.message);
        throw error;
    }
}

export const login = async (payload) => {
    const { email, password } = payload;
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};
