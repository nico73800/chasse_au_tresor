# chasse_au_tresor
Un jeu de chasse au trésor dans les langages : HTML, CSS, JS

## V0
### Changements (ordre chornologique : du plus vieux au plus récent) :
1. Mise en place des classes : CARTE et MESSAGE
2. Mise en place des classes : ITEM, OBJETS et PELLE (pas terminées)
3. Correction des bugs de CSS / HTML / JS
4. Classe CARTE :
- Bouton changer en Div , changements mineurs (ch1) :
    * La fonction : "eventHandler(carte) : isButton => isClicked
- Button => DIV, à changer :
    * La fonction : "getNodeClicked(event) :
        |> nodeName === "BUTTON" ne marche plus (ch1) : moyen pour ne calculer que les cases
5. Classe CARTE et JEU : 
- Changements dans la fonction "getNodeClicked(event)" :
    * rajout de la ligne permettant de distingué si c'est une case de la grille d'un élément dans la grille  
