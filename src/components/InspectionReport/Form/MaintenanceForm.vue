<template>
    <div class=" border-4 dark:border-medium bg-white">
      <h3 class="sr-only">Onderhoud ID:{{ maintenance.id }}</h3>
        <!-- maintenance -->
        <ion-item 
        lines="none" 
        class="bg-white dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label class="not-sr-only">
             <strong>Onderhoud ID:</strong> {{ maintenance.id }}
            </ion-label>
            <ion-button 
            fill="clear" 
            color="danger" 
            @click="removeMaintenance" 
            slot="end"
            :aria-label="`Onderhoud met ID ${maintenance.id} verwijderen.`"
            >
               <ion-icon :icon="trash" size="large" aria-hidden="true"></ion-icon>
               <span class="sr-only">Verwijderen</span>
            </ion-button>
        </ion-item>
  
        <!-- Locatie -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="maintenance-location" class="mr-4">Locatie</ion-label>
            <ion-input 
            id="maintenance-location" 
            label-placement="stacked" 
            :clear-input="true" 
            v-model="maintenance.location"
            placeholder="Vul locatie in"
            :aria-label="`Vul de locatie in voor onderhoud met ID ${maintenance.id}. `">
            </ion-input>
        </ion-item>
  
        <!-- Type -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="maintenance.Type">Soort onderhoud</ion-label>
            <select 
            id="maintenance-type" 
            v-model="maintenance.type" 
            aria-label="Selecteer het type onderhoud" 
            class=" dark:text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12" 
            >
               <option disabled value="">Selecteer</option>
               <option value="Schilderwerk">Schilderwerk</option>
               <option value="Houtrot">Houtrot</option>
               <option value="Elektra">Elektra</option>
               <option value="Leidingwerk">Leidingwerk</option>
               <option value="Beglazing">Beglazing</option>
            </select>
        </ion-item>
      
        <!-- urgent required -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="urgent-required">Acute actie vereist</ion-label>
            <ion-radio-group 
            id="urgent-required" 
            v-model="maintenance.urgent"
            :aria-label="`Heeft Onderhoud met ID ${maintenance.id} acute actie nodig? Kies ja of nee.`"
            >
                <ion-radio 
                class="ion-margin-end" 
                slot="start" 
                value="ja">
                 Ja 
                </ion-radio>
                <ion-radio 
                slot="start" 
                value="nee">
                  Nee
                </ion-radio>
            </ion-radio-group>
            <div aria-live="polite" class="sr-only">
               De geselecteerde optie is
               {{ maintenance.urgentRequired === 'ja'
               ? 'ja, acute actie vereist'
               : 'nee, geen acute actie vereist' }}.
            </div>
        </ion-item>
  
        <!-- costEstimate -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="maintenance.costEstimate">Kosten indicatie</ion-label>
            <select 
            id="maintenance-costEstimate" 
            v-model="maintenance.costEstimate" 
            aria-label="Selecteer de kosten indicatie voor het onderhoud"
            class=" dark:text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12" 
            >
               <option disabled value="">Selecteer</option>
               <option value="0 - 500">0 - 500</option>
               <option value="500 - 1500">500 - 1500</option>
               <option value="1500+">1500+</option>
            </select>
        </ion-item>
      
        <!-- Photo Upload Section -->
        <InspectionImageUploader 
        category="maintenance" 
        :inspectionId="maintenance.id" 
        :firebaseId="firebaseId" 
        />
    </div>
</template>
  
<script setup>
  
  import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonRadio,
    IonRadioGroup,
  } from "@ionic/vue";
  import { trash } from "ionicons/icons";
  import InspectionImageUploader from "./InspectionImageUploader.vue";
  
  const props = defineProps({
    maintenance: {
      type: Object,
      required: true
    },
    firebaseId: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['removeMaintenance']);
  const removeMaintenance = () => {
    emit('removeMaintenance', props.maintenance.id);
  };
  
  
  
  
</script>
  
<style scoped>
  ion-item {
    --background: transparent;
  }
  
  ion-item::part(native) {
    padding-block: 5px;
    border-bottom: 4px solid var(--ion-color-light);
  }
  
  ion-radio::part(container) {
    width: 44px;
    height: 37px;
    border-radius: 8px;
    border: 2px solid #ddd;
  }
  
  ion-radio::part(mark) {
    background: none;
    transition: none;
    transform: none;
    border-radius: 0;
  }
  
  ion-radio.radio-checked::part(container) {
    background: var(--ion-color-primary);
    border-color: transparent;
  }
  
  ion-radio.radio-checked::part(mark) {
    width: 6px;
    height: 10px;
    border-width: 0px 2px 2px 0px;
    border-style: solid;
    border-color: #fff;
    transform: rotate(45deg);
  }
</style>