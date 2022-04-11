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
        this.eventHandler(this.carte);
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

    // fonction de traitement des événements 
    eventHandler(carte) {
        // on commencer par récupérer la div contenant les boutons
        // let  = document.getElementById("carte");

        // On récupère les évents dans cette div
        carte.addEventListener("click", (event) => {
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

    // fonction retournant vrai si l'objet cliqué est un boutton 
    getNodeClicked(event) {
        // Récupère le nom du noeud cliqué 
        const button = event.target.nodeName === "BUTTON";
        // Si c'est un bouton on retourne vrai
        if (button) {
            return true;
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
    nbTourdefaut = 100;
    nbActionDefaut = 5;

    constructor(nbTourdefaut = this.nbTourdefaut, nbActionDefaut = this.nbActionDefaut, carte = this.carte, message = this.message) {
        this.jeu(nbActionDefaut, nbTourdefaut);
    }

    jeu(nbActDef, defautNoTour) {
        let noTour = 0;
        console.log(noTour);
        if (noTour < defautNoTour) {
            noTour++;
            this.tour(nbActDef);
            console.log(noTour);
        }
    }

    // fonction de tour
    tour(nbActs, carteOLD = this.carte) {
        let i = 0;
        // On sauvegarde la carte du tour précédent
        let carteNew = carteOLD;
        
        let carte = document.getElementById("carte");
        // On récupère les évents dans l'élément "carte"
        carte.addEventListener("click", (event) => {
            if (i < nbActs) {
            /**
             * Avec la fonction getAction(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on change 
             * La valeur de l'id à "clicked"
             **/
                const isButton = this.getAction(event);
                if (isButton) {
                    i++;
                    console.log(i);
                }
            } else {
                this.disableMap();
            }
        })
    }

    // fonction de calcul du nombre d'action
    // action(act) {
    //     let carte = document.getElementById("carte");
    //     if (this.actionHandler(carte)) {
    //         return act + 1;
    //     }
    // }

    // fonction de traitement des actions
    actionHandler() {
        let carte = document.getElementById("carte");
        // On récupère les évents dans l'élément "carte"
        carte.addEventListener("click", (event) => {
        /**
         * Avec la fonction getAction(event)
         * On récupère ce qui a été cliqué
         * Si c'est un bouton alors on change 
         * La valeur de l'id à "clicked"
         * */
            const isButton = this.getAction(event);
            if (isButton) {
                return true;
            }
        })
    }

    // fonction de test si un bouton a été cliqué
    getAction(event) {
        const button = event.target.nodeName === "BUTTON";
        if (button) {
            return true;
        }
    }

    disableMap() {
        let carte = document.getElementById("carte"); 

        // On récupère la collection des boutons
        let collectionBtn = carte.getElementsByTagName("button");
        console.log(collectionBtn);
        // Qu'on affecte chacun à element de l'arrêt 
        let boutons = new Array();
        for (const bouton of collectionBtn) {
            boutons = bouton;
        }

        // let boutons = document.getElementsByName('case');

        // On boucle sur l'arrêt des boutons 
        for(let i = 0; i <= boutons.length; i++) {
            boutons[i].id = "clicked";
            boutons[i].disabled = true;
        }
    }

    activateMap() {
        let carte = document.getElementById("carte"); 
  
        // On récupère la collection des boutons
        let collectionBtn = carte.getElementsByTagName("button");
        
        // Qu'on affecte chacun à element de l'arrêt 
        let boutons = new Array();
        for (const bouton of collectionBtn) {
            boutons += bouton;
        }

        // let boutons = document.getElementsByName('case');

        // On boucle sur l'arrêt des boutons 
        for(let i = 0; i <= boutons.length; i++) {
            boutons[i].id = "case";
            boutons[i].disabled = false;
        }
    }

}

// let carte = document.getElementById("carte");
// let message = document.getElementById("message");

// let plateau = new Carte();
// let message = new Message();
let jeu = new Jeu(100,5);