/* 
 Inscription.js
 Tous les éléments de formulaire
 Expressions régulières via une bibliotheque de controles
 */

var tJoursMois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

/**
 * 
 * @returns {init}
 */
function init() {
    console.log("init");
    document.getElementById("btValider").onclick = function() {
        document.getElementById("lblMessage").innerHTML = "";
        var lsMessage = valider();

        if (lsMessage === "") {
            lsMessage = "OK";
            /*
             * AFFICHAGE
             */
            lsMessage = recupererSaisies();
        }
        document.getElementById("lblMessage").innerHTML = lsMessage;
    };
    document.getElementById("btAnnuler").onclick = function() {
        document.getElementById("lblMessage").innerHTML = "";
        reinitialiserFormulaire();
    };
    
    document.getElementById("mois").onchange = function() {
//        document.getElementById("lblMessage").innerHTML = "";
//        reinitialiserFormulaire();
    };

    initListe();

    document.getElementById("chkMdpVisibles").onclick = function() {
        afficherMasquerMDP(document.getElementById("chkMdpVisibles"), document.getElementById("mdp"));
        afficherMasquerMDP(document.getElementById("chkMdpVisibles"), document.getElementById("mdp2"));
    };

    enPeriodeDeTests();
} /// init

/**
 * 
 * @returns {undefined}
 */
function initListe() {

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth();
    var annee = d.getFullYear();

    var tMois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");

    var sOptions = "";

    var tHobbies = ['Théâtre', 'Concert', 'Foot', 'Tennis'];
    for (var i = 0; i < tHobbies.length; i++) {
        sOptions += "<option>" + tHobbies[i] + "</option>";
    }
    document.getElementById("hobbies").innerHTML = sOptions;

    sOptions = "";
    for (var i = 1; i <= tJoursMois[mois]; i++) {
        sOptions += "<option>" + i + "</option>";
    }
    document.getElementById("jours").innerHTML = sOptions;

    sOptions = "";
    for (var i = 0; i < tMois.length; i++) {
        sOptions += "<option>" + tMois[i] + "</option>";
    }
    document.getElementById("mois").innerHTML = sOptions;

    sOptions = "";
    for (var i = 1900; i <= annee; i++) {
        sOptions += "<option>" + i + "</option>";
    }
    document.getElementById("annees").innerHTML = sOptions;

    document.getElementById("jours").value = jour;
    document.getElementById("mois").value = tMois[mois];
    document.getElementById("annees").value = annee;

    var tVilles =
            {
                "75000": "Paris",
                "59000": "Lille",
                "69000": "Lyon",
                "13000": "Marseille",
                "06000": "Nice"
            };

    sOptions = "";
    sOptions += "<option value='0'>Sélectionnez</option>";
    for (var cle in tVilles) {
        sOptions += "<option value='" + cle + "'>" + tVilles[cle] + "</option>";
    }
    document.getElementById("cp").innerHTML = sOptions;
} /// initListe

/**
 * 
 * Fonction réutilisable dans plusieurs contextes
 * 
 * @param {type} chkMDP
 * @param {type} itPwd
 * @returns {undefined}
 */
function afficherMasquerMDP(chkMDP, itPwd) {
    // KO !!!
    //var coche = document.getElementById("chkAfficherMasquerMDP").getAttribute("checked");
    // OK
    var coche = chkMDP.checked;
    console.log("Coché : " + coche);
    console.log("Type : " + itPwd.getAttribute("type"));
    if (coche) {
        itPwd.setAttribute("type", "text");
    }
    else {
        itPwd.setAttribute("type", "password");
    }
} /// afficherMasquerMDP

/**
 * 
 * @returns {undefined}
 */
function reinitialiserFormulaire() {
    //console.log("reinitialiserFormulaire");
    /*
     Nettoyage des zones de saisie, cac et rb
     */
    var tInputText = document.getElementsByTagName("input");
    //console.log(tInputText);
    for (var i = 0; i < tInputText.length; i++) {
        if (tInputText[i].type === "text") {
            tInputText[i].value = "";
        }

        if (tInputText[i].type === "checkbox") {
            tInputText[i].checked = false;
        }
        if (tInputText[i].type === "radio") {
            tInputText[i].checked = false;
        }
    }
    /*
     Deselection des elements de liste
     */
    var tSelect = document.getElementsByTagName("select");
    //console.log(tSelect);
    for (var i = 0; i < tSelect.length; i++) {
        tSelect[i].selectedIndex = -1;
    }

} /// reinitialiserFormulaire

/**
 * 
 * @returns {String}
 */
function valider() {

    var lsMessage = "";
    var lbOK;
    // prenom : lettres, espace, -, '
    lbOK = estNomAvecAccent(document.getElementById("prenom").value);
    if (!lbOK) {
        lsMessage += "<br>Prénom incorrect";
    }
    // nom : lettres, espace, -, 
    lbOK = estNomAvecAccent(document.getElementById("nom").value);
    if (!lbOK) {
        lsMessage += "<br>Nom incorrect";
    }

    // naissance <= date du jour
    // Date(annee, mois, jour, hh, mm, ss)
    console.log("annees : " + document.getElementById("annees").value);
    console.log("mois : " + document.getElementById("mois").selectedIndex);
    console.log("jours : " + document.getElementById("jours").value);
    var dn = new Date(document.getElementById("annees").value, document.getElementById("mois").selectedIndex, document.getElementById("jours").value, 0, 0, 0);
    var d = new Date();
    console.log("now : " + d);
    console.log("naissance : " + dn);
    if (dn > d) {
        lsMessage += "<br>La date de naissance est supérieure à la date du jour !!!";
    }

    // email : er
    lbOK = estEmail(document.getElementById("email").value);
    if (!lbOK) {
        lsMessage += "<br>Email incorrect";
    }
    lbOK = estEmail(document.getElementById("email2").value);
    if (!lbOK) {
        lsMessage += "<br>Email 2 incorrect";
    }
    // Tel : er (avec ou sans préfixe)
    lbOK = estTelephoneFR(document.getElementById("tel").value);
    if (!lbOK) {
        lsMessage += "<br>Téléphone incorrect";
    }
    // mdp : er (>= 6 car et mélange
    lbOK = estMDPFort(document.getElementById("mdp").value);
    if (!lbOK) {
        lsMessage += "<br>MDP incorrect";
    }
    lbOK = estMDPFort(document.getElementById("mdp2").value);
    if (!lbOK) {
        lsMessage += "<br>MDP 2 incorrect";
    }

    console.log("cp index : " + document.getElementById("cp").selectedIndex);
    if (document.getElementById("cp").selectedIndex < 1) {
        lsMessage += "<br>Sélectionnez une ville !!!";
    }

    if (document.getElementById("rbCadre").checked === false && document.getElementById("rbEmploye").checked === false && document.getElementById("rbOuvrier").checked === false) {
        lsMessage += "<br>Sélectionnez une fonction !!!";
    }
    if (document.getElementById("mdp").value !== document.getElementById("mdp2").value) {
        lsMessage += "<br>Les 2 mots de passe ne sont pas identiques !!!";
    }
    if (document.getElementById("email").value !== document.getElementById("email2").value) {
        lsMessage += "<br>Les 2 emails ne sont pas identiques !!!";
    }

    return lsMessage;
} /// valider

/**
 * 
 * @returns {undefined}
 */
function recupererSaisies() {
    var lsMessage = "";

    var jour = document.getElementById("jours").value;
    var mois = document.getElementById("mois").value;
    var annee = document.getElementById("annees").value;

    lsMessage += document.getElementById("prenom").value;
    lsMessage += "<br>" + document.getElementById("nom").value;

    lsMessage += "<br>" + jour + " " + mois + " " + annee;

    lsMessage += "<br>" + document.getElementById("email").value;
    lsMessage += "<br>" + document.getElementById("tel").value;
    lsMessage += "<br>" + document.getElementById("pseudo").value;
    lsMessage += "<br>" + document.getElementById("mdp").value;

    lsMessage += "<br>" + document.getElementById("cp").value;

    // hobbies
    lsMessage += "<br>";
    var hobbies = document.getElementById("hobbies");
    var count = hobbies.length;
    for (var i = 0; i < count; i++) {
        if (hobbies[i].selected) {
            lsMessage += hobbies[i].value + ",";
        }
    }
    lsMessage = lsMessage.substr(0, lsMessage.length - 1);

    if (document.getElementById("chkNewsLetter").checked) {
        lsMessage += "<br>Vous recevrez la News Letter";
    } else {
        lsMessage += "<br>Pas de News Letter";
    }

    if (document.getElementById("rbCadre").checked) {
        lsMessage += "<br>Vous êtes cadre";
    }
    if (document.getElementById("rbEmploye").checked) {
        lsMessage += "<br>Vous êtes employé(e)";
    }
    if (document.getElementById("rbOuvrier").checked) {
        lsMessage += "<br>Vous êtes ouvrier(e)";
    }

    return lsMessage;
} /// recupererSaisies

/**
 * 
 * @returns {undefined}
 */
function enPeriodeDeTests() {
    document.getElementById("prenom").value = "Max";
    document.getElementById("nom").value = "Mendy";
    document.getElementById("email").value = "mamen484@gmail.com";
    document.getElementById("email2").value = "mamen484@gmail.com";
    document.getElementById("tel").value = "06-51-41-75-20";
    document.getElementById("mdp").value = "Mdp123";
    document.getElementById("mdp2").value = "Mdp123";
    document.getElementById("pseudo").value = "Mamen";

    document.getElementById("cp").value = "75014";
    document.getElementById("hobbies").value = "Tennis";
    document.getElementById("rbCadre").checked = true;
} /// enPeriodeDeTests

// -----------------
window.onload = init;
