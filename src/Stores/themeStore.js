import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    toggleDarkPalette,
    saveDarkModePreference,
    loadDarkModePreference,
} from '@/Services/themeService';

export const useThemeStore = defineStore('theme', () => {

    //dark mode == ture or false
    const isDarkMode = ref(false);

    //Initializes the dark mode based on either the user's saved preference || the system's default preference.
    const initializeDarkMode = async () => {
        const savedPreference = await loadDarkModePreference();
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        isDarkMode.value = savedPreference !== null ? savedPreference : prefersDark;
        toggleDarkPalette(isDarkMode.value);


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            const systemDarkMode = event.matches;
            if (savedPreference === null) {
                isDarkMode.value = systemDarkMode;
                toggleDarkPalette(systemDarkMode);
            }
        });
    };

    // Toggles between dark and light themes
    const setDarkMode = (value) => {
        isDarkMode.value = value;
        toggleDarkPalette(value);
        saveDarkModePreference(value);
    };

    return {
        isDarkMode,
        initializeDarkMode,
        setDarkMode,
    };
});
