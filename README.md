# Velkommen til Socademy!
En webapplikasjon for studenter, hvor man kan opprette innlegg og arrangementer! 

## For å starte prosjektet:
1. Start med å skrive `cd socademy` i terminalen for å komme til riktig mappe
2. Installer alle avhengighetene med `pnpm install`.
3. Kjør `pnpm db:migrate:dev` for å lage en lokal database med alle tabellene
4. Opprett en `.dev.vars`-fil inni `socademy` hvor du legger inn:

   ```
   BETTER_AUTH_SECRET=en-lang-tilfeldig-streng
   BETTER_AUTH_URL=http://localhost:5173
   ```
   Bruk din egen tilfeldige streng som secret (vår får dere ikke vite 😉).

5. Så kan du kjøre `pnpm dev` og åpne adressen som vises i terminalen!
Og voila! Nå har du kommet inn i applikasjonen vår 🎉

## Slik bruker du appen: 
<img width="1512" height="828" alt="innloggingssiden" src="https://github.com/user-attachments/assets/d52b796c-c090-43bf-9f56-b314d1ecbff2" />

Trykk på `Registrer deg her` for å opprette en bruker 

OBS! Ettersom dette er en applikasjon for studenter, er det kun `@hiof.no` e-postadresser som kan brukes. 
<img width="1511" height="828" alt="registreringssiden" src="https://github.com/user-attachments/assets/0baa5ec6-65df-41a6-b1a7-beacf195ba09" />

Når du trykker på `Registrer` blir du sendt til hovedsiden vår. Dette er en kalender som viser en oversikt over alle arrangementene i måneden. Som standard vises inneværende måned. 
<img width="1506" height="827" alt="hjem-/kalenderside" src="https://github.com/user-attachments/assets/7705ecfa-d643-4072-8c9e-2fbf4685039d" />

Trykk på `+ Nytt event` for å legge inn ditt første arrangement! 
<img width="1512" height="827" alt="modal for å opprette et arrangement" src="https://github.com/user-attachments/assets/de530177-7f45-430c-bd48-42931da1f5dd" />
Når du har lagret arrangementet ditt, blir den markert med en prikk på den dagen du holder arrangement. 
<img width="1512" height="826" alt="hjem-/kalenderside hvor det opprettede arrangementet er markert" src="https://github.com/user-attachments/assets/20a45b46-9474-41bd-b997-fe5deee0fa79" />
Trykker du på denne dagen, får du opp alle arrangementene som skjer på den dagen. 
<img width="1512" height="825" alt="hjem-/kalenderside med visning av alle arrangementene som skjer 11/11/2026" src="https://github.com/user-attachments/assets/5eda116f-be6a-4c66-a49b-299633a28406" />

Nå kan du gå videre til `Forum` i menyen til venstre!
Dette er en side der du kan legge ut dine egne tanker, og lese hva dine medstudenter har å si. Her kan du også opprette et arrangement gjennom et innlegg!
<img width="1512" height="826" alt="forumsiden" src="https://github.com/user-attachments/assets/b9935ef9-67ec-4e42-afef-5f7370ceaaaa" />
Dersom du ser et innlegg du liker, kan du til og med gi fra deg en like ❤️ 
<img width="1512" height="829" alt="en modal av en annen brukers innlegg, hvor man kan trykke på hjerteikonet for å like eller unlike innlegget" src="https://github.com/user-attachments/assets/26d63c29-da76-474f-8196-5422722a6346" />
Du kan også redigere og slette innleggene dine med `Rediger` og `Slett`. 
<img width="1512" height="827" alt="en modal av ditt eget innlegg hvor du kan redigere eller slette innlegget" src="https://github.com/user-attachments/assets/928e33e2-4a2c-4991-9e5d-2e847aa4585f" />

