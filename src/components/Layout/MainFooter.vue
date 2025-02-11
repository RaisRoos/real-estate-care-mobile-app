<template>
    <ion-footer class="h-[120px] bg-transparent shadow-none">
        <ion-tabs class="bg-transparent">
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom" color="secondary"
                class=" mb-2 h-20 w-11/12 shadow-md shadow-black/20 relative left-1/2 transform -translate-x-1/2 -translate-y-1/10 rounded-full overflow-hidden">
                <ion-tab-button tab="home" href="/" aria-label="Home">
                    <ion-icon aria-hidden="true" size="large" :icon="home" class="text-md "
                        :class="selectedTab === 'home' ? 'text-primaryLight' : 'text-accentLight'" />
                </ion-tab-button>
                <ion-tab-button tab="search" href="/search" aria-label="Zoeken">
                    <ion-icon aria-hidden="true" size="large" :icon="search" class="text-md "
                        :class="selectedTab === 'search' ? 'text-primaryLight' : 'text-accentLight'" />
                </ion-tab-button>
                <ion-tab-button tab="information" href="/information" aria-label="Informatie ">
                    <ion-icon aria-hidden="true" size="large" :icon="informationCircle" class="text-md "
                        :class="selectedTab === 'information' ? 'text-primaryLight' : 'text-accentLight'" />
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-footer>
</template>

<script setup>
import {
    IonFooter,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
} from '@ionic/vue';

import {
    home,
    search,
    informationCircle
} from 'ionicons/icons';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const selectedTab = computed(() => {
    document.activeElement.blur();
    // console.log(route.path.split('/').pop())
    return route.path.split('/').pop();
})
</script>