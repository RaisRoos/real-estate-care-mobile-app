<template>
    <div v-if="inspection">
        <ion-card 
        :color="darkMode ? 'secondary' : 'white'" 
        class="border-t-8 border-primaryLight" 
        role="region"
        aria-labelledby="details" 
        tabindex="0"
        >
            <ion-card-header>
                <ion-card-title>
                    Inspectiedetails
                </ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Inspectieopdracht:
                        <p>
                            <ion-text>{{ inspection.task }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Inspectie ID:
                        <p>
                            <ion-text>{{ inspection.id }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Datum:
                        <p>
                            <ion-text>{{ inspection.date }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Adres:
                        <p>
                            <ion-text>{{ inspection.address }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Status:
                        <p>
                            <ion-text>{{ inspection.status }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Opdrachtgever:
                        <p>
                            <ion-text>{{ inspection.client }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

                <ion-item lines="none" class="text-textPrimaryLight dark:text-textPrimaryDark">
                    <ion-label>
                        Inspecteur:
                        <p>
                            <ion-text>{{ inspection.inspector }}</ion-text>
                        </p>
                    </ion-label>
                </ion-item>

            </ion-card-content>
        </ion-card>
    </div>
    <div v-else>
        Bezig met laden...
    </div>
</template>

<script setup>
// Imports
import {
    IonLabel,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,   
} from '@ionic/vue';

// stores
import { useThemeStore } from '@/Stores/themeStore';

const props = defineProps({
    inspection: {
        type: Object,
        required: true,
    }
})

const themeStore = useThemeStore();
const darkMode = themeStore.isDarkMode;

</script>

<style scoped>
ion-item ion-label {
    --background: transparent;
    font-size: 1.7rem;
    font-weight: 800;
}

ion-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--ion-color-secondary);
}

body.dark-theme ion-text {
    color: white;
}

ion-item {
    --background: transparent;
    --border-color: var(--ion-color-primary);
    --padding-bottom: 0.3rem;
    --padding-start: 0;
    --padding-end: 0;
}

ion-card-content {
    padding-top: 12px;
}

ion-item ion-label p {
    margin-top: 5px;
}
</style>