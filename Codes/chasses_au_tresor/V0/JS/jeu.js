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
            let ligne = document.createElement("div");
            ligne.setAttribute("class", "row");
            ligne.innerHTML = "";

            for (let j = 0; j < arr2D[i].length; j++) {
                let input = document.createElement("div");
                input.setAttribute("class", "cases");
                input.setAttribute("id", "case" + j);
                // input.setAttribute("id", "case" + j);
                input.setAttribute("name", i+""+j);
                ligne.innerHTML = ligne.innerHTML + input.outerHTML;
            }
            carte.append(ligne);
            // carte.append(document.createElement("br"));
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
            const isClicked = this.getNodeClicked(event);
            if (isClicked) {
                event.target.id = "clicked";
                event.target.disabled = true;
            }
        })
    }

    // fonction retournant vrai si l'objet cliqué est un boutton
    getNodeClicked(event) {
        // Récupère le nom du noeud cliqué
        const button = event.target.nodeName === "DIV";
        // Si c'est un bouton :
        if (button) {
            // Et si l'élément cliqué à un certain nom de class 
            if (event.target.className === "cases") {
                return true;
            }
        }
    }
}

/**
 * PARTIE DES MESSAGES
 */
class Message {
    message = document.getElementById("message");

    constructor() {

    }

    // Initialisation de la zone des messages
    initMessage() {
        let message = document.getElementById("message");
        let bienvenu = "Bienvenu dans le jeu de la chase au trésor";
        let h3 = document.createElement('h3');
        h3.textContent = bienvenu;
        message.append(h3);
    }

    ajoutMessage(contenu) {
        let message = document.getElementById("message");
        let p = document.createElement("p");
        p.textContent = contenu;
        message.append(p);
    }
}

/**
 * PARTIE DES ITEMS
 */

 class Item {
    nom = "";

    // Enumeration des effet
    effet = { MALUS: 1, BONUS: 0 };

    constructor(nom, effet) {
        this.nom = nom;
        this.effet = effet;
    }

    getNom() {
        return this.nom;
    }

    setNom(nom) {
        this.nom = nom;
    }

    getEffet() {
        return this.effet;
    }

    setEffet(effet) {
        if (effet != this.effet.BONUS && effet != this.effet.MALUS) {
            let message = new Message();
            message.ajoutMessage("Mauvaise valeur saisie, valeur par défaut : malus");
            this.effet = this.effet.MALUS;
        }
        else {
            this.effet = effet;
        }
    }
}

/**
 * PARTIE ITEM : CLASSE FILLE OBJET
 */

class Objet extends Item {
    nom = "";

    // Enumeration des effet
    effet = { MALUS: 0, BONUS: 1 };

    // Enumeration des actions
    action = { CREUSE: 0, COUPE: 1, EXPLOSE: 2, EMPOISONNE: 3,};
    constructor(nom, effet, action) {
        super(nom, effet, action);
        this.nom = nom;
        this.effet = effet;
        this.action = action;
    }
}

/**
 * PARTIE OBJET : CLASSE FILLE PELLE
 */

class Pelle extends Objet {
    nom = "Pelle";
    effet = "bonus";
    action = { CREUSE: 0, COUPE: 1, EXPLOSE: 2, EMPOISONNE: 3,};
    constructor(nom, effet, action) {
        super(nom, effet, action);
        this.nom = nom;
        this.effet = effet;
        this.action = action;
    }
}

/**
 * PARTIE DU JEU
 */
class Jeu {
    carte = new Carte();
    message = new Message();
    nbTourdefaut = 100;
    nbActionDefaut = 5;

    constructor(nbTourdefaut = this.nbTourdefaut, nbActionDefaut = this.nbActionDefaut, carte = this.carte, message = this.message) {
        this.jeu(nbActionDefaut, nbTourdefaut);
    }

    /**
     * 
     * @param {*} nbActDef : nombre d'action par défaut par jeu
     * @param {*} defautNoTour : nombre de tour par défaut par jeu 
     */
    jeu(nbActDef, defautNoTour) {
        this.message.initMessage();
        let noTour = 0;
        console.log(noTour);
        while (noTour < defautNoTour) {
            noTour++;
            this.tour(nbActDef);
            console.log(noTour);
        }
    }

    /**
     * Fonction de tour
     * @param {*} nbActs : nombre d'actions possible
     * @param {*} carteOLD : pas utilisé encore 
     * @returns {*} Boolean 
     */
    tour(nbActs, carteOLD = this.carte) {
        let i = 0;
        // On sauvegarde la carte du tour précédent
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
                    return false;
                }
            } else {
                this.disableMap();
                i = 0;
                this.finPartie();
            }
        })
    }

    /**
     * Fonction de fin de partie
     */
    finPartie() {
        // On réactive l'ensemble de la carte
        this.activateMap();
    }


    /**
     *  fonction de traitement des actions
     */
    actionHandler() {
        let carte = document.getElementById("carte");
        // On récupère les évents dans l'élément "carte"
        carte.addEventListener("click", (event) => {
            /**
             * Avec la fonction getAction(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on change
             * La valeur de l'id à "clicked"
             **/
            const isButton = this.getAction(event);
            if (isButton) {
                return 1;
            }
        })
    }

    /**
     * fonction de test si un bouton a été cliqué
     * @param {*} event : type événément
     */
    getAction(event) {
        // Récupère le nom du noeud cliqué
        const button = event.target.nodeName === "DIV";
        // Si c'est un bouton :
        if (button) {
            // Et Si l'élément cliqué à un certain nom de class 
            if (event.target.className === "cases") {
                return true;
            }
        }

    }

    /**
     * Fonction de désactivation de la carte
     */
    disableMap() {
        // On récupère l'élément carte
        let carte = document.getElementById("carte");

        // On récupère la collection des div de classe "cases" de l'élément carte
        let collectionBtn = carte.getElementsByClassName("cases");

        // Puis on affecte chaque élément de la collection
        // A un tableau de boutons
        let boutons = new Array();
        let i = 0;
        for (const bouton of collectionBtn) {
            boutons[i] = bouton;
            i++;
        }

        // Puis on fait la boucle pour désactiver les boutons
        for (let i = 0; i < boutons.length; i++) {
            boutons[i].id = "clicked";
            boutons[i].disabled = true;
        }
    }

    /**
     * Fonction de réactivation de la carte
     */
    activateMap() {
        // On récupère l'élément carte
        let carte = document.getElementById("carte");

        // On récupère la collection des div de classe "cases" de l'élément carte
        let collectionBtn = carte.getElementsByClassName("cases");

        // On créer un tableau 
        let boutons = new Array();
        // Et on affecte chaque élément de la collection
        let i = 0;
        for (const bouton of collectionBtn) {
            boutons[i] = bouton;
            i++;
        }

        // Puis on fait la boucle pour activer les boutons
        for (let i = 0; i < boutons.length; i++) {
            boutons[i].id = "case";
            boutons[i].disabled = false;
        }
    }
}

// let carte = document.getElementById("carte");
// let message = document.getElementById("message");

// let plateau = new Carte();
// let message = new Message();
let jeu = new Jeu(100, 5);

let item = new Item("banana", "malus");
item.setEffet("blblbl");