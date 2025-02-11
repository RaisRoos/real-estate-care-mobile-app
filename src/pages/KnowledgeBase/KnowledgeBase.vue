<template>
    <ion-page class="container max-w-7xl mx-auto">
        <HeaderWithBackButton title="Kennisbank: Documenten en Informatie"/>
    
    <ion-content :fullscreen="true" color="tertiary" >
        <div class="space-y-4 px-6 pt-4 pb-2"> 
            <h1 class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
              Kennisbank: Documenten en Informatie
            </h1>
            <p>Belangrijke documenten om te downloaden</p>
  
            <section 
            tabindex="0" 
            aria-labelledby="testprocedures-heading" 
            aria-describedby="testprocedures-description"
            >
                <h2 
                id="testprocedures-heading" 
                class="text-xl pb-5 font-bold text-textPrimaryLight dark:text-textPrimaryDark"
                >
                  Testprocedures:
                </h2>
                <p id="testprocedures-description" class="sr-only">
                  Dit is een lijst met beschikbare testprocedures die u kunt bekijken of downloaden.
                </p>
  
                <ion-list 
                aria-label="Lijst van testprocedure bestanden" 
                class="space-y-4 bg-transparent"
                >
  
                    <ion-item v-for="(testprocedure, index) in testprocedures" 
                    :key="testprocedure.id"
                    lines="none"
                    class=" flex flex-col shadow-lg rounded-lg  border-l-4 border-primaryLight  focus-visible:border-y-1 focus-visible:ring-primaryLight hover:border-y-1"
                    >
                        <div class="flex items-center mb-2 py-3 w-6/12">
                            <ion-label  
                            class="overflow-hidden text-ellipsis line-clamp-2 text-sm font-semibold text-textPrimaryLight px-1 pr-2"
                            >
                              {{ testprocedure.title }}
                            </ion-label>
                        </div>
  
                        <div class=" w-11/12  text-textTertiaryLight dark:text-textTertiaryDark text-xs sm:text-sm pl-2 border-l-2">
                          <ion-button 
                          :aria-label="'Download het document' + testprocedure.title " 
                          class=" text-xl pb-1" 
                          :href="testprocedure.url" 
                          download 
                          expand="block"
                          >
                            Download
                          </ion-button>
                        </div>
                    </ion-item>
                </ion-list>
          
            </section>
          
            <section 
            tabindex="0" 
            aria-labelledby="modificatie-heading" 
            aria-describedby="modificatie-description" 
            class="py-8">
                <h2 
                id="modificatie-heading" 
                class="text-xl pb-5 font-bold text-textPrimaryLight dark:text-textPrimaryDark"
                >
                  Gedocumenteerde modificaties:
                </h2>
                <p id="modificatie-description" class="sr-only">
                  Dit is een lijst met reeds gedocumenteerde modificaties die u kunt bekijken of downloaden.
                </p>

                <ion-list 
                aria-label="Lijst van modificaties" 
                class="space-y-4 bg-transparent"
                >
  
                    <ion-item v-for="modificatie in modificaties" 
                    :key="modificatie.id"
                    lines="none"
                    :aria-label="'modificaties bestand '+  modificatie.title + '.' " 
                    class="  flex flex-col shadow-lg rounded-lg  border-l-4 border-primaryLight  focus-visible:border-y-1 focus-visible:ring-primaryLight hover:border-y-1"
                    >
                        <div class="flex items-center mb-2 py-3 w-6/12">
                            <ion-label 
                            class="overflow-hidden text-ellipsis line-clamp-2 text-sm font-semibold text-textPrimaryLight px-1 pr-2"
                            >
                              {{ modificatie.title }}
                            </ion-label>
                        </div>
  
                        <div 
                        id="inspectieopdracht-details"
                        class=" w-11/12  text-textTertiaryLight dark:text-textTertiaryDark text-xs sm:text-sm pl-2 border-l-2"
                        >
                            <ion-button 
                            :aria-label="'Download het document' + modificatie.title " 
                            class=" text-xl pb-1" 
                            :href="modificatie.url" 
                            download 
                            expand="block"
                            >
                              Download
                            </ion-button>
                        </div>
    
                    </ion-item>
                </ion-list>
            </section>
        </div>
    </ion-content>
      
    </ion-page>
</template>
    
<script setup >
   // Imports
    import { 
      IonContent,  
      IonPage,
      IonButton,
      IonItem,
      IonLabel,
      IonList
    } from '@ionic/vue';
    import HeaderWithBackButton from '@/components/Layout/HeaderWithBackButton.vue';
    import { ref } from 'vue';

    // Initialization
    const testprocedures = ref([
    {id: 1, title: 'Voorbeeld 1', url: '/assets/files/testprocedure-voorbeeld-1.pdf'},
    {id: 2, title: 'Voorbeeld 2', url:'/assets/files/testprocedure-voorbeeld-2.pdf'}, 
    {id: 3, title: 'Voorbeeld 3', url: '/assets/files/testprocedure-voorbeeld-3.pdf'}, 
    ]);
  
    const modificaties = ref([
    {id: 4, title: 'Voorbeeld 1', url: '/assets/files/modificaties-voorbeeld-1.pdf' },
    {id: 5, title: 'Voorbeeld 2', url: '/assets/files/modificaties-voorbeeld-2.pdf' },
    {id: 6, title: 'Voorbeeld 3', url: '/assets/files/modificaties-voorbeeld-3.pdf' },
   
    ]);
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
    
    