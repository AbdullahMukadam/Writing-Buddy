import { auth, googleAuth } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";


export const authservice = {

    SignUp: async ({ email, password, username }) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password, username)
            return userCredentials.user;
        } catch (error) {
            console.log("Errror in CreateAccout", error)
        }

    },

    SignUpWithGoogle: async () => {
        try {
           return await signInWithPopup(auth, googleAuth)
        } catch (error) {
            console.log("erroe in google auth", error)
        }
    },


    SignIn: async ({ email, password }) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            return userCredentials.user
        } catch (error) {
            console.log("Error in SignIn", error)
        }
    },

    SignOut: async () => {
        try {
            await signOut(auth);
            return true; 
        } catch (error) {
            console.error("Error in SignOut", error);
            throw error;
        }
    },

    getCurrentUser: () => {
        return auth.currentUser
    }


}
