import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import inspectionsJson from '@/data/inspections.json';
import { Preferences } from '@capacitor/preferences';
import { getData, postData, updateData, deleteData } from '@/Services/apiService';

export const useInspectionStore = defineStore('inspections', () => {

    const inspections = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const inspectionsQueue = ref([]);
    const isOffline = ref(false)
    const isOnline = () => window.navigator.onLine;

    const completedInspections = computed(() =>
        inspections.value
            .filter((inspection) => inspection.status === 'Uitgevoerd')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    const pendingInspections = computed(() =>
        inspections.value
            .filter((inspection) => inspection.status === 'Openstaand')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    const getInspectionById = computed(() => {
        return (id) => inspections.value.find((inspection) => inspection.id === id);
    });


    const setupSyncListener = () => {
        window.addEventListener('online', loadInspections);
    };


    //Loads inspection data from local storage || firebase realtime database.
    //If offline: load data from local storage.
    //Back online: synchronizes any offline changes with the Firebase Realtime Database.
    //If no data exists in both the cache && the database:
    //uses a local JSON file (inspectionsJson) to initialize the inspections 
    //and uploads this data to the Firebase Realtime Database.
    const loadInspections = async () => {
        isLoading.value = true;
        try {
            if (!isOnline()) {
                // console.log('Offline modus');
                const { value } = await Preferences.get({ key: 'inspections' });

                if (value) {
                    inspections.value = JSON.parse(value);
                    // console.log('Inspecties geladen uit cache:', inspections.value);

                } else {
                    throw new Error('Geen gegevens beschikbaar in cache');
                }
                isOffline.value = true;
                return;
            }

            if (isOnline() && isOffline.value === true) {
                console.log('Terug online: synchroniseren van offline wijzigingen');
                await syncOfflineChanges();
                isOffline.value = false;
            }


            const { value } = await Preferences.get({ key: 'inspections' });
            if (value) {
                inspections.value = JSON.parse(value);
                // console.log('Gegevens geladen vanuit cache');
                // console.log(inspections.value);
            } else {
                const inspectionData = await getData('/inspections');
                if (inspectionData) {
                    inspections.value = Object.entries(inspectionData).map(([firebaseId, item]) => ({
                        ...item,
                        id: item.id || firebaseId,
                        firebaseId,
                    }));

                    await Preferences.set({
                        key: 'inspections',
                        value: JSON.stringify(inspections.value),
                    });
                    console.log('Gegevens zijn gecached');
                } else {
                    const promises = inspectionsJson.map(async (inspection) => {
                        const data = await postData('/inspections', {
                            ...inspection,
                            id: inspection.id,
                        });

                        return {
                            id: inspection.id,
                            firebaseId: data.name,
                            ...inspection,
                        };
                    });

                    const newInspections = await Promise.all(promises);
                    inspections.value = newInspections;
                    await Preferences.set({
                        key: 'inspections',
                        value: JSON.stringify(inspections.value),
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

    const clearCache = async () => {
        try {
            await Preferences.remove({ key: 'inspections' });
            // console.log('Cache is succesvol verwijderd');
        } catch (err) {
            // console.error('Fout bij het verwijderen van de cache:', err);
            throw err;
        }
    };

    const updateInspection = async (updatedInspection) => {
        isLoading.value = true;
        try {
            const firebaseId = updatedInspection.firebaseId;

            if (!firebaseId) {
                throw new Error('Geen ID gevonden');
            }

            if (!isOnline()) {
                // console.log('Offline: wijzigingen toevoegen aan de wachtrij');
                await addToQueue({ type: 'update', firebaseId, data: updatedInspection });
                const index = inspections.value.findIndex((inspection) => inspection.firebaseId === firebaseId);
                if (index !== -1) {
                    inspections.value[index] = { ...inspections.value[index], ...updatedInspection };
                    await Preferences.set({
                        key: 'inspections',
                        value: JSON.stringify(inspections.value),
                    });
                }
                isOffline.value = true;
                return;
            }

            await updateData(`/inspections/${firebaseId}`, updatedInspection);

            const index = inspections.value.findIndex((inspection) => inspection.firebaseId === firebaseId);
            if (index !== -1) {
                inspections.value[index] = { ...inspections.value[index], ...updatedInspection };
                await Preferences.set({
                    key: 'inspections',
                    value: JSON.stringify(inspections.value),
                });
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteInspection = async (inspectionToDelete) => {
        isLoading.value = true;
        try {
            const firebaseId = inspectionToDelete.firebaseId;

            if (!firebaseId) {
                throw new Error('Geen ID gevonden');
            }

            if (!isOnline()) {
                // console.log('Offline: verwijderactie toevoegen aan de wachtrij');
                await addToQueue({ type: 'delete', firebaseId });
                inspections.value = inspections.value.filter((inspection) => inspection.firebaseId !== firebaseId);

                await Preferences.set({
                    key: 'inspections',
                    value: JSON.stringify(inspections.value),
                });
                isOffline.value = true;
                return;
            }
            await deleteData(`/inspections/${firebaseId}`);

            inspections.value = inspections.value.filter((inspection) => inspection.firebaseId !== firebaseId);
            await Preferences.set({
                key: 'inspections',
                value: JSON.stringify(inspections.value),
            });
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };



    const syncOfflineChanges = async () => {
        if (!inspectionsQueue.value.length) {

            // console.log('Geen offline wijzigingen om te synchroniseren.');
            return;
        }

        try {
            for (const action of inspectionsQueue.value) {
                const { type, firebaseId, data } = action;

                switch (type) {
                    case 'update':
                        await updateData(`/inspections/${firebaseId}`, data);
                        break;
                    case 'delete':
                        await deleteData(`/inspections/${firebaseId}`);
                        break;
                    default:
                        console.error('Onbekende actie:', type);
                }
            }

            inspectionsQueue.value = [];
            await Preferences.set({
                key: 'inspectionsQueue',
                value: JSON.stringify(inspectionsQueue.value),
            });
            // console.log('Offline wijzigingen succesvol gesynchroniseerd.');
        } catch (err) {
            console.error('Fout bij het synchroniseren van offline wijzigingen:', err);
        }
    };


    const addToQueue = async (action) => {
        inspectionsQueue.value.push(action);
        await Preferences.set({
            key: 'inspectionsQueue',
            value: JSON.stringify(inspectionsQueue.value),
        });
    };


    const deleteAllInspections = async () => {
        isLoading.value = true;
        try {

            if (!isOnline()) {

                error.value = "U moet verbonden zijn met internet."
                throw new Error('U moet verbonden zijn met internet.');
            }


            for (const inspection of inspections.value) {
                const firebaseId = inspection.firebaseId;

                if (!firebaseId) {
                    console.warn(`Geen ID gevonden`);
                    continue;
                }

                try {
                    await deleteData(`/inspections/${firebaseId}`);
                    // console.log(`Inspectie verwijderd: ${firebaseId}`);
                } catch (err) {
                    console.error(`Fout bij het verwijderen van inspectie: ${firebaseId}`, err);
                }
            }


            inspections.value = [];
            await Preferences.set({
                key: 'inspections',
                value: JSON.stringify(inspections.value),
            });

            console.log('Alle inspecties zijn succesvol verwijderd.');
        } catch (err) {
            error.value = err.message;
            console.error('Fout bij het verwijderen van alle inspecties:', err);
        } finally {
            isLoading.value = false;
        }
    };




    return {
        inspections,
        isLoading,
        error,
        completedInspections,
        pendingInspections,
        getInspectionById,

        loadInspections,
        updateInspection,
        clearCache,
        deleteInspection,
        setupSyncListener,
        deleteAllInspections
    };
});
