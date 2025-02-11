<template>
    <ion-page class="container max-w-7xl mx-auto">
        <HeaderWithBackButton title="Profiel Bewerken" />

        <ion-content :fullscreen="true" color="tertiary">

            <section tabindex="0" class="flex flex-col items-center" aria-labelledby="welcome-heading">
                <header class="flex flex-col items-center mt-8">
                    <figure
                    class="relative flex justify-center items-center rounded-full border-2 border-primaryLight w-18 h-18"
                    aria-labelledby="profile-picture-label">
                        <span 
                        id="profile-picture-label" 
                        class="sr-only"
                        >
                          Profielafbeelding van  {{ firstname}}  {{ lastname }}
                        </span>
                        <ion-icon 
                        :icon="personCircleOutline" 
                        class="text-primaryLight text-7xl"
                        aria-hidden="true">
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

            <section 
            id="edit-profile-section"
            class="mx-2 p-3 my-5 bg-white dark:bg-primaryDark shadow-md rounded-xl border-t-4 border-primaryLight"
            tabindex="0"
            >
                <h2 class="pb-3 text-xl font-semibold" id="edit-profile-header">
                    Profiel Bewerken
                </h2>
                <form @submit.prevent="saveProfile">
                    <ion-item lines="none" class="dark:border-2 dark:border-primaryLight mb-2">
                        <ion-label for="firstname">Voornaam:</ion-label>
                        <ion-input 
                        id="firstname" 
                        label-placement="stacked" 
                        :clear-input="true"
                        placeholder="Voer je voornaam in" 
                        aria-describedby="firstname-error" 
                        v-model="firstname"
                        required
                        >
                        </ion-input>
                        <p 
                        id="firstname-error" 
                        class=" sr-only text-danger" 
                        v-if="firstnameError"
                        >
                            Voornaam is verplicht.
                        </p>
                    </ion-item>

                    <ion-item lines="none" class=" dark:border-2 dark:border-primaryLight mb-3">
                        <ion-label for="lastname">Achternaam:</ion-label>
                        <ion-input 
                        id="lastname" 
                        label-placement="stacked" 
                        :clear-input="true" 
                        placeholder="Voer je achternaam in" 
                        aria-describedby="lastname-error" 
                        v-model="lastname"
                        required
                        >
                        </ion-input>
                        <p 
                        id="lastname-error" 
                        class=" sr-only text-danger" 
                        v-if="lastnameError"
                        >
                            Achternaam is verplicht.
                        </p>
                    </ion-item>

                    <div class="my-2 flex justify-between">
                        <ion-button 
                        class="w-5/12 font-bold text-xl" 
                        fill="outline"
                        :color="darkMode ? 'light' : 'secondary'"
                        @click="cancelAndGoBack"
                        aria-label="Wijzigingen annuleren"
                        >
                          Annuleren
                        </ion-button>

                        <ion-button 
                        @click="saveProfile" 
                        type="submit" 
                        expand="block" 
                        :disabled="isLoading"
                        class="text-xl w-7/12 submit-btn dark:text-textPrimaryLight font-bold"
                        aria-label="Wijzigingen opslaan"
                        >
                            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                            <span v-else>Opslaan</span>
                        </ion-button>
                    </div>
                </form>
            </section>


            <!-- Toast component -->
            <ion-toast :is-open="showToast" :message="toastMessage" duration="3000" position="top" role="alert"
                aria-live="polite" @did-dismiss="showToast = false"></ion-toast>

            <!-- Aria Live Region -->
            <div v-if="showToast" aria-live="assertive" role="alert" class="sr-only">
                {{ toastMessage }}
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
    IonItem,
    IonButton,
    IonInput,
    IonToast,
    IonSpinner
} from "@ionic/vue";
import { personCircleOutline } from "ionicons/icons";
import HeaderWithBackButton from "@/components/Layout/HeaderWithBackButton.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/Stores/themeStore';
import { useUserStore } from '@/Stores/userStore';

// Initialization
const themeStore = useThemeStore();
const userStore = useUserStore();
const darkMode = themeStore.isDarkMode;
const router = useRouter();

const profile = ref(userStore.profile[0])
const firstname =  ref(profile.value.firstname);
const lastname =  ref(profile.value.lastname);

const firstnameError = ref(false);
const lastnameError = ref(false);

const showToast = ref(false);
const toastMessage = ref("");
const isLoading = ref(false);

//methods
const cancelAndGoBack = () => {
    toastMessage.value = "Wijzigingen geannuleerd.";
    showToast.value = true;
    router.replace('/settings'); 
};

const saveProfile = async() => {
    if (!firstname.value || !lastname.value) {
        firstnameError.value = !firstname.value;
        lastnameError.value = !lastname.value;
        return;
    }
    const newProfile = {
      id:profile.value.id ,
      firstname: firstname.value,
      lastname: lastname.value,
      firebaseId: profile.value.firebaseId,
      date :new Date().toISOString().split('T')[0] ,
    }

    console.log("edit profile");
    isLoading.value = true;
  
    try {
        if (newProfile) {
            await userStore.updateProfile(newProfile);
            toastMessage.value = 'Profiel succesvol bijgewerkt. Ververs de pagina om de wijzigingen te zien.';
            console.log("update .", newProfile);
            showToast.value = true;
        } else {
            
            // console.error("Geen update mogelijk zonder ID.");
            toastMessage.value = 'Profile niet opgeslagen. Geen ID gevonden.';
            showToast.value = true;
        }

        showToast.value = true;
        router.replace('/'); 
    } catch (err) {
        console.error('Fout bij opslaan:', err);
        toastMessage.value = 'Er is een fout opgetreden.';
        showToast.value = true;
    } finally {
        isLoading.value = false;
    }
    

};


</script>

<style scoped>
.submit-btn:focus,
.submit-btn:focus-visible,
.submit-btn:hover {
    --background: var(--ion-color-primary);
}

.submit-btn {
    --background: var(--ion-color-secondary);
}

body.dark-theme .submit-btn {
    --background: var(--ion-color-light);
}

body.dark-theme .submit-btn:focus,
body.dark-theme .submit-btn:focus-visible,
body.dark-theme .submit-btn:hover {
    --background: var(--ion-color-primary);
    color: white;
}

ion-item {
    --background: white;
    --color: #000000;
}

body.dark-theme ion-item{
    --background: var(--ion-color-secondary);
    --color: #fff;
}
</style>