<template>
    <div class=" border-4 dark:border-medium bg-white">
       <h3 class="sr-only">Schade ID:{{ damage.id }}</h3>
       <!-- Damage-->
        <ion-item 
        lines="none" 
        class=" bg-white dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label class="not-sr-only">
             <strong>Schade ID:</strong> {{ damage.id }}
            </ion-label>
            <ion-button 
            fill="clear" 
            color="danger" 
            @click="removeDamage" 
            slot="end"
            :aria-label="`Schade met ID ${damage.id} verwijderen.`"
            >
               <ion-icon :icon="trash" size="large" aria-hidden="true"></ion-icon>
               <span class="sr-only">Verwijderen</span>
            </ion-button>
        </ion-item>
  
        <!-- Locatie Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
           <ion-label for="damage-location" class="mr-4">Locatie</ion-label>
           <ion-input 
           id="damage-location" 
           label-placement="stacked" 
           :clear-input="true" 
           v-model="damage.location"
           placeholder="Vul locatie in" 
           :aria-label="`Vul de locatie in voor schade met ID ${damage.id}.`"
           ></ion-input>
        </ion-item>
  
        <!-- Date Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
           <ion-label for="damage-date">Datum:</ion-label>
           <input 
           type="date" 
           id="damage-date" 
           v-model="damage.selectedDate"
           :aria-label="`Selecteer de datum voor schade met ID ${damage.id}.`" 
           class=" dark:text-black bg-tertiaryLight p-1 border-tertiaryDark border w-6/12" 
           />
        </ion-item>
  
        <!-- New damage Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="new-damage">Nieuwe schade</ion-label>
            <ion-radio-group 
            id="new-damage" 
            v-model="damage.new"
            :aria-label="`Is de schade met ID ${damage.id} nieuw? Kies ja voor nieuw, nee voor niet nieuw.`"
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
            </ion-radio-group>
            <div aria-live="polite" class="sr-only">
             De geselecteerde optie is
             {{ damage.newDamage === 'ja'
             ? 'ja, het is nieuwe schade'
             : 'nee, het is geen nieuw schade' }}.
            </div>
        </ion-item>
  
        <!-- Damage type Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="damage-type">Soort schade</ion-label>
            <select 
            id="damage-type" 
            v-model="damage.type" 
            aria-label="Selecteer het type schade."
            class="text-black bg-tertiaryLight p-2 border-tertiaryDark border w-6/12" 
            >
                <option disabled value="">Selecteer</option>
                <option value="Moedwillig">Moedwillig</option>
                <option value="Slijtage">Slijtage</option>
                <option value="Geweld">Geweld</option>
                <option value="Normaal gebruik">Normaal gebruik</option>
                <option value="Calamiteit">Calamiteit</option>
                <option value="Anders">Anders</option>
            </select>
        </ion-item>
     
  
        <!-- urgent required Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
            <ion-label for="urgent-required">Acute actie vereist</ion-label>
            <ion-radio-group 
            id="urgent-required" 
            v-model="damage.urgent"
            :aria-label="`Heeft schade met ID ${damage.id} acute actie nodig? Kies ja of nee.`"
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
             {{ damage.urgentRequired  === 'ja'
             ? 'ja, acute actie vereist'
             : 'nee, geen acute actievereist' }}.
            </div>
        </ion-item>
  
        <!-- description Section -->
        <ion-item 
        lines="none" 
        class="dark:bg-primaryDark text-textPrimaryLight dark:text-textPrimaryDark"
        >
           <ion-textarea 
           id="damage-description" 
           label="Omschrijving" 
           label-placement="floating" 
           v-model="damage.description"
           placeholder="Geef een omschrijving van de schade" 
           rows="5"
           :aria-label="`Geef een omschrijving van de schade met ID ${damage.id}.`">
           </ion-textarea>
        </ion-item>
  
        <!-- Photo Upload Section -->
        <InspectionImageUploader 
        category="damage" 
        :inspectionId="damage.id" 
        :firebaseId="firebaseId" 
        />
    </div>
</template>
  
<script setup>
  // Imports
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
  import {trash} from "ionicons/icons";

  import InspectionImageUploader from "./InspectionImageUploader.vue";
  
  const props = defineProps({
    damage: {
      type: Object,
      required: true
    },
    firebaseId: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['removeDamage']);
  
  const removeDamage = () => {
    emit('removeDamage', props.damage.id);
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