<template>
    <div class=" border-4 dark:border-medium bg-white">
        <h3 class="sr-only">Installatie ID:{{ installation.id }}</h3>
         <!-- Installation -->
        <ion-item 
        lines="none" 
        class=" bg-white dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label class="not-sr-only">
              <strong>Installatie ID:</strong> {{ installation.id }}
            </ion-label>
            <ion-button 
            fill="clear" 
            color="danger" 
            @click="removeInstallation" 
            slot="end"
            :aria-label="`Installatie met ID ${installation.id} verwijderen.`"
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
            <ion-label for="installation-location" class="mr-4">Locatie</ion-label>
            <ion-input 
            id="installation-location" 
            label-placement="stacked" 
            :clear-input="true"
            v-model="installation.location" 
            placeholder="Vul locatie in"
            :aria-label="`Vul de locatie in voor installatie met ID ${installation.id}.`">
            </ion-input>
        </ion-item>

        <ion-item v-if="inspection.files && inspection.files.testProcedure != ''"  
        lines="none"
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark "
        >
            <ion-label>Testprocedure file</ion-label>
            <ion-button 
            :aria-label="'Download het document'" 
            class="text-xl py-3 w-6/12 h-16"  
            :href="`/assets/files/${inspection.files.testProcedure}`" 
            download expand="block">
              Download
            </ion-button>
        </ion-item>
  
        <!-- type -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="installation.Type">Soort installatie</ion-label>
            <select 
            id="installation-type" 
            v-model="installation.type" 
            aria-label="Selecteer het type installatie" 
            class=" dark:text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12" 
            >
               <option disabled value="">Selecteer</option>
               <option value="Koeling">Koeling</option>
               <option value="Verwarming">Verwarming</option>
               <option value="Luchtverversing">Luchtverversing</option>
               <option value="Elektra">Elektra</option>
               <option value="Beveiliging">Beveiliging</option>
            </select>
        </ion-item>
      
  
        <!-- reportedIssues -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-textarea 
            id="installation.reportedIssues" 
            label="Gemelde storingen" 
            label-placement="floating"
            v-model="installation.reportedIssues" 
            placeholder="Gemelde storingen" 
            rows="5"
            :aria-label="`Geef een omschrijving van de gemelde storingen voor installatie met ID ${installation.id}.`">
            </ion-textarea>
        </ion-item>
  
        <!-- approved -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="installation.approved">Goedgekeurd</ion-label>
            <ion-radio-group 
            id="installation.approved" 
            v-model="installation.approved"
            :aria-label="`Is de installatie met ID ${installation.id} goedgekeurd? Kies Ja of Nee.`"
            >
                <ion-radio 
                class="ion-margin-end" 
                slot="end" 
                value="ja">
                  Ja
                </ion-radio>
                <ion-radio 
                slot="end" 
                value="nee">
                  Nee
                </ion-radio>
                <div aria-live="polite" class="sr-only">
                 De geselecteerde optie is
                 {{ installation.approved === 'ja'
                 ? 'Ja, de installatie is goedgekeurd'
                 : 'Nee, de installatie is niet goedgekeurd' }}.
                </div>
            </ion-radio-group>
        </ion-item>
  
        <!-- remarks -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
           <ion-textarea 
           label="Opmerkingen" 
           label-placement="floating" 
           v-model="installation.remarks" 
           rows="5"
           id="installation-remarks" 
           placeholder="Geef opmerkingen in"
           :aria-label="`Voer opmerkingen in voor de installatie met ID ${installation.id}.`">
           </ion-textarea>
        </ion-item>
  
         <!-- Photo Upload Section -->
        <InspectionImageUploader 
        category="installation" 
        :inspectionId="installation.id" 
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
    IonRadio,
    IonRadioGroup,
  } from "@ionic/vue";
  import { trash } from "ionicons/icons";
  import InspectionImageUploader from "./InspectionImageUploader.vue";
  
  const props = defineProps({
    installation: {
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
  
  const emit = defineEmits(['removeInstallation']);
  
  const removeInstallation = () => {
    emit('removeInstallation', props.installation.id);
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