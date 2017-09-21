/* 
 * MenuHorizontal.js
 */

var menu = document.getElementById("menu");

/**
 * 
 * @returns {undefined}
 */
function init() {
    var tItems = ["Accueil", "Authentification", "Inscription", "Diaporama", "Calendrier"];
    viderMenu();
    remplirMenu(tItems);
} /// init

/**
 * 
 * @param {type} tItems
 * @returns {undefined}
 */
function remplirMenu(tItems) {
    
    for (var i = 0; i < tItems.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.innerHTML = tItems[i];
        a.setAttribute("href",".../html/" + tItems[i] + ".html");
        //li.innerHTML = tItems[i];
        li.appendChild(a);
        document.getElementById("listeItems").appendChild(li);
        var li = document.createElement("li");
        li.innerHTML = " | ";
        document.getElementById("listeItems").appendChild(li);
    }
} /// remplirMenu

/**
 * 
 * @returns {undefined}
 */
function viderMenu() {
    var listeItems = document.getElementById("listeItems");
    while (listeItems.firstChild) {
        listeItems.removeChild(listeItems.firstChild);
    }
} /// viderMenu

window.onload = init;





