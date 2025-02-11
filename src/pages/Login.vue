<template>
    <ion-page>
        <ion-content color="tertiary">
            <div class="mx-auto w-full flex justify-center items-center pt-8">
                <img :src="logoSrc"  alt="Logo van Real Estate Care."
                    class="h-10 w-auto my-4" />
            </div>

            <h1 tabindex="0" class=" sr-only">
                Welkom! Log in bij Real estate care
            </h1>

            <ion-card class="mx-5 px-2 py-7 rounded-2xl bg-white dark:bg-primaryDark lg:w-6/12 lg:mx-auto z-10">

                <div class="text-center mb-8 text-5xl text-primary" aria-hidden="true">
                    <ion-icon :icon="lockClosed" aria-hidden="true"></ion-icon>
                </div>

                <form @submit.prevent="signIn">

                    <!-- Email-input -->
                    <div class="flex justify-center items-center mb-4 ">
                        <label for="email-input" class="sr-only">E-mailadres</label>
                        <div class="bg-primary text-white p-3 rounded-l-md w-2/12 flex items-center justify-center">
                            <ion-icon :icon="mailOutline" aria-hidden="true" size="large"></ion-icon>
                        </div>
                        <div class="bg-secondaryLight w-9/12 rounded-r-md">
                            <ion-input 
                            color="primary"  
                            id="email-input" 
                            type="email" 
                            v-model="email"
                            label-placement="stacked" 
                            aria-required="true"
                            class=" text-textPrimaryLight ml-2 w-11/12 text-base"
                            aria-label="E-mailadres invoeren"
                            required
                            >
                                <div 
                                class=" text-textPrimaryLight" 
                                slot="label"
                                >
                                  E-mail 
                                  <ion-text color="danger">*</ion-text>
                                </div>
                            </ion-input>
                        </div>
                    </div>

                    <!-- Password-input -->
                    <div class="flex justify-center items-center mb-8 ">
                        <label for="password-input" class="sr-only">Wachtwoord</label>
                        <div class="bg-primary text-white p-3 py-4 rounded-l-md w-2/12 flex items-center justify-center">
                            <ion-icon :icon="keyOutline" aria-hidden="true" size="large"></ion-icon>
                        </div>
                        <div class="bg-secondaryLight w-9/12 rounded-r-md">
                            <ion-input
                            id="password-input" 
                            type="password" 
                            v-model="password"
                            label-placement="stacked" 
                            aria-required="true"
                            class="ml-2 w-11/12  text-textPrimaryLight text-base" 
                            aria-label="Wachtwoord invoeren" 
                            required
                            
                            >
                                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                                <div 
                                class="text-textPrimaryLight " 
                                slot="label"
                                >
                                   Wachtwoord
                                  <ion-text color="danger">*</ion-text>
                                </div>
                            </ion-input>

                            
                        </div>
                    </div>

                    <!-- Login Button -->
                    <ion-button type="submit" expand="block" size="large" :disabled="isLoading"
                        class="rounded-lg text-xl font-semibold">
                        <ion-spinner v-if="isLoading" name="crescent" aria-label="Bezig met inloggen"></ion-spinner>
                        <span v-else>Inloggen</span>
                    </ion-button>
                </form>

                <!-- Error message -->
                <div v-if="errorAlert" aria-live="polite" role="alert" class=" pl-2 pt-1 text-danger">
                    {{ errorMessage }}
                </div>

            </ion-card>

            <!--  Toast message -->
            <ion-toast 
            aria-live="polite" 
            role="alert" 
            :is-open="showToast" 
            :message="toastMessage" 
            duration="3000"
            position="bottom" 
            @didDismiss="showToast = false"
            >
            </ion-toast>

            <!-- SVG Wave-Decoration  -->
            <div class="absolute bottom-0 left-0 w-full z-0 ">
                <svg  width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg"
                    class="transition duration-300 ease-in-out delay-150">
                    <path
                        d="M 0,600 L 0,300 C 110.688995215311,298.38277511961724 221.377990430622,296.76555023923447 300,272 C 378.622009569378,247.23444976076553 425.17703349282306,199.3205741626794 522,172 C 618.822966507177,144.6794258373206 765.9138755980862,137.95215311004785 884,119 C 1002.0861244019138,100.04784688995214 1091.1674641148325,68.87081339712918 1179,47 C 1266.8325358851675,25.129186602870817 1353.4162679425838,12.564593301435409 1440,0 L 1440,600 L 0,600 Z"
                        stroke="none" stroke-width="0" fill="#00aaa1" fill-opacity="1"
                        class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                    <path
                        d="M 0,600 L 0,500 C 105.14832535885168,526.3540669856459 210.29665071770336,552.7081339712918 291,531 C 371.70334928229664,509.29186602870817 427.9617224880383,439.52153110047846 534,392 C 640.0382775119617,344.47846889952154 795.8564593301435,319.2057416267943 897,306 C 998.1435406698565,292.7942583732057 1044.6124401913876,291.6555023923445 1126,276 C 1207.3875598086124,260.3444976076555 1323.6937799043062,230.17224880382776 1440,200 L 1440,600 L 0,600 Z"
                        stroke="none" stroke-width="0" fill="#142129" fill-opacity="1"
                        class="transition-all duration-300 ease-in-out delay-150 path-1"></path>
                </svg>
            </div>

            <!-- Two-Factor Authentication -->
            <ion-modal 
            :is-open="show2FAModal" 
            @didDismiss="dismiss2FAModal"
            role="dialog"
            aria-modal="true" 
            aria-label="Twee-factor authenticatie: voer een 6-cijferige code in om toegang te krijgen."
            title="Twee-factorauthenticatie"
            >
                <ion-header >
                    <ion-toolbar color="tertiary">
                        <ion-title 
                        class="text-textSecondaryLight dark:text-textSecondaryDark"
                        >
                          Voer 2FA Code in
                        </ion-title>   
                    </ion-toolbar>
                </ion-header>
                <ion-content color="tertiary" >
                    <div class="p-4 mt-16 ">
                        <ion-item 
                        lines="none" 
                        :color="darkMode ? 'secondary' : 'white'">
                            <div class="w-full flex justify-center mb-5">
                                <div class="flex text-textPrimaryLight bg-accentLight p-6 mb-3 gap-2 justify-center items-center text-2xl">
                                   <ion-icon :icon="keyOutline" aria-hidden="true" size="large"></ion-icon>
                                   <p 
                                   tabindex="0"
                                   aria-live="assertive" 
                                   aria-atomic="true" 
                                   aria-label="Generated authentication code"
                                   > 
                                   {{ generatedCode }}
                                   </p>
                                </div>
                            </div>
                            
                            
                            <ion-label 
                            position="stacked" 
                            class="text-textSecondaryLight dark:text-textSecondaryDark">
                              6-cijferige code
                            </ion-label>
                            <ion-input
                                v-model="twoFACode"
                                type="number"
                                placeholder="Voer code in"
                                clear-input
                                aria-label="6-cijferige code invoeren"
                                class=" mb-4 text-textSecondaryLight dark:text-textSecondaryDark"
                            ></ion-input>
                        </ion-item>
                                
                        <ion-button 
                        @click="verify2FACode" 
                        type="submit" 
                        expand="block" 
                        size="large" 
                        :disabled="verify2FALoading"
                        class="rounded-lg text-xl font-semibold"
                        aria-label="Bevestig en inloggen"
                        >
                            <ion-spinner 
                            v-if="verify2FALoading" 
                            name="crescent" 
                            aria-label="Bezig met inloggen"
                            ></ion-spinner>
                            <span v-else>Inloggen</span>
                        </ion-button>

                        <div 
                        v-if="errorAlert" 
                        aria-live="polite" 
                        role="alert" 
                        class="pl-2 pt-1 text-danger"
                        >
                            {{ errorMessage }}
                        </div>
                    
                    </div>
                </ion-content>
            </ion-modal>

        </ion-content>
    </ion-page>
</template>

<script setup>
// Imports
import {
    mailOutline,
    lockClosed,
    keyOutline
} from 'ionicons/icons';
import {
    IonPage,
    IonContent,
    IonCard,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonToast,
    IonSpinner,
    IonModal,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,
    IonTitle,
    IonInputPasswordToggle
} from '@ionic/vue';

import { ref, computed, onMounted} from 'vue';
import { useRouter } from 'vue-router';

import { useThemeStore } from '@/Stores/themeStore';

import { loginUser } from '@/Services/auth';
import { useUserStore } from '@/Stores/userStore';

// Initialization
const router = useRouter();
const themeStore = useThemeStore();
const darkMode = themeStore.isDarkMode;

const userStore = useUserStore();
const { setUser } = userStore;

const email = ref("")
const password = ref("")

const showToast = ref(false);
const toastMessage = ref("");

const isLoading = ref(false);
const errorMessage = ref("");
const errorAlert = ref(false);

const verify2FALoading = ref(false);
const show2FAModal = ref(false);
const twoFACode = ref('');
const generatedCode = ref(Math.floor(100000 + Math.random() * 900000).toString());



//Computed
const logoSrc = computed(() => {
    return themeStore.isDarkMode
        ? '/assets/logo/real-estate-care-light.svg'
        : '/assets/logo/real-estate-care-dark.svg';
});

//Methods
const signIn = async () => {
    document.activeElement.blur();

    if (!email.value || !password.value) {
        errorMessage.value = 'Vul alle vereiste velden in.';
        errorAlert.value = true;
        return;
    }
    if (password.value.length < 6) {
        errorMessage.value = 'Wachtwoord moet minimaal 6 tekens bevatten.';
        errorAlert.value = true;
        document.getElementById('password-input').focus();
        return;
    }

    isLoading.value = true;

    try {
        const loggedInUser = await loginUser(email.value, password.value);

        if (loggedInUser) {
            present2FAModal();
            await setUser(loggedInUser);
             
            email.value = '';
            password.value = '';
            errorMessage.value = '';
            errorAlert.value = false;
            isLoading.value = false;
        }


    } catch (error) {
        isLoading.value = false;
        errorMessage.value = 'E-mailadres of wachtwoord is onjuist.';
        errorAlert.value = true;
        password.value = '';
        document.getElementById('password-input').focus();
    }
};

const verify2FACode = () => {
    document.activeElement.blur();
    verify2FALoading.value= true

    if(twoFACode.value === generatedCode.value) {
    errorMessage.value = '';
    errorAlert.value = false;
    toastMessage.value = 'Inloggen succesvol!';
    showToast.value = true;

    verify2FALoading.value= false;
    twoFACode.value ="";
    show2FAModal.value = false;
    router.push('/home');
    } else {
    errorAlert.value = true;
    errorMessage.value = 'Onjuiste code, Probeer opnieuw.';

    verify2FALoading.value= false;
    generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString();
    twoFACode.value ="";
    }
};

const dismiss2FAModal = () => {
  show2FAModal.value = false;
};

const present2FAModal = () => {
  show2FAModal.value = true;
};

 
</script>

<style scoped>
ion-button:focus,
ion-button:focus-visible {
    --background: var(--ion-color-primary);
}

ion-button:hover {
    --background: var(--ion-color-primary);
}

ion-button {
    --background: var(--ion-color-secondary);
}

body.dark-theme ion-button {
    --background: var(--ion-color-primary);
}

ion-toast {
    --background: var(--ion-color-primary);
    --color: white;
    --border-radius: 10px;
    --padding: 16px;
}

</style>