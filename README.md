# Real Estate Care Applicatie
## Introductie
Dit project is een onderdeel van de eindopdracht voor Front End development en is bedoeld om de opgedane ervaring en kunde  te demonstreren. Dit onderdeel bestaat uit het maken van een mobile app binnen de vastgoedbranche.
De **Real Estate Care** is een mobile applicatie. Deze app is ontwikkeld om de reguliere werkzaamheden van vastgoedinspecteurs te digitaliseren.
De Real Estate Care app bevat de volgende functies waarvan de vastgoedinspecteurs eenvoudig gebruik van kunnen maken:
- Vastleggen van foto’s en deze direct toevoegen aan de inspectierapportages.
- Inspectierapporten bekijken, aanmaken, aanpassen en verwijderen.
- De app in offline modus gebruiken waarbij de ingevoerde gegevens automatisch worden gesynchroniseerd, zodra de netwerkverbinding weer beschikbaar is.  
- De mogelijkheid om te switchen naar een donkere (interface) modus.

## Technologieën
De applicatie is gebouwd met de volgende technologieën:

**[Ionic Framework](https://ionicframework.com/docs):** is een uitgebreide bibliotheek met kant en klare UI-componenten dat goed werkt op zowel Android als iOS.

**[Vue.js](https://vuejs.org):** is een javascript framework voor het bouwen van een interactieve en dynamische webapplicatie.

**[Capacitor](https://capacitorjs.com/docs):** maakt het mogelijk om de mobile functies te gebruiken, zoals camera en opslag.

**[Pinia](https://pinia.vuejs.org/):**  is een state management bibliotheek voor Vue.js dat gebruikt wordt in een applicatie om de gegevens cenraal te beheren. 

**[Axios](https://axios-http.com/docs/intro):** is een javascript bibliotheek dat zorgt voor een veilige en snelle communicatie met de back-endservices.

**[Firebase](https://firebase.google.com):** Voor authenticatie, realtime databasefunctionaliteit en hosting.

**[Tailwind CSS](https://tailwindcss.com/docs):** zorgt voor dat de opmaak van de applicatie eenvoudiger en efficienter kan worden toegepast. 

## Procesbeschrijving
Hieronder volgt een beschrijving van de belangrijkste functionaliteiten en ontwerpbeslissingen.

### Firebase Authenticatie en Database
De Firebase Authenticatie functie zorgt er voor dat de toegang beveiligt wordt via een  e-mailadres en wachtwoord.

Daarnaast maakt de app gebruik van **Firebase Realtime Database** met **Firebase Security Rules** om ervoor te zorgen dat elke interactie met de database alleen mogelijk is voor geauthenticeerde gebruikers.

Een van de eisen van de opdracht is om RESTful API-aanroepen te gebruiken.  Met **Realtime Database** en **Axios** kan dit worden gerealiseerd.

### Beheer inspectierapporten
De functionaliteit van de applicatie is gebouwd naar aanleiding van de gesprekken met de inspecteurs waarbij de wensen(requirements) zijn vastgelegd. Daaruit is duidelijk naar voren gekomen dat men meer vrijheid wil in het opstellen van rapporten.
In de praktijk zijn er vier soorten inspecties te onderscheiden:
- Schade inspecties
- Onderhoud inspecties
- Installatie inspecties
- Modificaties inspecties

Met de Real Estate Care applicatie is het mogelijk voor de inspecteurs om zowel online als offline de rapporten te bekijken, aan te maken, bij te werken en te verwijderen. Afhankelijk van de situatie, hebben de inspecteurs de mogelijkheid om meerdere inspecties van dezelfde type of een combinatie van de beschikbare inspecties toe te voegen in één rapport.

 ### Foto’s toevoegen en beheren
Zoals eerder aangegeven, kunnen foto’s direct worden vastgelegd via de camera en toegevoegd worden aan een rapport.
Voor deze demo/prototype-app heeft het de voorkeur om de foto's lokaal op te slaan. 
Hoe wordt er dan voor gezorgd dat de juiste foto wordt gekoppeld aan de bijbehorende inspectie en rapport? 
In de app worden alle genomen foto’s voor een bepaalde inspectie opgeslagen in **de Capacitor Preferences / local storage**. De combinatie van het inspectietype, de inspectie-ID en het rapport-ID vormen de sleutel voor deze foto’s. Dit zorgt er voor dat de foto’s correct worden gekoppeld aan de juiste inspectie met de daarbij behorende rapport. Hierdoor ontstaat er een georganiseerde en efficiënte weergave van de gegevens.

### Algoritme en Offline Functionaliteit
- Bij het succesvol inloggen op de app wordt gecontroleerd of de gegevens aanwezig zijn in de lokale cache (Capacitor Preferences).
- Zijn de gegevens niet aanwezig, dan controleert de app vervolgens of de gegevens beschikbaar zijn in de Firebase Realtime Database.
- Als deze wel aanwezig zijn in de Firebase Realtime Database, dan worden de gegevens opgehaald en bewaard in de lokale cache.
- Als blijkt dat de gegevens ook niet staan in de firebase realtime database, dan worden deze opgehaald uit een lokale JSON-bestand en doorgestuurd naar de firebase realtime database en worden opgeslagen in de lokale opslag (local storage).
 
Doordat de gegevens op de cache worden opgeslagen, kunnen de inspecteurs ook offline met de gegevens werken. Een ander voordeel van een opslag in de cache, is dat onnodige verbinding met de database wordt beperkt. Dit helpt mee aan kostenbesparing en alleen een verbinding tot stand te brengen als dat nodig is (bijvoorbeeld alleen als de gegevens worden bewerkt of verwijderd). 

Een belangrijk aandachtspunt hierbij is echter wel dat de gegevens in de lokale cache kan worden opgeslagen als de app online is. 

Om het voor inspecteurs mogelijk te maken om inspectierapporten offline te bewerken of te verwijderen, worden de wijzigingen opgeslagen in een wachtrij (de key inspectionsQueue in de Capacitor Preferences). Tegelijkertijd worden de wijzigingen bijgewerkt in de inspecties cache. 
Aangebrachte wijzigingen wanneer de app offline is, worden automatisch gesynchroniseerd met de firebase realtime database, zodra de app weer online is. 
De inspectionsqueue wordt vervolgens geleegd.

De app controleert voortdurend de netwerkstatus en past zich dynamisch aan, zodat inspecteurs altijd door kunnen werken, ongeacht de netwerkverbinding.

### Donkere modus
Eerder is al aangegeven dat de app beschikt over een donkere modus. Via instellingen kunnen de gebruikers makkelijk schakelen van een lichte naar een donkere weergave.

Voor de styling wordt een combinatie van **Ionic CSS** en **Tailwind CSS** gebruikt. Hoewel deze aanpak wellicht niet de meest conventionele is, is er veel aandacht besteed aan een duidelijke en consistente gebruikerservaring.
Alle inhoud, zoals tekst, knoppen en interactieve elementen, is zorgvuldig ontworpen om goed zichtbaar en leesbaar te zijn in zowel de lichte als de donkere modus.

### Resetfunctie
Via instellingen biedt  de app een resetknop. Met de resetknop kunnen gebruikers alle lokale gegevens en realtime database-items verwijderen. Gebruikers kunnen op deze manier de app meermaals testen zonder dat oude data de prestaties van de app beinvloedt.
Dit is ook nuttig voor de docenten die de app testen, omdat het hen in staat stelt om de app opnieuw en zonder overbodige gegevens te evalueren.
Daarnaast zorgt dit ervoor dat foto’s en andere opgeslagen gegevens de opslagcapaciteit van het apparaat van de tester niet onnodig belasten.

### Progressive Web App (PWA)
Ik heb ervoor gekozen om de applicatie te ontwikkelen als een Progressive Web App vanwege de praktische voordelen en veelzijdigheid. Gebruikers kunnen de app installeren als een native applicatie op zowel Android- als iOS-apparaten, zonder gebruik van een app store. Daarnaast blijft de PWA ook offline toegangkelijk, waardoor de app altijd bruikbaar is, zelfs zonder internetverbinding.

### Bekende Beperkingen - Wat werkt nog niet perfect?
#### Vertraging bij updates:
Tijdens het bijwerken van de inspectierapporten worden wijzigingen soms pas zichtbaar nadat je van de ene naar een ander pagina navigeert.
####  Na uitloggen/resetten
Bij het opnieuw inloggen na gebruik van het uitloggen/reset-knop die op de settingpagina te vinden is, zijn mogelijk de gegevens niet onmiddelijk zichtbaar op de app. Dit is iets om rekening mee te houden. Door het dashboard-pagina opnieuw te laden, worden de gegevens in de app weer zichtbaar. 

> **Tip:**  Als de inhoud van een pagina in andere gevallen niet zichtbaar lijkt, kun je dit meestal oplossen door naar het Dashboard te gaan en deze te verversen.

## Verantwoording
### Veiligheid
Bij het ontwikkelen van de applicatie is de veiligheid een van de belangrijkste onderdelen. Hieraan is dan ook veel aandacht aan besteedt. 
Hieronder vind u een overzicht van de maartregelen die zijn genomen om de veiligheid van de gegevens te beschermen.
- **Authenticatie:** Door de firebase authentication system kunnen alleen de gebruikers met een geldig e-mailadres en wachtwoord toegang krijgen tot de app. 
- **Databasebeveiliging:** Door firebase security rules te implementeren aan Realtime Database , hebben alleen geauthenticeerde gebruikers toegang tot de gegevens. 
- **Veilige API-aanroepen:** Alle communicatie met de Firebase-database maken gebruik van beveiligde HTTPS-verbindingen en Firebase tokens om een veilige interactie te garanderen.
- **Hosting:** Een van de voordelen van Firebase hosting is dat het automatisch ondersteuning biedt voor HTTPS wat resulteert in een veilige en versleutelde verbinding.  
- **Beveiligde Routing:** De app maakt gebruik van route guards om ervoor te zorgen dat gebruikers alleen toegang hebben tot specifieke pagina's als ze correct geauthenticeerd zijn.

### Toegankelijkheid (Accessibility)
De applicatie is ontworpen met de nadruk op toegankelijkheid en voldoet aan de WCAG 2.1-richtlijnen.
- **Gebruik van semantische HTML en de juiste Ionic-componenten:** De app wordt toegankelijk doordat het gebruik maakt van de semantische HTML-elementen en de juiste Ionic-componenten. Dit maakt de gebruikersinterface goed leesbaar en makkelijk te navigeren voor screenreaders en andere assistieve technologieen. 
- **ARIA-labels en -attributen:** Voor betere toegangelijkheid zijn de Interactieve elementen voorzien van ARIA-labels en -attributen.  
- **Kleurcontrast:** De applicatie is eenvoudig te gebruiken voor mensen met een visuele beperking. Tussen tekst en achtergrond is er voldoende kleurcontrast waardoor de applicatie goed leesbaar is. 
- **Toegankelijkheidstests:** Verder is de applicatie uitgebreid getest met NVDA (screenreader), Axe DevTools (gratis versie) en Lighthouse om de toegankelijkheid te garanderen. Alle tests hebben aangetoond dat de app voldoet aan de noodzakelijke toegankelijkheidsnormen en geen kritieke fouten vertoont.
- **Toetsenbordnavigatie:** De app ondersteunt navigatie via de Tab-toets, zodat gebruikers ook zonder muis de interface kunnen bedienen.

### Gebruiksvriendelijkheid
De applicatie is ontworpen met de 10 gebruiksvriendelijkheidsprincipes van Jakob Nielsen in gedachten:
-**Zichtbaarheid van systeemstatus:** De gebruiker ontvangt terugkoppeling op de app via visuele indicatoren. Denk hierbij aan een ion-spinner (tijdens het laden) en een ion-toast(voor meldingen). Eventuele foutmeldingen worden in het rood weergegeven. 
- **Overeenstemming met de echte wereld:** De applicatie maakt gebruik van herkenbare termen voor inspecteurs, en de iconen zijn logisch gekozen.
- **Gebruikerscontrole en vrijheid:** De vastgoedinspecteurs beschikken over volledige controle met betrekking tot hun rapporten. Daarnaast is er een keuze tussen een lichte of donkere modus.
- **Consistentie:** Om de gebruikersinterface eenvoudig en overzichtelijk te houden, herbruikt de app componenten. Hierdoor beschikt de app over consistente stijlen, kleuren en achtergronden.
-** Foutpreventie:**  Als een inspecteur een rapport wil verwijderen, wordt er voor de zekerheid om een bevestiging gevraagd. Dit voorkomt dat gebruikers per abuis hun gegevens verliezen.
- **Geheugenvermindering:** De app maakt het mogelijk dat de gebruiker weinig hoeft te onthouden, doordat het gebruik maakt van intuitive iconen en duidelijke labels. Tevens wordt het e-mailadres van de gebruiker automatisch opgeslagen, waardoor de volgende inlogpoging versnelt wordt.

###  Style Guides / Best Practices
 
- ** Componentnamen (PascalCase):** Alle componenten worden benoemd in PascalCase.
- **Codeorganisatie: Services en Stores**
De Services map bevat functies voor netwerk- en databasetoegang, zoals CRUD-operaties en gebruikersauthenticatie.
Deze services zorgen voor de communicatie met externe bronnen (bijv. Firebase) 
In de Stores map wordt de globale applicatiestatus beheerd met Pinia.
- **Scoped CSS in Componenten:**  Wordt gebruikt voor aangepaste stijlen binnen componenten, zodat ze alleen op die component van toepassing zijn en conflicten met andere stijlen voorkomen worden.

## Installatie
Volg deze stappen om de applicatie lokaal te installeren en te gebruiken:
 1. Voorbereiding
- Clone de repository: `git clone `
-Installeer de benodigde dependencies:  `npm install`

2. Firebase Configuratie
Een **gratis Firebase-account** is vereist om de app te configureren. Maak een account aan en start een nieuw project in de Firebase Console via deze link https://console.firebase.google.com/.
- Maak een nieuw project aan in de Firebase Console.
- Voeg **e-mail/wachtwoordauthenticatie** toe in de sectie **Authentication**.
- Maak een **Realtime Database** aan en stel de beveiligingsregels in zoals hieronder:

   ` {
    "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "inspections": {
    "$inspection_id": {
    ".read": "auth != null",
    ".write": "auth != null"
    }
    },
    "profile": {
    "$profile_id": {
    ".read": "auth != null",
    ".write": "auth != null"
    }
    }
    }
    }`

3. Configuratie van omgevingsvariabelen
Maak een **.env**-bestand in de rootmap van je project met de volgende variabelen. **Vervang de placeholders tussen `(...)` door de waarden van jouw Firebase-project**, die je kunt vinden in de Firebase Console onder de instellingen van je project:

    ` VITE_FIREBASE_DB_URL= (Jouw Firebase RealTime Database URL)
    VITE_FIREBASE_API_KEY= (Jouw Firebase API Key)
    VITE_FIREBASE_AUTH_DOMAIN= (Jouw Firebase Auth Domain)
    VITE_FIREBASE_PROJECT_ID=(Jouw Firebase Project ID)
    VITE_FIREBASE_STORAGE_BUCKET=(Jouw Firebase Storage Bucket)
    VITE_FIREBASE_MESSAGING_SENDER_ID=(Jouw Messaging Sender ID)
    VITE_FIREBASE_APP_ID=(Jouw Firebase App ID) `

4. Gebruik de App
Na het volgen van bovenstaande stappen zou de app lokaal moeten draaien en klaar zijn voor gebruik.
- Start de ontwikkelserver: `npm run dev`

## Conclusie in het kort
Voor deze opdracht heb ik een applicatie moeten bouwen voor gebruikers binnen de vastgoedbranche. Het doel van de applicatie is om het huidige werk van vastgoedinspecteurs verder te digitaliseren en te optimaliseren, waarbij effeciency en gebruiksvriendelijkheid centraal staat.
Bij het bouwen van de applicatie is de nadruk vooral gelegd op de principes veiligheid, toegankelijkheid, gebruiksvriendelijkheid en best practices met als doel een robuuste applicatie te realiseren.
Uiteraard zijn er bij het bouwen van elke demo/prototype ruimte voor verbeterpunten. In de toekomst wil ik mij vooral bezighouden met het implementeren van units tests en end to end tests.  Door middel van deze tests wordt het toevoegen van nieuwe functionaliteiten makkelijker zonder dat het de bestaande code verstoort. Daarnaast wordt de stabiliteit van de app verbetert en kunnen fouten vroegtijdig worden gesignaleerd.
