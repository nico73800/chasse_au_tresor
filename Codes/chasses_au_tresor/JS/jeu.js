/**
 * PARTIE CARTE
 */
class Carte {
    carte = document.getElementById("carte");
    x = 10;
    y = 10;
    // message = "";

    constructor() {
        this.initCarte(this.x, this.y, this.carte);
        this.eventHandler();
    }

    // Generation de la table des boutons
    initCarte(x, y, carte) {
        let arr2D = new Array(x);
        for (let i = 0; i < arr2D.length; i++) {
            arr2D[i] = new Array(y);

            for (let j = 0; j < arr2D[i].length; j++) {
                let input = document.createElement("button");
                input.setAttribute("type", "button");
                input.setAttribute("class", "cases");
                input.setAttribute("id", "case");
                input.setAttribute("name", i);
                carte.append(input);
            }
            carte.append(document.createElement("br"));
        }
    }

    // fonction retournant vrai si l'objet cliqué est un boutton 
    getNodeClicked(event) {
        // Récupère le nom du noeud cliqué 
        const button = event.target.nodeName === "BUTTON";
        // Si c'est un bouton on retourne vrai
        if (button) {
            return true;
        }
    }

    // fonction de traitement des événements 
    eventHandler() {
        // on commencer par récupérer la div contenant les boutons
        let wrapper = document.getElementById("carte");

        // On récupère les évents dans cette div
        wrapper.addEventListener("click", (event) => {
            /**
             * Avec la fonction getNodeClicked(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on change 
             * La vlaeur de l'id à "clicked"
             * */
            const isButton = this.getNodeClicked(event);
            if (isButton) {
                event.target.id = "clicked";
                event.target.disabled = true;
            }
        })
    }

    disableMap() {
        let wrapper = document.getElementById("carte"); 
        // Get all buttons with the name 'all' and store in a NodeList called 'buttons'
        let boutons = wrapper.getElementsByTagName("button");
        // let boutons = document.getElementsByName('case');

        // Loop through NodeList and call the click() function on each button
        for(let i = 0; i <= boutons.length; i++) {
            boutons[i].id = "clicked";
            boutons[i].disabled = true;
        }
    }
}

/**
 * PARTIE DES MESSAGES
 */
class Message {
    message = document.getElementById("message");

    constructor() {
        this.initMessage(this.message);
    }

    // Initialisation de la zone des messages
    initMessage(message) {
        let bienvenu = "Bienvenu dans le jeu de la chase au trésor";
        let h3 = document.createElement('h3');
        h3.textContent = bienvenu;
        message.append(h3);
    }
}

class Jeu {
    carte = new Carte();
    message = new Message();
    defaut = 100;
    nbAction = 5;
    tourActuel = 0;

    constructor(defaut, carte, message) {
        defaut = this.defaut;
        carte = this.carte;
        message = this.message;
    }

    // fonction de calcul de tour
    tour(i, carteOLD = this.carte) {

        // On sauvegarde la carte du tour précédent
        let carteNew = carteOLD;

        // Tant qu'on a pas atteint la fin des tours on continue à jouer
        i++;
        return i;
    }

    // fonction de calcul du nombre d'action
    action(i) {
        if (this.actionHandler()) {
            i++;
            return i;
        }
    }

    // fonction de test si un bouton a été cliqué
    getAction(event) {
        const button = event.target.nodeName === "BUTTON";
        if (button) {
            return true;
        }
    }

    // fonction de traitement des actions
    actionHandler() {
        // on commencer par récupérer la div contenant les boutons
        let wrapper = document.getElementById("carte");

        // On récupère les évents dans cette div
        wrapper.addEventListener("click", (event) => {
            /**
             * Avec la fonction getNodeClicked(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on change 
             * La valeur de l'id à "clicked"
             * */
            const isButton = this.getAction(event);
            if (isButton) {
                console.log("ok");
                return true;
            }
        })
    }

    getTour() {
        return this.tourActuel;
    }

    setTour(tourActuel) {
        this.tourActuel = tourActuel;
    }

}

let carte = document.getElementById("carte");
let message = document.getElementById("message");
let jeu = new Jeu(100, carte, message);

console.log("ok2");
i = 0;
j = 0;
while (jeu.tour(i, carte) < 100) {
    if (jeu.action(j) < 5) {
        console.log("ok");
    } else {
        let plateau = new Carte();
        plateau.disableMap();
    }
    console.log("ok");
}