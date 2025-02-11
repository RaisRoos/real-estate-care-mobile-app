<template>
    <ion-page class="container max-w-7xl mx-auto">
        <HeaderWithBackButton title="Overzicht van Uitgevoerde Inspecties" />

        <ion-content :fullscreen="true" color="tertiary">

            <!-- Refresher-->
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <div  class="space-y-6 px-6 pt-8 pb-2" tabindex="0">
                <h1 class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
                    Uitgevoerde inspecties
                </h1>
            </div>
            <div v-if="inspectionStore.completedInspections.length > 0"  
            class="space-y-6 px-4 py-8" tabindex="0"
            >
                <div v-if="inspectionStore.isLoading">Loading...</div>
                <div v-else-if="inspectionStore.error">
                    {{ inspectionStore.error }}
                </div>
                <div v-else>
                    <p class="text-textSecondaryLight dark:text-textSecondaryDark text-sm pb-7">
                        Hieronder vind je een overzicht van de uitgevoerde inspecties.
                        Klik op een inspectie voor meer details.
                    </p>

                    <ion-list 
                    aria-label="Lijst van uitgevoerde inspecties" 
                    class="space-y-4 bg-transparent"
                    >
                        <ion-item 
                        v-for="inspection in inspectionStore.completedInspections" 
                        :key="inspection.id"
                        @click="viewInspectionReport(inspection.id)"
                        @keydown.enter="viewInspectionReport(inspection.id)"
                        @keydown.space.prevent="viewInspectionReport(inspection.id)"
                        button lines="none"
                        aria-labelledby="inspectieopdracht-titel inspectieopdracht-details"
                        class="flex flex-col shadow-lg rounded-lg  border-l-4 border-primaryLight  focus-visible:border-y-1 focus-visible:ring-primaryLight hover:border-y-1"
                        >
                            <div class="flex items-center mb-2 py-3 w-8/12">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full mr-3">
                                    <ion-icon
                                    aria-hidden="true" 
                                    :icon="checkmarkDoneOutline"   
                                    class="text-primaryLight text-3xl" 
                                    />
                                </div>
                                <ion-label
                                id="inspectieopdracht-titel"
                                class="overflow-hidden text-ellipsis line-clamp-2 text-sm font-semibold text-textPrimaryLight px-1 pr-2"
                                >
                                    {{ inspection.task }}
                                </ion-label>
                            </div>

                            <div id="inspectieopdracht-details"
                            class="w-4/12 text-textTertiaryLight dark:text-textTertiaryDark text-xs sm:text-sm pl-2 border-l-2"
                            >
                                <p>
                                    <span class="sr-only">
                                        Adres:
                                    </span>
                                    {{ inspection.address }}
                                </p>
                                <p class="pt-2 text-sm font-medium text-textSecondaryLight dark:text-textSecondaryDark">
                                    <span class=" sr-only">
                                        Datum van uitgevoerde inspectie:
                                    </span>{{ inspection.date }}
                                </p>
                            </div>
                        </ion-item>
                    </ion-list>
                </div>
            </div>
            <div v-else>
                <p class="text-textPrimaryLight dark:text-textPrimaryDark space-y-6 px-6 py-8">
                    Geen uitgevoerde inspecties gevonden.
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
    checkmarkDoneOutline,
} from "ionicons/icons";

import HeaderWithBackButton from '@/components/Layout/HeaderWithBackButton.vue';
import { useRouter } from 'vue-router';
import { useInspectionStore } from '@/Stores/inspectionStore';

// Initialization
const inspectionStore = useInspectionStore();
const router = useRouter();

//Navigation
function viewInspectionReport(inspectionId) {
    document.activeElement.blur();
    router.push({ name: 'view-inspection-report', params: { id: inspectionId } });
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

