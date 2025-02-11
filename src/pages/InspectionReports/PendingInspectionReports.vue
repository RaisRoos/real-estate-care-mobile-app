<template>
    <ion-page class="container max-w-7xl mx-auto">
        <HeaderWithBackButton title="Overzicht van Openstaande Inspecties" />

        <ion-content :fullscreen="true" color="tertiary">
            
            <!-- Refresher -->
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <div  class="space-y-6 px-6 pt-8 pb-2" tabindex="0">
                <h1 class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
                    Openstaande inspecties
                </h1>
            </div>
            <div v-if="inspectionStore.pendingInspections.length > 0" 
            class="space-y-6 px-4 py-8" tabindex="0"
            >
            <div v-if="inspectionStore.isLoading">Loading...</div>
            <div v-else-if="inspectionStore.error">{{ inspectionStore.error }}</div>
            <div v-else>
                <p class="text-textSecondaryLight dark:text-textSecondaryDark  text-sm pb-7">
                    Selecteer een inspectie om te starten en een rapport op te stellen.
                </p>

                    <ion-list 
                    aria-label="Lijst van Openstaande Inspecties" 
                    class="space-y-4 bg-transparent"
                    >
                        <ion-item 
                        v-for="inspection in inspectionStore.pendingInspections" 
                        :key="inspection.id"
                        @click="openInspectionForm(inspection.id)"
                        @keydown.enter="openInspectionForm(inspection.id)"
                        @keydown.space.prevent="openInspectionForm(inspection.id)"
                        button lines="none"
                        aria-labelledby="inspectieopdracht-titel inspectieopdracht-details"
                        class=" flex flex-col shadow-lg rounded-lg  border-l-4  border-primaryLight  focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryLight hover:ring-primaryLight "
                        >
                            <div class="flex items-center mb-2 py-3 w-8/12">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full  mr-3">
                                    <ion-icon aria-label="Openstaande inspectie, nog niet uitgevoerd" :icon="bookmark"
                                        class="text-primaryLight  text-3xl" />
                                </div>
                                <ion-label 
                                id="inspectieopdracht-titel"
                                class="overflow-hidden text-ellipsis line-clamp-2 text-sm font-semibold text-textPrimaryLight px-1 pr-2"
                                >
                                    {{ inspection.task }}
                                </ion-label>
                            </div>

                            <div 
                            id="inspectieopdracht-details"
                            class="w-4/12 text-textTertiaryLight dark:text-textTertiaryDark text-xs sm:text-sm pl-2 border-l-2"
                            >
                                <p>
                                    <span class=" sr-only">
                                        Adres:
                                    </span>
                                    {{ inspection.address }}
                                </p>
                                <p class="pt-2 text-sm font-medium text-textSecondaryLight dark:text-textSecondaryDark">
                                    <span class=" sr-only">
                                        Aanvraagdatum:
                                    </span>
                                    {{ inspection.date }}
                                </p>
                            </div>
                        </ion-item>
                    </ion-list>
                </div>
            </div>
            <div v-else>
                <p class="text-textPrimaryLight dark:text-textPrimaryDark space-y-6 px-6 py-8">
                    Geen openstaande inspecties gevonden.
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
// Imports
import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/vue';
import {
    bookmark
} from "ionicons/icons";

import HeaderWithBackButton from '@/components/Layout/HeaderWithBackButton.vue';
import { useRouter } from 'vue-router';

// stores
import { useInspectionStore } from '@/Stores/inspectionStore';

// Initialization
const router = useRouter();
const inspectionStore = useInspectionStore();

//Navigation
function openInspectionForm(inspectionId) {
    document.activeElement.blur();
    router.push({ name: 'create-inspection-report', params: { id: inspectionId } });
}

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
 ion-item {
    --background: white;
    --color: #000000;
}

body.dark-theme ion-item{
    --background: var(--ion-color-secondary);
    --color: #fff;
}
</style>

