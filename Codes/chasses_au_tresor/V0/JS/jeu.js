/**
 * PARTIE CARTE
 */
class Carte {
    carte = document.getElementById("carte");
    x = 10;
    y = 10;
    ids = [];
    // message = "";

    constructor() {
        this.initCarte(this.x, this.y, this.carte);
        this.eventHandler(this.carte);
    }

    /**
     * Fonction de génération du tableau de la carte
     * @param {Int8Array} x
     * @param {Int8Array} y
     * @param {HTMLElement} carte
     */
    initCarte(x, y, carte) {
        // On instancie un tableau de taille X
        let arr2D = new Array(x);

        // Pour chaque case de ce tableau
        for (let i = 0; i < arr2D.length; i++) {
            // On instancie une colonne de taille Y
            arr2D[i] = new Array(y);

            // On créer la ligne de div
            let ligne = document.createElement("div");
            ligne.setAttribute("class", "row");
            ligne.innerHTML = "";

            // Pour chaque ligne
            for (let j = 0; j < arr2D[i].length; j++) {
                // On ajoute les cases avec leur id, leur classe, etc.
                let input = document.createElement("div");
                input.setAttribute("class", "cases");
                input.setAttribute("id", "cases" + i + "" + j);
                input.setAttribute("name", "cases" + i + "" + j);
                ligne.innerHTML = ligne.innerHTML + input.outerHTML;
            }
            // Puis on ajoute la ligne à l'élément HTML "carte"
            carte.append(ligne);
            // carte.append(document.createElement("br"));
        }
    }

    /**
     * Fonction de génération du tableau de la carte
     * @param {Int8Array} x
     * @param {Int8Array} y
     * @param {HTMLElement} carte
     */
    regenCarte(x, y, carte) {
        carte.remove();
        let main = document.getElementById("main");
        let carte2 = document.createElement("div");
        carte2.setAttribute("id", "carte");
        main.append(carte2);
        this.initCarte(x,y, carte2);
        
    }

    /**
     * Fonction de gestion des clicks sur la carte
     * @param {HTMLElement} carte
     */
    eventHandler(carte) {
        // on commencer par récupérer la div contenant les boutons
        // let  = document.getElementById("carte");

        // On récupère les évents dans cette div
        carte.addEventListener("click", (event) => {
            /**
             * Avec la fonction getNodeClicked(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on change
             * La valeur de l'id à "clicked"
             * */
            const isClicked = this.getNodeClicked(event);
            if (isClicked) {
                event.target.id = "clicked";
                // event.target.className = oldId;
                event.target.disabled = true;
            }
        })
    }

    /**
     * Fonction retournant vrai si l'objet cliqué est un boutton
     * @param {Event} event
     * @returns Boolean
     */
    getNodeClicked(event) {
        // Récupère le nom du noeud cliqué
        // const button = event.target.nodeName === "DIV";
        // Si c'est un bouton :
        // if (button) {
        // Si l'élément cliqué à un certain nom de class et d'id
        let cases = event.target.className;
        let oldId = event.target.id;
        if ("cases" === cases && oldId !== "clicked") {
            this.ajoutAncienID(oldId);
            return true;
        }
        // }
    }

    ajoutAncienID(id) {
        this.ids.push(id);
    }

    getAllID() {
        if (this.ids.length > 0) {
            for (let i = 0; i <= this.ids.length; i++) {
                console.log(this.ids[i]);
            }   
        }
    }

    getID(index) {
        let value;
        for (let i = 0; i < this.ids.length; i++) {
            if (index === this.ids[i]) {
                value = true;
                console.log(this.ids[i]);
                console.log(index);
            } else {
                value = false;
            }
        }
        return value;
    }
}

/**
 * PARTIE DES MESSAGES
 */
class Message {
    message = document.getElementById("message");

    constructor() {
        this.initMessage();
    }

    /**
     * Initialisation de la zone des messages
     */
    initMessage() {
        let message = document.getElementById("message");
        let bienvenu = "Bienvenu dans le jeu de la chase au trésor";
        let h3 = document.createElement('h3');
        h3.textContent = bienvenu;
        message.append(h3);
    }

    /**
     * Fonction d'ajout des messages à la zone des messages
     * @param {String} contenu : Chaine de caractères
     */
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
    Zmessage = document.getElementById("message");
    // message = new Message();
    nom = "";

    // Enumeration des effet
    effet = { MALUS: 1, BONUS: 0 };

    constructor(nom, effet) {
        this.nom = nom;
        this.effet = effet;
    }

    /**
     * Fonction pour avoir le nom de l'item
     * @returns {String} nom
     */
    getNom() {
        return this.nom;
    }

    /**
     * Fonction pour set le nom de l'item
     * @param {String} nom
     */
    setNom(nom) {
        this.nom = nom;
    }

    /**
     *
     * @returns {effet}
     */
    getEffet() {
        return this.effet;
    }

    /**
     * Fonction de paramétrage de l'effet
     * @param {String} effet
     */
    setEffet(effet) {
        if (effet != toString(this.effet.BONUS) && effet != toString(this.effet.MALUS)) {
            // let message = new Message();

            // On utilise la propriété "prototype" pour utiliser la fonction ajoutMessage(contenu)
            Message.prototype.ajoutMessage("Mauvaise valeur saisie, valeur par défaut : malus");
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
    nom = { PELLE: 0, HACHE: 1 };

    // Enumeration des effet
    effet = Item.prototype.effet.BONUS;

    // Enumeration des actions
    action = { CREUSE: 0, COUPE: 1 };
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
    effet = Objet.prototype.effet.BONUS;
    action = { CREUSE: 0, COUPE: 1, EXPLOSE: 2, EMPOISONNE: 3,};
    constructor(nom = "Pelle", effet = Objet.prototype.effet.BONUS, action = this.action.CREUSE) {
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

    constructor(nbTourdefaut = this.nbTourdefaut, nbActionDefaut = this.nbActionDefaut) {
        this.jeu(nbActionDefaut, nbTourdefaut);
        this.carte.getAllID();
    }

    /**
     *
     * @param {Int16Array} nbActDef : nombre d'action par défaut par jeu
     * @param {Int16Array} defautNoTour : nombre de tour par défaut par jeu
     */
    jeu(nbActDef, defautNoTour) {
        let noTour = 0;
        console.log(noTour);
        // while (noTour < defautNoTour) {
            noTour++;
            this.tour(nbActDef);
            console.log(noTour);
        // }
    }

    /**
     * Fonction de tour
     * @param {Int8Array} nbActs : nombre d'actions possible
     * @param {Carte} carteOLD : pas utilisé encore
     * @returns {Boolean}
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
                const isClicked = this.getAction(event);
                console.log(isClicked);
                if (isClicked) {
                    i++;
                    console.log(i);
                    return false;
                }
            } else {
                this.disableMap();
                i = 0;
                console.log(i);
                this.finPartie();
                console.log("ok");
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
     * fonction de traitement des actions
     * @returns {Int8Array} 1
     */
    actionHandler() {
        let carte = document.getElementById("carte");
        // On récupère les évents dans l'élément "carte"
        carte.addEventListener("click", (event) => {
            /**
             * Avec la fonction getAction(event)
             * On récupère ce qui a été cliqué
             * Si c'est un bouton alors on retourne 1
             **/
            const isButton = this.getAction(event);
            if (isButton) {
                return 1;
            }
        })
    }

    /**
     * fonction de test si un bouton a déjà été cliqué
     * @param {Event} event
     * @returns {Boolean} true/false
     */
    getAction(event) {
        // Récupère le nom du noeud cliqué
        // const button = event.target.nodeName === "DIV";
        // Si c'est un bouton :
        // if (button && (event.target.className === "cases" && event.target.id !== clicked)) {

        // Si l'élément cliqué à un certain nom de class
        let cases = event.target.className;
        let id = event.target.id;
        if (cases === "cases") {
            if (!this.carte.getID(event.target.getAttribute("name")) && id == "clicked") {
                /**
                 * Peut-être utilé la fonction abort() du package AbortController() 
                 * Pour éviter que la case soit réutilisable (voir lien suivant)
                 * https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
                 * 
                 */
                console.log("blep");
                return false;
            } else {
                console.log(event.target.id);
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
            // boutons[i].disabled = true;
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

    let j = 0;
    let k = 0;
        // Puis on fait la boucle pour remettre les ids des cases avec les valeurs j et k 
        for (let i = 0; i < boutons.length; i++) {
            if (j > 9) {
                j = 0;
                k++;
                boutons[i].id = "cases" + k + "" + j;
            } else {
                boutons[i].id = "cases" + k + "" + j;
            }
            console.log(boutons[i].id);
            j++;            
        }
            // boutons[i].disabled = false;
    }
}

// let carte = document.getElementById("carte");
// let message = document.getElementById("message");

// let plateau = new Carte();
// let message = new Message();
let jeu = new Jeu(100, 5);

let item = new Item("banana", "malus");
item.setEffet("blblbl");