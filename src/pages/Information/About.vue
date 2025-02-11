<template>
    <ion-page class="container max-w-7xl mx-auto">
       <MainHeader />

  
        <ion-content :fullscreen="true" color="tertiary" >
        <div class="space-y-6 px-6 pt-8 pb-4">
            <h1 
            class="text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark" 
            tabindex="0"
            >
              Over Real Estate Care
            </h1> 
            <p class=" text-textPrimaryLight dark:text-textPrimaryDark" >
                Real Estate Care is een mobiele applicatie... 
            </p>
        </div>
        
        </ion-content>
   
        <MainFooter />
  
    </ion-page>
</template>
  
<script setup >
  import { 
    IonContent,  
    IonPage
  } from '@ionic/vue';
  import MainHeader from "@/components/Layout/MainHeader.vue";
  import MainFooter from "@/components/Layout/MainFooter.vue";
</script>
  