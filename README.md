# chasse_au_tresor
Un jeu de chasse au trésor dans les langages : HTML, CSS, JS

## V1 
1. Début V1 : 
    * A faire :
        - Implémenter les items (fonctions de génération, de message, etc)
        - Génération des items dans la carte 
## V0
### Changements (ordre chornologique : du plus vieux au plus récent) :
1. Mise en place des classes : CARTE et MESSAGE
2. Mise en place des classes : ITEM, OBJETS et PELLE (pas terminées
3. Correction des bugs de CSS / HTML / JS
4. Classe CARTE :
    - Bouton changer en Div , changements mineurs (ch1) :
        * La fonction : "eventHandler(carte) : isButton => isClicked
    - Button => DIV, à changer :
        * La fonction : "getNodeClicked(event) :
            nodeName === "BUTTON" ne marche plus (ch1) : moyen pour ne calculer que les cases
5. Classe CARTE et JEU :
    - Changements dans la fonction "getNodeClicked(event)" :
        * rajout de la ligne permettant de distingué si c'est une case de la grille d'un élément dans la grille et refonctionne
6. Classe JEU et CARTE :
    * Bug : on peut sélectionner deux fois qui a été déjà selectionné
    * Correction temporaire : modifié le CSS pour faire en sorte de bloquer les événements 
    * Correction finale : utilisé le renvoi de la fonction "getAction(event) : renvoie undefined si pas de valeur bonne 

### Reste à faire :
1. Mise en place du fonctionnement des items (V1)
2. Mise en place du fonctionnements du jeu (V2)
