<template>
    <ion-page class="container max-w-7xl mx-auto">
        <HeaderWithBackButton title="Instellingen - Real Estate Care app" />

        <ion-content :fullscreen="true" color="tertiary" >

            <h1 class="sr-only" tabindex="0">Instellingen</h1>

            <section 
            tabindex="0" 
            class="flex flex-col items-center" 
            aria-labelledby="welcome-heading"
            >
                <header class="flex flex-col items-center mt-5">
                    <figure
                        class="relative flex justify-center items-center rounded-full border-2 border-primaryLight w-18 h-18"
                        aria-labelledby="profile-picture-label">
                        <span id="profile-picture-label" class="sr-only">
                            Profielafbeelding van {{ firstname}}  {{ lastname }}
                        </span>
                        <ion-icon 
                        :icon="personCircleOutline" 
                        class="text-primaryLight text-7xl"
                        aria-hidden="true"
                        >
                        </ion-icon>
                    </figure>

                    <div class="text-center font-bold text-lg mt-2 mb-4">
                        <h2 id="welcome-heading" class="text-textPrimaryLight dark:text-textPrimaryDark">
                            Welkom
                        </h2>
                        <p class="font-light text-textSecondaryLight dark:text-textSecondaryDark" id="user-name">
                            {{ firstname}}  {{ lastname }}
                        </p>
                    </div>
                </header>
            </section>


            <h2 tabindex="0" id="appearance-heading" class="mt-8 mb-4 pl-4 font-bold text-xl">
                Weergave
            </h2>
            <ion-list 
            aria-labelledby="appearance-heading" 
            :inset="true" 
            tabindex="0"
            class=" transition ease-in-out delay-150 focus-visible:border-primaryLight focus-visible:border-4 focus-visible:outline-none"
            >
                <ion-item lines="full">
                    <ion-toggle 
                    mode="ios"
                    :checked="darkPaletteToggle" 
                    @ionChange="toggleDarkMode" 
                    justify="space-between"
                    aria-label="Activeer of deactiveer donkere modus" 
                    :aria-checked="darkPaletteToggle" 
                    tabindex="0" 
                    class=" py-2 bg-white dark:bg-primaryDark"
                    >
                      Dark Mode
                    </ion-toggle>
                </ion-item>
            </ion-list>


            <div aria-live="polite" class="sr-only">
                Donkere modus is 
                {{ darkPaletteToggle 
                ? 'ingeschakeld' 
                : 'uitgeschakeld' }}.
            </div>


            <h2 tabindex="0" id="account-management-heading" class="mt-8 mb-4 pl-4 font-bold text-xl">
                Accountbeheer
            </h2>
            <ion-list 
            aria-labelledby="account-management-heading" 
            :inset="true" 
            tabindex="0"
            class=" transition ease-in-out delay-150  focus-visible:border-primaryLight focus-visible:border-4 focus-visible:outline-none"
            >
        
                <ion-item 
                @click="navigateToPage"
                @keydown.enter="navigateToPage"
                @keydown.space.prevent="navigateToPage" 
                lines="full" 
                detail 
                role="link"
                aria-labelledby="edit-profile-label" tabindex="0"
                class=" py-2 bg-white dark:bg-primaryDark"
                >
                    <ion-icon slot="start" :icon="personCircleOutline" aria-hidden="true" />
                    <ion-label id="edit-profile-label" >
                      Profiel Bewerken
                    </ion-label>
                </ion-item>

            </ion-list>

            <div class="mt-10 mx-3 flex my-4 ">
                <!-- Uitloggen Knop -->
                <ion-button color="warning" @click="logout" aria-label="Uitloggen" 
                class="text-md ">
                   <ion-icon 
                   slot="start" 
                   :icon="logOutOutline" 
                   class="text-white" 
                   aria-hidden="true" />
                    <span>Uitloggen</span>
                </ion-button>

                <!-- Uitloggen en Reset Knop -->
                <ion-button color="danger" class="text-md " type="submit"
                  :disabled="isLoading" fill="solid" @click="reset" aria-label="Wijzigingen opslaan">
                  <ion-icon slot="start" :icon="warningOutline" class="text-white" aria-hidden="true" />
                  <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                  <span v-else>Uitloggen / Reset</span>
                </ion-button>
            </div>


            <div v-if="errorAlert" aria-live="polite" role="alert" class=" pl-2 pt-1 text-danger">
                {{ errorMessage }}
            </div>

           
        </ion-content>
    </ion-page>
</template>


<script setup>
// Imports
import {
    IonContent,
    IonPage,
    IonIcon,
    IonLabel,
    IonList,
    IonItem,
    IonToggle,
    IonButton,
    IonSpinner,
} from '@ionic/vue';
import {
    personCircleOutline,
    logOutOutline,
    warningOutline
} from 'ionicons/icons';

import HeaderWithBackButton from '@/components/Layout/HeaderWithBackButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/Stores/themeStore';
import { useUserStore } from '@/Stores/userStore';
import { useInspectionStore } from '@/Stores/inspectionStore';

// services
import { usePhotoService } from '@/Services/photoService';

// Initialization
const router = useRouter();
const isLoading = ref(false);

const userStore = useUserStore();
const { resetUser } = userStore;
const inspectionStore = useInspectionStore();
const { 
    deleteAllFilesystem,  
    clearPreferences 
} = usePhotoService();


const profile = ref(userStore.profile[0])
const firstname =ref(profile.value.firstname);
const lastname =ref(profile.value.lastname);

const errorMessage = ref("");
const errorAlert = ref(false);

//DarkMode
const themeStore = useThemeStore();
// themeStore.initializeDarkMode();
const darkPaletteToggle = ref(themeStore.isDarkMode);
function toggleDarkMode(event) {
    const isDark = event.detail.checked;
    themeStore.setDarkMode(isDark);
    darkPaletteToggle.value = themeStore.isDarkMode
    console.log(`Dark mode is nu ${darkPaletteToggle.value ? 'ingeschakeld' : 'uitgeschakeld'}`);
    // console.log(darkPaletteToggle.value )
}

//Navigation
const navigateToPage = () => {
    document.activeElement.blur();
    router.push(`/settings/user`);
};


//logout 
const logout = async () => {
    document.activeElement.blur();
    try {
        await resetUser()
        await inspectionStore.clearCache()
        await userStore.clearCache()

        console.log("uitgelogd")
        errorMessage.value = '';
        errorAlert.value = false;
        router.replace('/login');
    } catch (e) {
        errorAlert.value = true;
        errorMessage.value = e
    }
}
const reset = async () => {
    document.activeElement.blur();
    isLoading.value = true;
    try {
        await inspectionStore.deleteAllInspections()
        await userStore.deleteUserProfile()
        await resetUser()
        await inspectionStore.clearCache()
        await userStore.clearCache()
        await clearPreferences()
        await deleteAllFilesystem()
        
        console.log("uitgelogd / reset")
        errorMessage.value = '';
        errorAlert.value = false;
        router.replace('/login');
    } catch (e) {
        errorAlert.value = true;
        errorMessage.value = e
    } finally {
       isLoading.value = false;
    }
}



</script>

<style scoped>
ion-item {
    --background: white;
    --color: #000000;
}

body.dark-theme ion-item{
    --background: var(--ion-color-secondary);
    --color: #fff;
}

</style>