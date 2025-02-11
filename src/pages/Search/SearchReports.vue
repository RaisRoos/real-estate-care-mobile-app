<template>
    <ion-page class="container max-w-7xl mx-auto">
        <ion-header 
        class="ion-no-border max-w-8xl mx-auto pb-1 dark:bg-accentDark bg-secondaryLight"
        >
            <ion-toolbar 
            :style="{'--background': `url(${backgroundSrc}) no-repeat top center`}" 
            class="flex items-center justify-between pb-1">
  
                <ion-title mode="ios" class="sr-only" tabindex="0">
                  Zoek Inspecties
                </ion-title>
                <ion-buttons 
                slot="start"
                class="shadow-md bg-primaryLight rounded-md flex items-center justify-center p-0 mt-4  ml-3"
                >
                    <ion-back-button 
                    mode="md" 
                    default-href="/home"
                    aria-label="Ga terug naar de hoofdpagina">
                    </ion-back-button>
                </ion-buttons>
            </ion-toolbar>
            <div class="space-y-6 px-5 pt-3 pb-2">
                <ion-searchbar 
                    v-model="searchQuery" 
                    debounce="500" 
                    placeholder="Zoek op inspectie, adres of datum" 
                    class="custom-search"
                ></ion-searchbar>
            </div>
        </ion-header>
  
        <ion-content :fullscreen="true" color="tertiary">
           
            <div v-if="filteredInspections.length > 0" 
            class="space-y-6 px-4 py-8" 
            tabindex="0"
            >
                <ion-list 
                aria-label="Lijst van Inspecties" 
                class="space-y-4 bg-transparent"
                >
                    <ion-item 
                    v-for="inspection in filteredInspections" 
                    :key="inspection.id"
                    @click="handleInspectionClick(inspection)"
                    @keydown.enter="handleInspectionClick(inspection)"
                    @keydown.space.prevent="handleInspectionClick(inspection)"   
                    button 
                    lines="none"
                    aria-labelledby="inspectieopdracht-titel inspectieopdracht-details"
                    class=" flex flex-col shadow-lg rounded-lg  border-l-4  border-primaryLight  focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryLight hover:ring-primaryLight "
                    >
                        <div class="flex items-center mb-2 py-3 w-8/12">
                            <div class="flex items-center justify-center w-9 h-9 rounded-full  mr-3">
                                <ion-icon 
                                :icon="inspection.status === 'Uitgevoerd' 
                                ? checkmarkDoneOutline 
                                : bookmark" 
                                class="text-primaryLight text-3xl" 
                                aria-hidden="true"
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
                        class="w-4/12 text-textTertiaryLight dark:text-textTertiaryDark text-xs sm:text-sm pl-2 border-l-2">
                            <p>
                              <span class="sr-only">Adres:</span> 
                              {{ inspection.address }}
                            </p>
                            <p class="pt-2 text-sm font-medium text-textSecondaryLight dark:text-textSecondaryDark">
                                <span class="sr-only">Datum:</span> 
                                {{ inspection.date }}
                            </p>
                            <p class="sr-only pt-2 text-sm font-medium text-textSecondaryLight dark:text-textSecondaryDark">
                              <span >Status:</span> 
                              {{ inspection.status }}
                            </p>
                        </div>
                    </ion-item>
                </ion-list>
            </div>
  
            <div v-else>
                <p class="text-textPrimaryLight dark:text-textPrimaryDark text-center py-8">
                    Geen inspecties gevonden.
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
    IonSearchbar,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
  } from '@ionic/vue';
  import {
    checkmarkDoneOutline,
    bookmark
  } from "ionicons/icons";
  
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  // stores
  import { useInspectionStore } from '@/Stores/inspectionStore';
  import { useThemeStore } from '@/Stores/themeStore';
  
  // Initialization
  const router = useRouter();
  const inspectionStore = useInspectionStore();
  const themeStore = useThemeStore();
  
  // Variables
  const searchQuery = ref('');
  
  // Computed
  const allInspections = computed(() => {
    return [
        ...inspectionStore.pendingInspections.map(inspection => ({
            ...inspection,
            status: 'Openstaand',
        })),
        ...inspectionStore.completedInspections.map(inspection => ({
            ...inspection,
            status: 'Uitgevoerd',
        })),
    ];
  });
  
  const filteredInspections = computed(() => {
    return allInspections.value.filter(inspection =>
        inspection.task.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        inspection.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        inspection.date.includes(searchQuery.value)
    );
  });
  
  //Navigation
  function handleInspectionClick(inspection) {
    if (inspection.status === 'Uitgevoerd') {
        viewInspectionReport(inspection.id);
    } else {
        openInspectionForm(inspection.id);
    }
  }
  
  function viewInspectionReport(id) {
    router.push({ name: 'view-inspection-report', params: { id } });
  }
  
  function openInspectionForm(id) {
    router.push({ name: 'create-inspection-report', params: { id } });
  }
  
  
  const backgroundSrc = computed(() => {
      return themeStore.isDarkMode
          ?  '/assets/images/darkmode-bg.png'
          : '/assets/images/lightmode-bg.png';
  });
</script>
  
<style scoped>

    ion-searchbar.custom-search{
      --background: #ffffff;
      --color: #252525;
      --placeholder-color: #515151;
      --icon-color: #515151;
      --clear-button-color: #515151;
      --border-radius: 4px;  
    }
  
    body.dark-theme ion-searchbar.custom-search {
      --background: #203841;
      --color: #ffffff;
      --placeholder-color: #e4e4e4;
      --icon-color: #e4e4e4;
      --clear-button-color: #e4e4e4;
      --border-radius: 4px; 
    }
  
  
    ion-item {
      --background: white;
      --color: #000000;
    }
  
    body.dark-theme ion-item{
      --background: var(--ion-color-secondary);
      --color: #fff;
    }
</style>
  