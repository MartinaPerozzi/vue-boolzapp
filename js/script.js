// Variabili globali
// Variabile per il tempo
let dt = luxon.DateTime;

// Configurazione Vue
const app = Vue.createApp({
    data: function () {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        },
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        },

                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Va bene, stasera la sento',
                            status: 'received'
                        },

                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            text: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        },

                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        },

                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            text: 'OK!!',
                            status: 'received'
                        },

                    ],
                },
            ],
            // variabile per risposta
            myMessage: "",

            // Setto un indice per il parametro index
            activeContact: 0,
            // Ricerca contatto- per collegare l'input a un elemento reattivo con il v-model
            search: "",
            // Night mood
            night: false,
            // Variabile per menu a tendina
            activeMessage: {
                index: 0,
                open: false,
            }

        }

    },

    methods: {
        // Crea una funzione con una copia dell'oggetto vuoto che ho già creato in "data" e che è reattivo, collega la proprietà text dell'oggetto all'input di testo con v-model
        addMessage(index) {
            let now = dt
                .now()
                .toLocaleString(dt.DATETIME_SHORT);

            const myMessageCopia = {
                text: this.myMessage,
                status: 'sent',
                date: now,
            }
            // Per non mandare messaggi vuoti
            if (myMessageCopia.text.length > 0) {
                // Pusha il nuovo oggetto così ottenuto dentro all'array messages in contacts- ci entro con l'index-
                // questo pusherà il nuovo elemento che verrà preso dal v-for applicato alla sezione contatti aggiungendolo alla chat.
                this.contacts[index].messages.push(myMessageCopia);
                // Riparti da bianco
                this.myMessage = "";
                // Funzione risposta automatica
                this.answerMess(index);
            }

        },
        // *****************************************
        // Vai alla chat/ metodo Thumbnails
        goToContactChat(index) {
            this.activeContact = index;
        },

        // *****************************************
        // Setta una risposta automatica ogni secondo, da attivare all'invio del messaggio
        answerMess(index) {
            let now = dt
                .now()
                .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);

            setTimeout(() => {
                const answer = {
                    text: "Ok! :)",
                    status: 'received',
                    date: now,
                }
                // Pusha la risposta dentro all'array messages in contacts - per ogni contatto- ci entro con parametro index-
                this.contacts[index].messages.push(answer);

                now = dt
                    .now()
                    .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
            }, 1000);
        },

        // *****************************************
        // Ultimo accesso
        lastAccess(index) {
            // Variabile per prendere ultimo elemento di un array (in questo caso ultimo oggetto- quindi lunghezza massima delle cose contenute nell'array messages-ovvero messages.length- -1)
            let lastmessage = this.contacts[index].messages.length - 1;
            // Controllo che non mi dia errore arrivati all'ultimo mex
            if (lastmessage > 0) {
                return this.contacts[index].messages[lastmessage].date;
            }
            // del contatto corrente che starai ciclando nel for prendimi per ognuno l'ultima proprietà "data" dell'ultimo oggetto "messaggio".
        },
        // *****************************************
        // Ultimo messaggio
        lastMessage(index) {
            let lastmessageSend = this.contacts[index].messages.length - 1;
            if (lastmessageSend > 0) {
                return this.contacts[index].messages[lastmessageSend].text;
            }
            // del contatto corrente che starai ciclando nel for prendimi per ognuno l'ultima proprietà "data" dell'ultimo oggetto "messaggio".
        },

        // *****************************************
        // Apri tendina MILESTONE 5- clickedindex è l'index del v-for
        messageMenu(clickedindex) {
            if (clickedindex == this.activeMessage.index) {
                // creo un toggle
                this.activeMessage.open = !this.activeMessage.open;
            } else {
                this.activeMessage.index = clickedindex;
                this.activeMessage.open = true;
            }
        },

        // *****************************************
        // Elimina messaggio
        deleteMessage(index) {
            this.contacts[this.activeContact].messages.splice(index, 1);
        },
    },

});
app.mount("#root");
