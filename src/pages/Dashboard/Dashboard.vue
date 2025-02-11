<template>
    <ion-page class="container max-w-7xl mx-auto">
        <MainHeader />
  
        <ion-content :fullscreen="true" color="tertiary">
            <!-- Refresher -->
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
  
            <h1 class="sr-only">Dashboard</h1>
  
            <section 
            tabindex="0" 
            aria-labelledby="dashboard-heading"
            class="h-full my-2 mb-2 mt-4 landscape:mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryLight hover:ring-primaryLight"
            >
                <h2 id="dashboard-heading" class="sr-only">Dashboard Overzicht</h2>
                <p id="dashboard-description" class="sr-only">
                    Er zijn in totaal {{ dashboardCards.length }} kaarten. 
                    Gebruik de Tab-toets of klik om een kaart te selecteren.
                </p>
  
                <ion-row 
                role="list"  
                class="grid grid-cols-2 landscape:grid-cols-4 gap-2 pt-2 justify-center items-center px-4"
                >
                    <ion-col 
                    
                    v-for="(card, index) in dashboardCards" 
                    :key="card.id" 
                    role="listitem"
                    class=" w-full h-full"
                    >
                      <button 
                      @click="navigateToPage(card.link)" 
                      @keydown.enter="navigateToPage(card.link)"
                      @keydown.space.prevent="navigateToPage(card.link)"
                      class="bg-white dark:bg-primaryDark h-full w-full shadow-md rounded-md flex flex-col items-center pt-4 justify-start m-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryLight hover:ring-primaryLight"
                      :aria-label="`Kaart ${index + 1} van ${dashboardCards.length}: ${card.title}`"
                      >
                          <div class="flex w-20 h-20 bg-primaryLight rounded-full justify-center items-center">
                              <ion-icon :icon="card.icon" aria-hidden="true" class="text-6xl text-white" />
                          </div>
                          <span class="px-2 py-4 text-center text-xl text-accentDark dark:text-white font-bold">
                              {{ card.title }}
                          </span>
                      </button>
                    </ion-col>
                </ion-row>

                
              <!-- FOR TESTING: -->
              <!-- <ion-button expand="block" @click="inspectAppData">Bekijk opgeslagen gegevens</ion-button>
              <ion-button expand="block" @click="deleteAppData">Wis alle gegevens</ion-button>   -->

            </section>
            
        </ion-content>
  
        <MainFooter />
    </ion-page>
</template>
  
<script setup>
  // Imports
  import {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonButton,
  } from "@ionic/vue";
  
  import {
    documentTextOutline,
    checkmarkCircleOutline,
    settingsOutline,
    bookOutline
  } from "ionicons/icons";
  
  import MainHeader from "@/components/Layout/MainHeader.vue";
  import MainFooter from "@/components/Layout/MainFooter.vue";
  
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";

  // stores
  import { useInspectionStore } from '@/Stores/inspectionStore';
  import { useUserStore } from '@/Stores/userStore';
  // services: FOR TEST
  // import { usePhotoService } from '@/Services/photoService';

  // Initialization
  const router = useRouter();
  const inspectionStore = useInspectionStore();
  const userStore = useUserStore();
  // FOR TEST
  // const { 
  //   listPreferences, 
  //   listAllFilesystem, 
  //   deleteAllFilesystem,  
  //   clearPreferences 
  // } = usePhotoService();

   // Variables
  const dashboardCards = ref([
    { id: 1, title: "Openstaande inspecties", link: "pending-inspection-reports", icon: documentTextOutline },
    { id: 2, title: "Uitgevoerde inspecties", link: "completed-inspections-reports", icon: checkmarkCircleOutline },
    { id: 3, title: "Kennisbank", link: "knowledge-base", icon: bookOutline },
    { id: 4, title: "Instellingen", link: "settings", icon: settingsOutline },
  ]);
  
  //Navigation
  const navigateToPage = (page) => {
    document.activeElement.blur();
    router.push(`/${page}`);
  };
  
  const handleRefresh = (event) => {
    setTimeout(() => {
      inspectionStore.loadInspections();
      userStore.loadProfile();
      event.target.complete(); 
    }, 2000);
  };
   
  //Hooks
  onMounted(async () => {
    await inspectionStore.loadInspections();
    await userStore.loadProfile();
  });

  //FOR TEST
  // const inspectAppData = async () => {
  //   console.log('--Preferences--');
  //   await listPreferences();

  //   console.log('--Filesystem--');
    
  //   await listAllFilesystem();
  // };

  // const deleteAppData = async()=>{
  //   await clearPreferences()
  //   await deleteAllFilesystem()
  // }

</script>
  