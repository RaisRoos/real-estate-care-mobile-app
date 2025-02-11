<template>
    <form v-if="inspection && inspection.id" @submit.prevent="saveInspection" class="space-y-6 px-2 pt-8 pb-4 mb-10">
        <h1 id="form-title" class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
          Inspectie: {{ inspection.id }}
        </h1>
        <p id="form-description" class="text-textSecondaryLight dark:text-textSecondaryDark text-sm">
          De ingevulde informatie wordt gebruikt om een compleet en nauwkeurig inspectierapport op te stellen.
        </p>
  
        <!-- Damage -->
        <ion-card 
        :color="darkMode ? 'secondary' : 'white'" 
        class="m-0 p-0 border-t-4 border-primaryLight"
        >
            <ion-card-header class="flex flex-row justify-between items-center">
                <ion-card-title id="damage-title" class=" text-2xl">Schade</ion-card-title>
                <ion-buttons>
                    <ion-button 
                    @click="addDamage" 
                    aria-label="Schade toevoegen"
                    >
                        <ion-icon :icon="add" aria-hidden="true"></ion-icon>
                        <ion-label>
                          toevoegen
                          <span class="sr-only">Schade toevoegen</span>
                        </ion-label>
                    </ion-button>
  
                    <ion-button 
                    @click="toggleSection('showDamage')" 
                    :aria-expanded="showDamage"
                    :aria-label="showDamage ? 'Schade sectie inklappen' : 'Schade sectie uitklappen'"
                    >
                        <ion-icon 
                        class=" text-primaryLight text-4xl"
                        :icon="showDamage ? chevronUpCircleOutline : chevronDownCircleOutline" 
                        aria-hidden="true">
                        </ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-card-header>
  
  
            <ion-card-content v-show="showDamage" role="list">
               <Damage 
               v-for="damage in inspection.damage" 
               :key="damage.id" 
               :damage="damage" 
               :firebaseId="inspection.firebaseId"
               @removeDamage="removeDamage(damage.id)" 
               role="listitem" 
               />
            </ion-card-content>
        </ion-card> 
  
        <!-- Maintenance -->
        <ion-card 
        :color="darkMode ? 'secondary' : 'white'" 
        class="m-0 p-0 border-t-4 border-primaryLight"
        >
            <ion-card-header class="flex flex-row justify-between items-center">
                <ion-card-title id="damage-title" class=" text-2xl">Onderhoud</ion-card-title>
                <ion-buttons>
                   <ion-button @click="addMaintenance" aria-label="Onderhoud toevoegen">
                       <ion-icon :icon="add" aria-hidden="true"></ion-icon>
                       <ion-label>toevoegen<span class="sr-only">Onderhoud toevoegen</span></ion-label>
                   </ion-button>
  
                    <ion-button 
                    @click="toggleSection('showMaintenance')" 
                    :aria-expanded="showMaintenance"
                    :aria-label="showMaintenance ? 'Onderhoud sectie inklappen' : 'Onderhoud sectie uitklappen'"
                    >
                        <ion-icon 
                        class=" text-primaryLight text-4xl"
                        :icon="showMaintenance ? chevronUpCircleOutline : chevronDownCircleOutline" 
                        aria-hidden="true">
                        </ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-card-header>
  
            <ion-card-content v-show="showMaintenance" role="list">
  
                <Maintenance 
                v-for="maintenance in inspection.maintenance" 
                :key="maintenance.id" 
                :maintenance="maintenance" 
                :firebaseId="inspection.firebaseId"
                @removeMaintenance="removeMaintenance(maintenance.id)" 
                role="listitem" 
                />
            </ion-card-content>
        </ion-card>
  
  
        <!-- Installation -->
        <ion-card 
        :color="darkMode ? 'secondary' : 'white'" 
        class="m-0 p-0 border-t-4 border-primaryLight"
        >
            <ion-card-header class="flex flex-row justify-between items-center">
                <ion-card-title id="installation-title" class="text-2xl">Installaties</ion-card-title>
                <ion-buttons>
                    <ion-button @click="addInstallation" aria-label="Installatie toevoegen">
                       <ion-icon :icon="add" aria-hidden="true"></ion-icon>
                       <ion-label>toevoegen<span class="sr-only">Installatie toevoegen</span></ion-label>
                    </ion-button>
  
                    <ion-button 
                    @click="toggleSection('showInstallations')" 
                    :aria-expanded="showInstallations"
                    :aria-label="showInstallations ? 'Installatie sectie inklappen' : 'Installatie sectie uitklappen'"
                    >
                       <ion-icon 
                       class=" text-primaryLight text-4xl"
                       :icon="showInstallations ? chevronUpCircleOutline : chevronDownCircleOutline"
                       aria-hidden="true">
                       </ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-card-header>
  
            <ion-card-content v-show="showInstallations" role="list">
  
                <Installation 
                v-for="installation in inspection.installations" 
                :key="installation.id" 
                :firebaseId="inspection.firebaseId"
                :installation="installation" 
                :inspection="inspection"
                @removeInstallation="removeInstallation(installation.id)" 
                role="listitem" 
                />
  
            </ion-card-content>
        </ion-card>
  
  
        <!-- Modifications -->
        <ion-card 
        :color="darkMode ? 'secondary' : 'white'" 
        class="m-0 p-0 border-t-4 border-primaryLight"
        >
            <ion-card-header class="flex flex-row justify-between items-center">
                <ion-card-title id="Modification-title" class="text-2xl">
                    Modificaties
                </ion-card-title>
                    <ion-buttons>
                        <ion-button @click="addModification" aria-label="Modificatie toevoegen">
                            <ion-icon :icon="add" aria-hidden="true"></ion-icon>
                            <ion-label>toevoegen<span class="sr-only">Modificatie toevoegen</span></ion-label>
                        </ion-button>
  
                        <ion-button 
                        @click="toggleSection('showModifications')" 
                        :aria-expanded="showModifications"
                        :aria-label="showModifications ? 'Modificatie sectie inklappen' : 'Modificatie sectie uitklappen'"
                        >
                            <ion-icon 
                            class=" text-primaryLight text-4xl"
                            :icon="showModifications ? chevronUpCircleOutline : chevronDownCircleOutline"
                            aria-hidden="true">
                            </ion-icon>
                        </ion-button>
                    </ion-buttons>
            </ion-card-header>
  
            <ion-card-content v-show="showModifications" role="list"> 
                <Modification 
                v-for="modification in inspection.modifications" 
                :key="modification.id" 
                :firebaseId="inspection.firebaseId"
                :modification="modification" 
                :inspection="inspection"
                @removeModification="removeModification(modification.id)" 
                role="listitem" 
                />
            </ion-card-content>
        </ion-card>
  
        <!-- Submit/Cancel Button -->
        <div class="mb-2 mt-8 flex justify-between ">
            <ion-button 
            class="text-xl w-5/12 py-2 font-bold rounded-md" 
            fill="outline" 
            :color="darkMode ? 'light' : 'secondary'"
            @click="cancelInspection" 
            aria-label="Wijzigingen annuleren"
            >
               Annuleren
            </ion-button>
            <ion-button 
            class="text-xl w-7/12 py-2 rounded-md submit-btn dark:text-textPrimaryLight font-bold" 
            type="submit"
            :disabled="isLoading" 
            fill="solid" 
            @click="saveInspection" 
            aria-label="Wijzigingen opslaan"
            >
               <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
               <span v-else>Opslaan</span>
            </ion-button>
        </div>
  
    </form>
  
    <div v-else aria-live="assertive" role="alert">
      <ion-text color="danger">
        Geen gegevens gevonden.
      </ion-text>
    </div>
  
  
    <!-- Toast component -->
    <ion-toast 
    :is-open="showToast" 
    :message="toastMessage" 
    duration="3000" 
    position="top" 
    role="alert" 
    aria-live="polite"
    @did-dismiss="showToast = false"
    >
    </ion-toast>
  
    <div v-if="showToast" aria-live="assertive" role="alert" class="sr-only">
      {{ toastMessage }}
    </div>
  </template>
  
  
  <script setup>
    import {
     IonButton,
     IonIcon,
     IonCard,
     IonCardHeader,
     IonCardTitle,
     IonCardContent,
     IonText,
     IonLabel,
     IonButtons,
     IonToast,
     IonSpinner,
    } from '@ionic/vue';
    import {
      add,
      chevronDownCircleOutline,
      chevronUpCircleOutline,
    } from "ionicons/icons";
    import Damage from './DamageForm.vue';
    import Maintenance from './MaintenanceForm.vue';
    import Installation from './InstallationForm.vue';
    import Modification from './ModificationForm.vue';

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    // stores
    import { useUserStore } from '@/Stores/userStore';
    import { useInspectionStore } from '@/Stores/inspectionStore';
    import { useThemeStore } from '@/Stores/themeStore';
 

    // services
    import { usePhotoService } from '@/Services/photoService';

    // Initialization
    const { deleteAllStoredPhotos,  deleteByKey  } = usePhotoService();
    const router = useRouter();
    const userStore = useUserStore();
    const inspectionStore = useInspectionStore();
    const themeStore = useThemeStore();

    const darkMode = themeStore.isDarkMode;

    const profile = ref(userStore.profile[0])
    const firstname = ref(profile.value.firstname);
    const lastname = ref(profile.value.lastname);
    const inspectorName = ref(firstname.value + " " + lastname.value)
  
    const showDamage = ref(true);
    const showMaintenance = ref(true);
    const showInstallations = ref(true);
    const showModifications = ref(true);
  
    const showToast = ref(false);
    const toastMessage = ref('');
    const isLoading = ref(false);

    const props = defineProps({
        inspection: {
         type: Object,
         required: true,
        } 
    })
  
    const inspection = ref({
      id: props.inspection.id,
      task: props.inspection.task,
      client: props.inspection.client,
      address: props.inspection.address,
      status: "Uitgevoerd",
      firebaseId: props.inspection.firebaseId,
      date: new Date().toISOString().split('T')[0],
      inspector: inspectorName.value,
      files: {
        testProcedure: props.inspection.files.testProcedure ? props.inspection.files.testProcedure : "",
        documentatie: props.inspection.files.documentatie ? props.inspection.files.documentatie : ""
      },
      damage: [],
      maintenance: [],
      installations: [],
      modifications: [],
    });
  
 
    const toggleSection = (section) => {
      if (section === "showDamage") showDamage.value = !showDamage.value;
      if (section === "showMaintenance") showMaintenance.value = !showMaintenance.value;
      if (section === "showInstallations") showInstallations.value = !showInstallations.value;
      if (section === "showModifications") showModifications.value = !showModifications.value;
    };
  
    function generateUniqueId() {
       const id = Math.floor(1000 + Math.random() * 9000);
       return id.toString();
    }
  
    //add inspections 
    const addDamage = () => {
        inspection.value.damage.push({
          id: generateUniqueId(),
          location: '',
          new: false,
          type: '',
          selectedDate: new Date().toISOString(),
          urgent: false,
          description: '',
        });
        toastMessage.value = 'Nieuwe schade is toegevoegd.';
        showToast.value = true;
    };

    const addMaintenance = () => {
        inspection.value.maintenance.push({
          id: generateUniqueId(),
          location: '',
          type: '',
          urgent: false,
          costEstimate: '',
        });
        toastMessage.value = 'Nieuwe onderhoud is toegevoegd.';
        showToast.value = true;
    };
  
    const addInstallation = () => {
        inspection.value.installations.push({
          id: generateUniqueId(),
          location: '',
          type: false,
          reportedIssues: '',
          approved: false,
          remarks: '',
        });
        toastMessage.value = 'Nieuwe installatie is toegevoegd.';
        showToast.value = true;
    };
  
    const addModification = () => {
        inspection.value.modifications.push({
          id: generateUniqueId(),
          location: '',
          description: '',
          performedBy: '',
          actionToBeTaken: '',
          remarks: '',
        });
        toastMessage.value = 'Nieuwe modificatie is toegevoegd.';
        showToast.value = true;
    };
  
    //remove inspections Form
    const removeDamage = (id) => {
       inspection.value.damage = inspection.value.damage.filter((d) => d.id !== id);
       toastMessage.value = `Schade met ID ${id} is verwijderd.`;
       showToast.value = true;
    };

    const removeMaintenance = (id) => {
       inspection.value.maintenance = inspection.value.maintenance.filter((d) => d.id !== id);
       toastMessage.value = `Onderhoud met ID ${id} is verwijderd.`;
       showToast.value = true;
    };

    const removeInstallation = (id) => {
       inspection.value.installations = inspection.value.installations.filter((d) => d.id !== id);
       toastMessage.value = `Installatie met ID ${id} is verwijderd.`;
       showToast.value = true;
    };

    const removeModification = (id) => {
       inspection.value.modifications = inspection.value.modifications.filter((d) => d.id !== id);
       toastMessage.value = `Modificatie met ID ${id} is verwijderd.`;
       showToast.value = true;
    };
  
    //submit inspection
    const saveInspection = async () => {
        console.log("save inspection");
  
        isLoading.value = true;
  
        try {
            if (inspection.value.id) {
                await inspectionStore.updateInspection(inspection.value);
                toastMessage.value = 'Inspectie succesvol bijgewerkt.';
            } else {
               // console.error("Geen update mogelijk zonder ID.");
                toastMessage.value = 'Inspectie niet opgeslagen. Geen ID gevonden.';
            }
            showToast.value = true;
            router.replace('/completed-inspections-reports');
        } catch (err) {
            //   console.error('Fout bij opslaan:', err);
            toastMessage.value = 'Er is een fout opgetreden.';
            showToast.value = true;
        } finally {
            isLoading.value = false;
        }
    };
  
    //cancel button
    const cancelInspection = async() => {
      // console.log("cancel inspection")
       await deleteAllPhotos()
       router.replace('/pending-inspection-reports');
    }
  
    const deleteAllPhotos = async () => {
        if (inspection.value.maintenance.length > 0) {
            for (const maintenance of inspection.value.maintenance) {
                if (maintenance.id) {
                   await deleteByKey(`maintenance_${maintenance.id}_${inspection.value.firebaseId}_photos`);
                 
                }
            }
        }
        if (inspection.value.damage.length > 0) {
            for (const damage of inspection.value.damage) {
                if (damage.id) {
                   await deleteByKey(`damage_${damage.id}_${inspection.value.firebaseId}_photos`);
                 
                }
            }
        }
        if (inspection.value.installations.length > 0) {
            for (const installation of inspection.value.installations) {
                if (installation.id) {
                   await deleteByKey(`installation_${installation.id}_${inspection.value.firebaseId}_photos`);
                 
                }
            }
        }
        if (inspection.value.modifications.length > 0) {
            for (const modification of inspection.value.modifications) {
                if (modification.id) {
                   await deleteByKey(`modification_${modification.id}_${inspection.value.firebaseId}_photos`);
                 
                }
            }
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
  
  ion-toast {
    --background: var(--ion-color-secondary);
    --color: white;
    --border-radius: 10px;
    --padding: 16px;
  }
</style>