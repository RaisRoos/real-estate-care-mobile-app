<template>
    <ion-page class="container max-w-7xl mx-auto">
        <ion-header class="ion-no-border max-w-7xl mx-auto ">
            <ion-toolbar 
            :style="{'--background': `url(${backgroundSrc}) no-repeat top center`}"  
            class="pb-2"
            >

                <ion-title mode="ios" class="sr-only" tabindex="0">
                    Inspectie nummer {{ inspection.id }}
                </ion-title>
                <ion-buttons slot="start"
                class=" shadow-md bg-primaryLight rounded-md flex items-center justify-center p-0 mt-4  ml-3"
                >
                    <ion-back-button 
                    mode="md" 
                    default-href="/home"
                    aria-label="Ga terug naar de hoofdpagina">
                    </ion-back-button>
                </ion-buttons>
            </ion-toolbar>

            <ion-segment 
            mode="ios" 
            :value="segmentValue" 
            @ionChange="changeSegment" 
            aria-labelledby="segment-tabs"
            class=" pb-3"
            >
                <ion-segment-button 
                value="inspectionForm"
                :aria-selected="segmentValue === 'inspectionForm' ? 'true' : 'false'" 
                id="report-tab"
                >
                    <ion-label class="font-medium text-lg">
                        Rapport
                    </ion-label>
                </ion-segment-button>

                <ion-segment-button 
                value="inspectionDetails"
                :aria-selected="segmentValue === 'inspectionDetails' ? 'true' : 'false'" 
                id="details-tab">
                    <ion-label class="font-medium text-lg">Details</ion-label>
                </ion-segment-button>
            </ion-segment>

            <div aria-live="polite" class="sr-only">
                Het actieve tabblad is
                {{ segmentValue === 'inspectionDetails'
                    ? 'Details'
                    : 'InspectieFormulier'
                }}.
            </div>

        </ion-header>

        <ion-content :fullscreen="true" color="tertiary" aria-live="polite">
            
            <div v-if="segmentValue === 'inspectionForm'" 
            role="tabpanel" 
            aria-labelledby="report-tab" 
            tabindex="0"
            >
                <!-- Refresher-->
                <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
                   <ion-refresher-content></ion-refresher-content>
                </ion-refresher>
                <ReportPreview :inspection="inspection" />
            </div>

           
            <div v-if="segmentValue === 'inspectionDetails'" 
            role="tabpanel" 
            aria-labelledby="details-tab" 
            tabindex="0"
            >          
                <ReportDetailsCard :inspection="inspection" />
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup>
// Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/vue';

import ReportDetailsCard from '@/components/InspectionReport/ReportDetailsCard.vue'
import ReportPreview from '@/components/InspectionReport/ReportPreview.vue'

import {ref , computed, onMounted } from 'vue';

// stores
import { useThemeStore } from '@/Stores/themeStore';
import { useInspectionStore } from '@/Stores/inspectionStore';
import { useRoute } from 'vue-router';

// Initialization
const themeStore = useThemeStore();
const inspectionStore = useInspectionStore();
const route = useRoute();

const inspectionId = route.params.id;
const inspection = inspectionStore.getInspectionById(inspectionId);

onMounted(()=>{
    inspectionStore.loadInspections();
})

const segmentValue = ref("inspectionForm")

const changeSegment = (event) => {
    segmentValue.value = event.detail.value;
};


const backgroundSrc = computed(() => {
    return themeStore.isDarkMode
        ?  '/assets/images/darkmode-bg.png'
        : '/assets/images/lightmode-bg.png';
});

// Refresher 
const handleRefresh = (event) => {
    setTimeout(() => {
        // inspectionStore.clearCache()
        inspectionStore.loadInspections();
        event.target.complete(); 
    }, 2000); 
};
</script>

<style scoped>

ion-segment {
    --background: var(--ion-color-light);
}

ion-segment-button {
    padding: 5px;
    margin: 8px;
    --background: white;
    --border-color: var(--ion-color-secondary);
    --indicator-color: var(--ion-color-secondary);
    --color: var(--ion-color-secondary);
    --color-checked: var(--ion-color-light);
}

ion-segment-button:focus-visible,
ion-segment-button:hover,
ion-segment-button:focus {
    outline: 2px solid var(--ion-color-primary);
    outline-offset: 3px;
}

body.dark-theme ion-segment {
    --background: var(--ion-color-tertiary);
}

body.dark-theme ion-segment-button {
    padding: 5px;
    margin: 8px;
    --background: var(--ion-color-secondary);
    --border-color: var(--ion-color-secondary);
    --indicator-color: white;
    --color: white;
    --color-checked: var(--ion-color-tertiary);
}
</style>