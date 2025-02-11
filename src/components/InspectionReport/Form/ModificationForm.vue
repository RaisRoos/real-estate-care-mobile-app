<template>
    <div class="border-4 dark:border-medium bg-white">
      <h3 class="sr-only">Modificaties ID:{{ modification.id }}</h3>

        <!-- modification -->
        <ion-item 
        lines="none" 
        class=" bg-white dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label class="not-sr-only ">
              <strong>Modificaties ID:</strong> {{ modification.id }}
            </ion-label>
            <ion-button 
            fill="clear" 
            color="danger" 
            @click="removeModification" 
            slot="end"
            :aria-label="`Modificatie met ID ${modification.id} verwijderen.`"
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
           <ion-label for="modification-location" class="mr-4">Locatie</ion-label>
           <ion-input 
           id="modification-location" 
           label-placement="stacked" 
           :clear-input="true"
           v-model="modification.location" 
           placeholder="Vul locatie in"
           :aria-label="`Vul de locatie in voor modificatie met ID ${modification.id}. `">
           </ion-input>
        </ion-item>

        <!-- Open Documentation file -->
        <ion-item 
        v-if="inspection.files && inspection.files.documentatie != ''" 
        lines="none"
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label>Documentatie file</ion-label>
            <ion-button 
            :aria-label="'Download het document'" 
            class="text-xl py-3  w-6/12 h-16"  
            :href="`/assets/files/${inspection.files.documentatie}`" 
            download expand="block"
            >Download
            </ion-button>
        </ion-item>
  
        <!-- description -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
           <ion-textarea 
           id="modification-description" 
           label="Beschrijving" 
           label-placement="floating"
           v-model="modification.description" 
           placeholder="Geef een korte beschrijving van de modificatie" 
           rows="5"
           :aria-label="`Geef een beschrijving van de modificatie.`">
           </ion-textarea>
        </ion-item>
  
        <!-- PerformedBy -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark "
        >
        <div class="flex justify-between w-full items-center">
            <label for="modification-performedBy">
            Uitgevoerd door
            </label>

            <select 
            id="modification-performedBy"
            v-model="modification.performedBy" 
            class=" text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12 " 
            >
               <option disabled value="">Selecteer</option>
               <option value="Huurder">Huurder</option>
               <option value="Aannemer">Aannemer</option>
               <option value="Onbekend">Onbekend</option>
            </select>
          </div>
        </ion-item>
      
  
        <!-- ActionRequired -->
        <ion-item 
        lines="none"  
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
        <div class="flex justify-between w-full items-center">
            <label for="modification-actionRequired">Te ondernemen actie</label>
            <select 
            id="modification-actionRequired" 
            v-model="modification.actionToBeTaken" 
            class=" text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12" 
            >
                <option disabled value="">Selecteer</option>
                <option value="Accepteren">Accepteren</option>
                <option value="Laten keuren">Laten keuren</option>
                <option value="Laten verwijderen">Laten verwijderen</option>
                <option value="Laten aanpassen en keuren">Laten aanpassen en keuren</option>
            </select>
          </div>
        </ion-item>
     
  
        <!-- Remarks -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-textarea 
            id="modification-remarks" 
            label="Opmerkingen" 
            label-placement="floating"
            v-model="modification.remarks" 
            placeholder="Geef opmerkingen over de modificatie"
            :aria-label="`Geef opmerkingen over de modificatie met ID ${modification.id}.`" 
            rows="5">
            </ion-textarea>
        </ion-item>
  
        <!-- Photo Upload Section -->
        <InspectionImageUploader 
        category="modification" 
        :inspectionId="modification.id" 
        :firebaseId="firebaseId"
        />
    </div>
</template>
  
<script setup>
  
  import {
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
  } from "@ionic/vue";
  import { trash } from "ionicons/icons";
  import InspectionImageUploader from "./InspectionImageUploader.vue";
  
  const props = defineProps({
    modification: {
      type: Object,
      required: true
    },
    inspection: {
      type: Object,
      required: true
    },
    firebaseId: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['removeModification']);
  
  const removeModification = () => {
    emit('removeModification', props.modification.id);
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