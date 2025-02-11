<template>
    <div v-if="inspection">
        <div class="space-y-6 px-6 pt-8 pb-4">
            <div class="flex items-center justify-between">

                <h1 
                class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark" 
                tabindex="0"
                >
                    Inspectierapport {{ inspection.id }}
                </h1>

                <ion-buttons>
                    <ion-button 
                    :fill="darkMode ? 'solid' : 'outline'" 
                    color="primary"
                    @click="editReport(inspection.id)" 
                    tabindex="0">
                        <ion-icon 
                        :icon="createOutline" 
                        size="large" 
                        aria-hidden="true"
                        ></ion-icon>
                        <span class=" sr-only">
                            Bewerken van het inspectierapport
                        </span>
                    </ion-button>
                    
                    <ion-button 
                    id="delete-alert" 
                    :fill="darkMode ? 'solid' : 'outline'" 
                    color="danger" 
                    class=" pl-2"
                    @click="showDeleteConfirmation(inspection.id)"
                    tabindex="0"
                    >
                        <ion-icon 
                        :icon="trashOutline" 
                        size="large" 
                        aria-hidden="true"
                        ></ion-icon>
                        <span class=" sr-only">
                            Verwijder inspectierapport
                        </span>
                    </ion-button>
                </ion-buttons>
            </div>

            <p 
            class="text-textSecondaryLight dark:text-textSecondaryDark text-sm" 
            tabindex="0"
            >
                Hieronder vind je de gedetailleerde resultaten van de uitgevoerde inspecties.
            </p>
        </div>

        <!-- Damage -->
        <div v-if="inspection.damage">
            <ion-card 
            v-for="damage in inspection.damage" 
            :key="damage.id" 
            :color="darkMode ? 'secondary' : 'white'" 
            class=" border-t-8 border-primaryLight " 
            role="region" 
            aria-labelledby="damage-card" 
            tabindex="0"
            >
                <ion-card-header>
                    <ion-card-title id="damage-card">Schaderapport</ion-card-title>
                    <ion-card-subtitle>Schade ID: {{ damage.id }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Locatie:</ion-label>
                        <ion-text>{{ damage.location }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Soort schade:</ion-label>
                        <ion-text>{{ damage.type }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Nieuwe schade:</ion-label>
                        <ion-text>{{ damage.new ? 'Ja' : 'Nee' }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Datum:</ion-label>
                        <ion-text>{{ damage.selectedDate }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Acute actie vereist:</ion-label>
                        <ion-text>{{ damage.urgent ? 'Ja' : 'Nee' }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>
                            Omschrijving:
                            <p>
                                <ion-text>{{ damage.description }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-grid>
                        <ion-row class=" pb-4 bg-medium  dark:bg-primaryDark">
                            <ion-col size="12">
                                <ion-label>Visuele documentatie</ion-label>
                            </ion-col>
                            <ion-col size="6" v-for="photo in damagePhotos[damage.id]" :key="photo.filepath">
                                <img :src="photo.webviewPath" :alt="photo.description" />
                                <p class=" pl-1 pt-1 h-14 bg-white text-primaryDark">
                                    {{ photo.description }}
                                </p>
                            </ion-col>

                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </div>

        <!-- maintenance -->
        <div v-if="inspection.maintenance">
            <ion-card 
            v-for="maintenance in inspection.maintenance" 
            :key="maintenance.id"
            :color="darkMode ? 'secondary' : 'white'" 
            class=" border-t-8 border-primaryLight" 
            role="region"
            aria-labelledby="maintenance-card" 
            tabindex="0"
            >
                <ion-card-header>
                    <ion-card-title id="maintenance-card">Onderhoud rapport</ion-card-title>
                    <ion-card-subtitle>Onderhoud ID: {{ maintenance.id }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Locatie:</ion-label>
                        <ion-text>{{ maintenance.location }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Soort onderhoud:</ion-label>
                        <ion-text>{{ maintenance.type }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Acute Actie Vereist:</ion-label>
                        <ion-text>{{ maintenance.urgent ? 'Ja' : 'Nee' }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Kosten indicatie:</ion-label>
                        <ion-text>{{ maintenance.costEstimate }}</ion-text>
                    </ion-item>

                    <ion-grid>
                        <ion-row class=" pb-4 bg-medium  dark:bg-primaryDark">
                            <ion-col size="12">
                                <ion-label>Visuele documentatie</ion-label>
                            </ion-col>
                            <ion-col size="6" v-for="photo in maintenancePhotos[maintenance.id]" :key="photo.filepath">
                                <img :src="photo.webviewPath" :alt="photo.description" />
                                <p class="  pl-1 pt-1 h-14 bg-white text-primaryDark">
                                    {{ photo.description }}
                                </p>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </div>

        <!-- Installation -->
        <div v-if="inspection.installations">
            <ion-card 
            v-for="installation in inspection.installations" 
            :key="installation.id"
            :color="darkMode ? 'secondary' : 'white'" 
            class=" border-t-8 border-primaryLight" 
            role="region"
            aria-labelledby="installation-card" 
            tabindex="0"
            >
                <ion-card-header>
                    <ion-card-title id="installation-card">Installatie rapport</ion-card-title>
                    <ion-card-subtitle>Installatie ID: {{ installation.id }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Locatie:</ion-label>
                        <ion-text>{{ installation.location }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Soort installatie:</ion-label>
                        <ion-text>{{ installation.type }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>
                            Gemelde storingen:
                            <p>
                                <ion-text>{{ installation.reportedIssues }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-item v-if="inspection.files && inspection.files.testProcedure !== ''"
                    class="text-textPrimaryLight dark:text-textPrimaryDark"
                    >
                        <ion-label>Testprocedure file</ion-label>
                        
                        <ion-button 
                         :aria-label="'Download het document'  " 
                         class="text-xl py-3  w-5/12 h-16"
                         :href="`/assets/files/${inspection.files.testProcedure}`" 
                          download expand="block"
                         >Download
                        </ion-button>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Goed gekeurd:</ion-label>
                        <ion-text>{{ installation.approved ? 'Ja' : 'Nee' }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>
                            Opmerkingen:
                            <p>
                                <ion-text>{{ installation.remarks }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-grid>
                        <ion-row class=" pb-4 bg-medium  dark:bg-primaryDark">
                            <ion-col size="12">
                                <ion-label>Visuele documentatie</ion-label>
                            </ion-col>
                            <ion-col size="6" v-for="photo in installationPhotos[installation.id]"
                                :key="photo.filepath">
                                <img :src="photo.webviewPath" :alt="photo.description" />
                                <p class="  pl-1 pt-1 h-14 bg-white text-primaryDark">
                                    {{ photo.description }}
                                </p>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </div>

        <!-- Modification -->
        <div v-if="inspection.modifications">
            <ion-card 
            v-for="modification in inspection.modifications" 
            :key="modification.id"
            :color="darkMode ? 'secondary' : 'white'"
            class=" border-t-8 border-primaryLight"
            aria-labelledby="modification-card" 
            tabindex="0"
            >
                <ion-card-header>
                    <ion-card-title id="modification-card">Modificatie rapport</ion-card-title>
                    <ion-card-subtitle>Modificatie ID: {{ modification.id }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Locatie:</ion-label>
                        <ion-text>{{ modification.location }}</ion-text>
                    </ion-item>

                    <ion-item v-if="inspection.files && inspection.files.documentatie != ''"
                    class="text-textPrimaryLight dark:text-textPrimaryDark"
                    >
                        <ion-label>Documentatie file</ion-label>
                        
                        <ion-button 
                         :aria-label="'Download het document'  " 
                         class="text-xl py-3  w-5/12 h-16"
                         :href="`/assets/files/${inspection.files.documentatie}`" 
                          download expand="block"
                         >Download
                        </ion-button>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Uitgevoerd door:</ion-label>
                        <ion-text>{{ modification.performedBy }}</ion-text>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>
                            Beschrijving:
                            <p>
                                <ion-text>{{ modification.description }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>Te ondernemen actie:
                            <p>
                                <ion-text>{{ modification.actionToBeTaken }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-item class="text-textPrimaryLight dark:text-textPrimaryDark">
                        <ion-label>
                            Opmerkingen:
                            <p>
                                <ion-text>{{ modification.remarks }}</ion-text>
                            </p>
                        </ion-label>
                    </ion-item>

                    <ion-grid>
                        <ion-row class=" pb-4 bg-medium  dark:bg-primaryDark">
                            <ion-col size="12" >
                                <ion-label>Visuele documentatie</ion-label>
                            </ion-col>
                            <ion-col size="6" v-for="photo in modificationPhotos[modification.id]"
                                :key="photo.filepath">
                                <img :src="photo.webviewPath" alt="photo.description" />
                                <p class="  pl-1 pt-1 h-14 bg-white text-primaryDark">
                                    {{ photo.description }}
                                </p>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                </ion-card-content>
            </ion-card>
        </div>
    </div>

    <div v-else>
        Bezig met laden...
    </div>

    <!-- melding -->
    <div v-if="toastMessage" aria-live="polite" role="alert" class=" sr-only pl-2 pt-1 text-danger">
        {{ toastMessage }}
    </div>

    <!-- Toast Bericht -->
    <ion-toast aria-live="polite" role="alert" :is-open="showToast" :message="toastMessage" duration="3000"
        position="top" @didDismiss="showToast = false">
    </ion-toast>


</template>

<script setup>
import {
    actionSheetController,
    IonRow,
    IonLabel,
    IonCol,
    IonText,
    IonCard,
    IonGrid,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonCardSubtitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonToast,

} from '@ionic/vue';
import {
    createOutline,
    trashOutline,
    trash,
    close
} from 'ionicons/icons';

import { ref, onMounted } from 'vue'

// stores
import { useInspectionStore } from '@/Stores/inspectionStore';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/Stores/themeStore';
// services
import { usePhotoService } from '@/Services/photoService';

// Initialization
const router = useRouter();
const inspectionStore = useInspectionStore();
const themeStore = useThemeStore();
const darkMode = themeStore.isDarkMode;

const { loadPhotosByKey, deleteByKey } = usePhotoService();


const props = defineProps({
    inspection: {
        type: Object,
        required: true,
    }
})

const showToast = ref(false);
const toastMessage = ref("");

const damagePhotos = ref({});
const maintenancePhotos = ref({});
const installationPhotos = ref({});
const modificationPhotos = ref({});


const showDeleteConfirmation = async (id) => {
    document.activeElement.blur()
    const actionSheet = await actionSheetController.create({
        header: 'Weet je zeker dat je dit rapport wilt verwijderen?',
        buttons: [
            {
                text: 'Verwijderen',
                role: 'destructive',
                icon: trash,
                handler: () => {
                    document.activeElement.blur()
                    toastMessage.value = 'Het rapport is succesvol verwijderd.';
                    showToast.value = true;
                    deleteReport(id);
                },
            },
            {
                text: 'Annuleren',
                icon: close,
                role: 'cancel',
                handler: () => {
                    document.activeElement.blur()
                    document.getElementById("delete-alert").focus()
                    toastMessage.value = 'De verwijderactie is geannuleerd.';
                    showToast.value = true;

                },
            },
        ],
    });
    await actionSheet.present();
};

const deleteReport = async (id) => {
    // console.log('Rapport verwijderd' + id)
    await deleteAllPhotos()
    await inspectionStore.deleteInspection(props.inspection)
    router.replace('/home');
}

const deleteAllPhotos = async () => {
    if (props.inspection.maintenance) {
        for (const maintenance of props.inspection.maintenance) {
            if (maintenance.id) {
                 await deleteByKey(`maintenance_${maintenance.id}_${props.inspection.firebaseId}_photos`);  
            }
        }
    }
    if (props.inspection.damage) {
        for (const damage of props.inspection.damage) {
            if (damage.id) {
                 await deleteByKey(`damage_${damage.id}_${props.inspection.firebaseId}_photos`);             
            }
        }
    }
    if (props.inspection.installations) {
        for (const installation of props.inspection.installations) {
            if (installation.id) {
                 await deleteByKey(`installation_${installation.id}_${props.inspection.firebaseId}_photos`);    
            }
        }
    }
    if (props.inspection.modifications) {
        for (const modification of props.inspection.modifications) {
            if (modification.id) {
                 await deleteByKey(`modification_${modification.id}_${props.inspection.firebaseId}_photos`);    
            }
        }
    }
   
};

const editReport = (inspectionId) => {
    document.activeElement.blur()
    router.push({ name: 'edit-inspection-report', params: { id: inspectionId } });
    // console.log('Bewerken rapport', inspectionId, props.inspection)
}


const loadAllPhotos = async () => {
    if (props.inspection.damage) {
        for (const damage of props.inspection.damage) {
            if (damage.id) {
                const path = await loadPhotosByKey(`damage_${damage.id}_${props.inspection.firebaseId}_photos`);
                if (path) {
                    damagePhotos.value[damage.id] = path;
                }
            }
        }
    }

    if (props.inspection.maintenance) {
        for (const maintenance of props.inspection.maintenance) {
            if (maintenance.id) {
                const path = await loadPhotosByKey(`maintenance_${maintenance.id}_${props.inspection.firebaseId}_photos`);
                if (path) {
                    maintenancePhotos.value[maintenance.id] = path;
                }
            }
        }
    }

    if (props.inspection.installations) {
        for (const installation of props.inspection.installations) {
            if (installation.id) {
                const path = await loadPhotosByKey(`installation_${installation.id}_${props.inspection.firebaseId}_photos`);
                if (path) {
                    installationPhotos.value[installation.id] = path;
                }
            }
        }
    }

    if (props.inspection.modifications) {
        for (const modification of props.inspection.modifications) {
            if (modification.id) {
                const path = await loadPhotosByKey(`modification_${modification.id}_${props.inspection.firebaseId}_photos`);
                if (path) {
                    modificationPhotos.value[modification.id] = path;
                }
            }
        }
    }
};


onMounted(() => {
    loadAllPhotos();
});

</script>

<style scoped>
ion-item ion-label {
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

ion-toast {
    --background: var(--ion-color-secondary);
    --color: white;
    --border-radius: 10px;
    --padding: 16px;
}
</style>