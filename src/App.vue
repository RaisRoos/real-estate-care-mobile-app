<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
// Imports
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';

import { useThemeStore } from '@/Stores/themeStore';
import { useInspectionStore } from '@/Stores/inspectionStore';
import { useUserStore } from '@/Stores/userStore';

// Initialization
const inspectionStore = useInspectionStore();
const userStore = useUserStore();
const themeStore = useThemeStore();

if (userStore.isLoggedIn) {

//Hooks
onMounted(()=>{
  themeStore.initializeDarkMode()
  inspectionStore.loadInspections();
  userStore.loadProfile();
})
}


</script>
