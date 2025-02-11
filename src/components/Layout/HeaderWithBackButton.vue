<template>
    <ion-header class="ion-no-border max-w-8xl mx-auto ">
        <ion-toolbar :style="{'--background': `url(${backgroundSrc}) no-repeat top center`}" class="flex items-center justify-between pb-4">

            <ion-title mode="ios" class="sr-only" tabindex="0">
                {{ title }}
            </ion-title>
            <ion-buttons slot="start"
                class="shadow-md bg-primaryLight rounded-md flex items-center justify-center p-0 mt-4  ml-3">
                <ion-back-button mode="md" default-href="/home"
                    aria-label="Ga terug naar de hoofdpagina"></ion-back-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
</template>

<script setup>
// Imports
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
} from "@ionic/vue";
import { computed } from 'vue';

import { useThemeStore } from '@/Stores/themeStore';

// Initialization
const themeStore = useThemeStore();

const props = defineProps({
    title: {
        type: String
    }
})

//Computed method
const backgroundSrc = computed(() => {
    return themeStore.isDarkMode
        ?  '/assets/images/darkmode-bg.png'
        : '/assets/images/lightmode-bg.png';
});
</script>

