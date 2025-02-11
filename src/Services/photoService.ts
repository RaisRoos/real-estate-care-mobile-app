import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
    description?: string;
}


export const usePhotoService = (category: string, inspectionId: string, firebaseId: string) => {
    const PHOTO_STORAGE_KEY = `${category}_${inspectionId}_${firebaseId}_photos`;
    const photos = ref<UserPhoto[]>([]);

    //Opens the device’s camera to capture a new photo and saves it .
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 90,
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);

        photos.value = [savedFileImage, ...photos.value];
    };

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string;
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;
        } else {
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = (await convertBlobToBase64(blob)) as string;
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (isPlatform('hybrid')) {
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
                description: '',
            };
        } else {
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
                description: '',
            };
        }
    };

    const convertBlobToBase64 = (blob: Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
        });

    //Saves the photos to the device's preferences/local storage.
    const cachePhotos = () => {
        Preferences.set({
            key: PHOTO_STORAGE_KEY,
            value: JSON.stringify(photos.value),
        });
    };

    //Retrieves and loads saved photos from preferences.
    const loadSaved = async () => {
        const photoList = await Preferences.get({ key: PHOTO_STORAGE_KEY });
        const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

        if (!isPlatform('hybrid')) {
            for (const photo of photosInPreferences) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                });
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        photos.value = photosInPreferences;
    };

    //Modifies the description of a specific photo.
    const updatePhotoDescription = (filepath: string, newDescription: string) => {
        if (newDescription.length > 100) {
            console.error('Beschrijving mag niet langer zijn dan 100 tekens.');
            return;
        }
        const photo = photos.value.find((p) => p.filepath === filepath);
        if (photo) {
            photo.description = newDescription;

            cachePhotos();
        }
    };

    //Deletes a specific photo.
    const deletePhoto = async (photo: UserPhoto) => {
        photos.value = photos.value.filter((p) => p.filepath !== photo.filepath);
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data,
        });
    };


    //Retrieves photos from preferences by a specified key.
    const loadPhotosByKey = async (key: string): Promise<UserPhoto[]> => {

        const photoList = await Preferences.get({ key });
        const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

        if (!isPlatform('hybrid')) {
            for (const photo of photosInPreferences) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                });
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        return photosInPreferences;
    };

    //Removes all photos from preferences by a specified key and their corresponding files from the filesystem.
    const deleteByKey = async (key: string) => {
        try {

            const photoList = await Preferences.get({ key });
            const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

            for (const photo of photosInPreferences) {
                const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
                try {
                    await Filesystem.deleteFile({
                        path: filename,
                        directory: Directory.Data,
                    });
                    // console.log(`Bestand verwijderd: ${filename}`);
                } catch (err) {
                    console.error(`Fout bij het verwijderen van bestand: ${filename}`, err);
                }
            }


            await Preferences.remove({ key });
            // console.log(`Voorkeur verwijderd: ${key}`);
        } catch (error) {
            console.error(`Fout bij het verwijderen key: "${key}":`, error);
        }
    };


    //FOR TEST: Lists all the keys/values in preferences
    const listPreferences = async () => {
        try {
            const { keys } = await Preferences.keys();
            console.log('Sleutels opgeslagen in Preferences:', keys);

            for (const key of keys) {
                const { value } = await Preferences.get({ key });
                console.log(`Sleutel: ${key}, Waarde: ${value}`);
            }
        } catch (error) {
            console.error('Fout bij het ophalen van Preferences:', error);
        }
    };

    //FOR TEST: Lists all files and directories within a given directory on the device's filesystem.
    const listAllFilesystem = async (directory: Directory = Directory.Data, path: string = '') => {
        try {
            const result = await Filesystem.readdir({
                directory,
                path,
            });

            console.log(`Inhoud van map "${path || '/'}":`, result.files);


            for (const file of result.files) {
                if (file.type === 'directory') {
                    await listAllFilesystem(directory, `${path}/${file.name}`);
                } else {

                    const fileContent = await Filesystem.readFile({
                        directory,
                        path: `${path}/${file.name}`,
                    });
                    console.log(`Bestand: ${path}/${file.name}, Inhoud:`, fileContent.data);
                }
            }
        } catch (error) {
            console.error(`Fout bij het ophalen van inhoud van map "${path || '/'}":`, error);
        }
    };

    //removs all stored keys and their values.
    const clearPreferences = async () => {
        await Preferences.clear();
        console.log('Alle zijn verwijderd.');
    };

    //deletes all files and subdirectories.
    const deleteAllFilesystem = async (directory: Directory = Directory.Data, path: string = '') => {
        try {

            const result = await Filesystem.readdir({
                directory,
                path,
            });


            for (const file of result.files) {
                const currentPath = `${path}/${file.name}`;
                if (file.type === 'directory') {

                    await deleteAllFilesystem(directory, currentPath);

                    await Filesystem.rmdir({
                        directory,
                        path: currentPath,
                    });
                    console.log(`Map verwijderd: ${currentPath}`);
                } else {

                    await Filesystem.deleteFile({
                        directory,
                        path: currentPath,
                    });
                    console.log(`Bestand verwijderd: ${currentPath}`);
                }
            }
        } catch (error) {
            console.error(`Fout bij het verwijderen van inhoud in map "${path || '/'}":`, error);
        }
    };


    onMounted(loadSaved);
    watch(photos, cachePhotos);

    return {
        photos,

        takePhoto,
        deletePhoto,
        updatePhotoDescription,

        loadPhotosByKey,
        deleteByKey,

        loadSaved,

        listPreferences,
        listAllFilesystem,
        clearPreferences,
        deleteAllFilesystem
    };
};
