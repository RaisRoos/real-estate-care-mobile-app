import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import profileJson from '@/data/profile.json';

import { authStateListener, loginOut } from '@/Services/auth'
import { Preferences } from '@capacitor/preferences';
import { getData, postData, updateData, deleteData } from '@/Services/apiService';

export const useUserStore = defineStore('user', () => {

    const user = ref(null);
    const userUid = ref(null)
    const profile = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const profileQueue = ref([]);
    const isOffline = ref(false)
    const isOnline = () => window.navigator.onLine;


    const isLoggedIn = computed(() => user.value !== null);


    const setUser = (userData) => {
        user.value = userData.uid;
        userUid.value = userData.uid
    };

    const resetUser = async () => {
        try {
            await loginOut()
            user.value = null;
            profile.value = null;
            return true

        } catch (e) {
            // console.log("Error: " + e)
            return false
        }
    };


    const initializeAuthListener = () => {
        return new Promise((resolve) => {
            authStateListener(async (authUser) => {
                if (authUser) {
                    setUser(authUser);
                } else {
                    resetUser();
                }
                resolve(true);
            });
        });
    };

    //Loads Profie data from local storage || firebase realtime database.
    //If offline: load data from local storage.
    //Back online: synchronizes any offline changes with the Firebase Realtime Database.
    //If no data exists in both the cache && the database:
    //uses a local JSON file (profileJson) to initialize the profile
    //and uploads this data to the Firebase Realtime Database.
    const loadProfile = async () => {
        isLoading.value = true;
        try {
            if (!isOnline()) {
                // console.log('Offline');
                const { value } = await Preferences.get({ key: 'profile' });

                if (value) {
                    profile.value = JSON.parse(value);
                    // console.log('Profile geladen uit cache:', profile.value);

                } else {
                    throw new Error('Geen gegevens beschikbaar in cache');
                }
                isOffline.value = true;
                return;
            }

            if (isOnline() && isOffline.value === true) {
                // console.log('Terug online');
                await syncOfflineChanges();
                isOffline.value = false;
            }


            const { value } = await Preferences.get({ key: 'profile' });
            if (value) {
                profile.value = JSON.parse(value);
                // console.log('Gegevens geladen vanuit cache');
                // console.log(profile.value);
            } else {
                const profileData = await getData('/profile');
                if (profileData) {
                    profile.value = Object.entries(profileData).map(([firebaseId, item]) => ({
                        ...item,
                        id: item.id || firebaseId,
                        firebaseId,
                    }));

                    await Preferences.set({
                        key: 'profile',
                        value: JSON.stringify(profile.value),
                    });
                    // console.log('Gegevens zijn gecached', profile.value);
                } else {
                    const promises = profileJson.map(async (profile) => {
                        const data = await postData('/profile', {
                            ...profile,
                            id: profile.id,
                        });

                        return {
                            id: profile.id,
                            firebaseId: data.name,
                            ...profile,
                        };
                    });

                    const newProfile = await Promise.all(promises);
                    profile.value = newProfile;
                    await Preferences.set({
                        key: 'profile',
                        value: JSON.stringify(profile.value),
                    });
                }
            }
        } catch (err) {
            error.value = err.message;
            // console.error('Fout bij het laden van inspecties:', err);
        } finally {
            isLoading.value = false;
        }
    };

    const setupSyncListener = () => {
        window.addEventListener('online', loadProfile);
    };


    const syncOfflineChanges = async () => {
        if (!profileQueue.value.length) {
            // console.log('Geen offline wijzigingen om te synchroniseren.');
            return;
        }

        try {
            for (const action of profileQueue.value) {
                const { firebaseId, data } = action;

                await updateData(`/profile/${firebaseId}`, data);
            }

            profileQueue.value = [];
            await Preferences.set({
                key: 'profileQueue',
                value: JSON.stringify(profileQueue.value),
            });
            // console.log('Offline wijzigingen succesvol gesynchroniseerd.');
        } catch (err) {
            error.value = 'Fout bij het synchroniseren van offline wijzigingen';
            // console.error('Fout bij het synchroniseren van offline wijzigingen:', err);
        }
    };


    const addToQueue = async (action) => {
        profileQueue.value.push(action);
        await Preferences.set({
            key: 'profileQueue',
            value: JSON.stringify(profileQueue.value),
        });
    };

    const updateProfile = async (updatedProfile) => {
        isLoading.value = true;
        try {
            const firebaseId = updatedProfile.firebaseId;
            console.log(firebaseId)
            if (!firebaseId) {
                throw new Error('Geen ID gevonden');
            }

            if (!isOnline()) {
                // console.log('Offline: wijzigingen toevoegen aan de wachtrij');
                await addToQueue({ type: 'update', firebaseId, data: updatedProfile });
                const index = profile.value.findIndex((profile) => profile.firebaseId === firebaseId);
                if (index !== -1) {
                    profile.value[index] = { ...profile.value[index], ...updatedProfile };
                    await Preferences.set({
                        key: 'profile',
                        value: JSON.stringify(profile.value),
                    });
                }
                isOffline.value = true;
                return;
            }

            await updateData(`/profile/${firebaseId}`, updatedProfile);
            const index = profile.value.findIndex((profile) => profile.firebaseId === firebaseId);
            profile.value[index] = { ...profile.value[index], ...updatedProfile };
            await Preferences.set({
                key: 'profile',
                value: JSON.stringify(profile.value),
            });


        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };


    const clearCache = async () => {
        try {
            await Preferences.remove({ key: 'profile' });

            console.log('Cache is succesvol verwijderd');
        } catch (err) {
            // console.error('Fout bij het verwijderen van de cache:', err);
            throw err;
        }
    };

    const deleteUserProfile = async () => {
        isLoading.value = true;
        try {

            if (!isOnline()) {

                error.value = "U moet verbonden zijn met internet."
                throw new Error('U moet verbonden zijn met internet.');
            }

            for (const userProfile of profile.value) {
                const firebaseId = userProfile.firebaseId;
                if (!firebaseId) {
                    // console.warn(`Geen Firebase ID gevonden voor profiel: ${userProfile.firebaseId}`);
                    console.warn(`Geen ID gevonden`);
                    continue;
                }
                try {
                    await deleteData(`/profile/${firebaseId}`);
                    // console.log(`Profiel verwijderd: ${firebaseId}`);
                } catch (err) {
                    // console.error(`Fout bij het verwijderen van profiel: ${firebaseId}`, err);
                    console.error(`Fout bij het verwijderen van profiel: ${firebaseId}`);
                }
            }

            profile.value = [];
            await Preferences.set({
                key: 'profile',
                value: JSON.stringify(profile.value),
            });

            console.log('profile is succesvol verwijderd.');
        } catch (err) {
            error.value = err.message;
            // console.error('Fout bij het verwijderen van profile:', err);
        } finally {
            isLoading.value = false;
        }
    };


    return {
        user,
        userUid,
        profile,
        isLoading,
        error,
        isLoggedIn,


        setUser,
        resetUser,
        initializeAuthListener,
        loadProfile,
        setupSyncListener,
        updateProfile,
        clearCache,
        deleteUserProfile
    };
});