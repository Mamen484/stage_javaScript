/* 
 * Authentification.js
 */

/**
 *
 * @returns {undefined}
 */
function init() {
    console.log("init");
    /*
     BOUTON VALIDATION
     */
    document.getElementById("btValider").onclick = valider;

    /*
     CAC MDP
     */
    document.getElementById("chkAfficherMasquerMDP").onclick = afficherMasquerMDP;

//    document.getElementById("identifiant").on("blur", priseFocusEmail());
//    document.getElementById("mdp").on("blur", priseFocusPWD());

    /*
     CAC SE SOUVENIR DE MOI
     */
    document.getElementById("chkSeSouvenirDeMoi").onclick = creerCookie;

    /*
     En TEST
     */
    //initChampsEnTest();

} /// init


/**
 * 
 * @returns {undefined}
 */
function valider() {
    var lsMessage = "";
    document.getElementById("lblMessage").style.color = "black";
    console.log("btValider - click");
    var lbOK = controlerSaisies();
    if (lbOK) {
        var lsUserOK = "pascal";
        var lsMdpOK = "mdp123";
        if (document.getElementById("identifiant").value === lsUserOK && document.getElementById("mdp").value === lsMdpOK) {
            lsMessage = "Vous êtes authentifié";
            window.location.href = "../html/Catalogue.html";
        }
        else {
            lsMessage = "Vous n'êtes pas authentifié";
        }
    } else {
        lsMessage = "Toutes les saisies sont obligatoires";
        document.getElementById("lblMessage").style.color = "red";
    }
    document.getElementById("lblMessage").innerHTML = lsMessage;
} /// valider

/**
 *
 * @returns {undefined}
 */
function afficherMasquerMDP() {
    // KO !!!
    //var coche = document.getElementById("chkAfficherMasquerMDP").getAttribute("checked");
    // OK
    var coche = document.getElementById("chkAfficherMasquerMDP").checked;
    console.log("Coché : " + coche);
    console.log("Type : " + document.getElementById("mdp").getAttribute("type"));
    if (coche) {
        document.getElementById("mdp").setAttribute("type", "text");
    }
    else {
        document.getElementById("mdp").setAttribute("type", "password");
    }
} /// afficherMasquerMDP

/**
 *
 * @returns {undefined}
 */
function controlerSaisies() {
    console.log("controlerSaisies");

    var lbOK = true;
    if (document.getElementById("identifiant").value === "" || document.getElementById("mdp").value === "") {
        lbOK = false;
    }
    console.log(lbOK);
    return lbOK;
} /// controlerSaisies


/**
 * 
 * @returns {undefined}
 */
function creerCookie() {
    var lsMessage = "";
    console.log("creerCookie");
    var coche = document.getElementById("chkSeSouvenirDeMoi").checked;
    console.log(coche);
    if (coche) {
        console.log("Cook créé");
        var dExpires = new Date();
        dExpires.setYear(dExpires.getFullYear() + 1);
        document.cookie = "identifiant=" + document.getElementById("identifiant").value + "; expires=" + dExpires.toGMTString();
        document.cookie = "mdp=" + document.getElementById("mdp").value + "; expires=" + dExpires.toGMTString();
        lsMessage = "Mémorisation enregistrée";
    }
    else {
        // Supprimer le cookie (date antérieure)
        console.log("Cook détruit");
        var dExpires = new Date();
        dExpires.setYear(2000);
        document.cookie = "identifiant=" + document.getElementById("identifiant").value + "; expires=" + dExpires.toGMTString();
        document.cookie = "mdp=" + document.getElementById("mdp").value + "; expires=" + dExpires.toGMTString();
        lsMessage = "Mémorisation détruite";
    }
    document.getElementById("lblMessage").innerHTML = lsMessage;
} /// creerCookie

/**
 *
 * @returns {undefined}
 */
function initChampsEnTest() {
    document.getElementById("identifiant").value = "Mamen";
    document.getElementById("mdp").value = "Mdp123";
} /// initChampsEnTest

// -----------------
window.onload = init;
