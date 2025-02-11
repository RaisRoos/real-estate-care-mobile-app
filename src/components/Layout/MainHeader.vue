<template>
    <ion-header class="ion-no-border">
        <ion-toolbar :style="{'--background': `url(${backgroundSrc}) no-repeat top center`}" class="flex justify-center items-center px-5 max-w-7xl mx-auto z-2">
            <img :src="logoSrc" alt="Real Estate Care Logo" class="h-10 w-auto mt-10 mb-2" />
            <ion-title mode="ios" class="sr-only" tabindex="0">
                Real Estate Care
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script setup>
// Imports
import {
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/vue';

import { computed } from 'vue';
import { useThemeStore } from '@/Stores/themeStore';

// Initialization
const themeStore = useThemeStore();

//Computed
const logoSrc = computed(() => {
    return themeStore.isDarkMode
        ? '/assets/logo/real-estate-care-light.svg'
        : '/assets/logo/real-estate-care-dark.svg';
});
const backgroundSrc = computed(() => {
    return themeStore.isDarkMode
        ?  '/assets/images/darkmode-bg.png'
        : '/assets/images/lightmode-bg.png';
});



</script>