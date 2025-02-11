import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/Services/firebase.js";

//Authenticates a user using email and password.
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // console.error("Fout bij het inloggen:", error);
        throw error;
    }
};

//Listens for changes in the user's authentication state.
export const authStateListener = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(user)
        } else {
            callback(null)
        }
    })
}

//Logs out the currently authenticated user.
export const loginOut = async () => {
    await signOut(auth)
    return true
}

