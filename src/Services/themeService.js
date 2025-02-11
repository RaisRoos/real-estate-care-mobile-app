import { Preferences } from '@capacitor/preferences';

export const toggleDarkPalette = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    document.documentElement.classList.toggle('dark', isDark);
};

export const saveDarkModePreference = async (isDark) => {
    await Preferences.set({
        key: 'darkMode',
        value: JSON.stringify(isDark),
    });
};

export const loadDarkModePreference = async () => {
    const { value } = await Preferences.get({ key: 'darkMode' });
    return value ? JSON.parse(value) : null;
};

