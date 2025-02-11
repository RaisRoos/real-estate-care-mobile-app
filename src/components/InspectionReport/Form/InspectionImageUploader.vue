<template>
    
    <ion-grid>
        <ion-row class=" pb-4 bg-medium  dark:bg-primaryDark ">
            <ion-col size="12">
              <ion-label>Photos</ion-label>
            </ion-col>
            <ion-col 
            size="6" 
            :key="photo.filepath" 
            v-for="photo in photos"
            >
                <ion-img 
                :src="photo.webviewPath" 
                :alt="photo.description"
                @click="showActionSheet(photo)"
                >
                </ion-img>
      
                <ion-textarea 
                v-model="photo.description" 
                @change="updateDescription(photo.filepath, photo.description)"
                class=" pl-1 bg-white dark:text-primaryDark " 
                rows="3" 
                label="beschrijving" 
                label-placement="floating"
                placeholder="Voer beschrijving in"
                >
                </ion-textarea>
      
            </ion-col>
        </ion-row>
    </ion-grid>
    
        <div class=" flex flex-col justify-center items-center py-5 dark:bg-primaryDark">
          <ion-button fill="outline" expand="circle" class="camera-button" @click="takePhoto">
            Foto Toevoegen
            <ion-icon aria-hidden="true":icon="cameraOutline" class="px-2 text-3xl"></ion-icon>
          </ion-button>
        </div>
      
    </template>
      
    <script setup>
      // Imports
      import {
        actionSheetController,
        IonImg,
        IonLabel,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonIcon,
        IonTextarea,
        IonToast,
      } from "@ionic/vue";
      import { 
        trash, 
        cameraOutline, 
        close, 
        camera, 
        trashOutline 
      } from "ionicons/icons";
    
        // services
        import { usePhotoService } from '@/Services/photoService';
    
        const props = defineProps({
        category: {
          type: String,
          required: true,
        },
        inspectionId: {
          type: String,
          required: true,
        },
        firebaseId: {
          type: String,
          required: true,
        },
      });
      
       
      // Initialization
       const { 
        photos, 
        takePhoto, 
        deletePhoto, 
        updatePhotoDescription 
       } = usePhotoService(props.category, props.inspectionId, props.firebaseId);
    
     
      const showActionSheet = async (photo) => {
        const actionSheet = await actionSheetController.create({
          header: 'Photos',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                deletePhoto(photo);
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
      
              },
            },
          ],
        });
        await actionSheet.present();
      };
      
      const updateDescription = (filepath, description) => {
        updatePhotoDescription(filepath, description);   
      };
      
    </script>
      
    <style scoped>
      .camera-button {
        --padding-top: 10px;
        --padding-bottom: 10px;
        --background: var(--ion-color-white);
        --border-radius: 25px;
        --border-color: var(--ion-color-primary);
        --border-style: solid;
        --border-width: 2px;
        --color: var(--ion-color-primary);
        font-size: 0.9rem;
      
      }
      
      body.dark-theme .camera-button {
        --background: var(--ion-color-primary);
        --border-color: var(--ion-color-primary);
        --color: white;
      }
    </style>