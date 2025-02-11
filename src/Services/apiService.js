import axios from 'axios';
import { auth } from '@/Services/firebase';

const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

//Fetches data from the Firebase Realtime Database.
export const getData = async (path) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Gebruiker is niet ingelogd');
        }

        const token = await user.getIdToken(true);

        const response = await axios.get(`${FIREBASE_DB_URL}${path}.json?auth=${token}`);

        return response.data;
    } catch (error) {
        console.error(`${path}:`, error);
        throw error;
    }
};

//Sends new data to the Firebase Realtime Database.
export const postData = async (path, data) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Gebruiker is niet ingelogd');
        }

        const token = await user.getIdToken(true);

        const response = await axios.post(`${FIREBASE_DB_URL}${path}.json?auth=${token}`, data);
        return response.data;
    } catch (error) {
        // console.error(`${path}:`, error);
        throw error;
    }
};

//Updates existing data in the Firebase Realtime Database.
export const updateData = async (path, data) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Gebruiker is niet ingelogd');
        }

        const token = await user.getIdToken(true);

        const response = await axios.put(`${FIREBASE_DB_URL}${path}.json?auth=${token}`, data);
        return response.data;
    } catch (error) {
        // console.error(`${path}:`, error);
        throw error;
    }
};

//Deletes data from the Firebase Realtime Database.
export const deleteData = async (path) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Gebruiker is niet ingelogd');
        }

        const token = await user.getIdToken(true);

        const response = await axios.delete(`${FIREBASE_DB_URL}${path}.json?auth=${token}`);
        return response.data;
    } catch (error) {
        // console.error(`${path}:`, error);
        throw error;
    }
};
