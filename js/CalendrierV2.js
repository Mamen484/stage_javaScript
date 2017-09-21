/*
 * CalendriersV2.js
 * Juste le calendrier d'une annee !
 * Avec le nom du jour
 * Utilisation de Date()
 * En 2000 le 1er janvier est un samedi
 * En 2014 le 1er janvier est un mercredi
 */

var titre;
var listeAnnee;
var calendrier;

/**
 * 
 * @param {type} aiAnnee
 * @returns {undefined}
 */
function estBissexile(aiAnnee) {
    var lbEstBissextile = false;
    if (((aiAnnee % 4 === 0) && (aiAnnee % 100 !== 0)) || (aiAnnee % 400 === 0)) {
        lbEstBissextile = true;
    }
    return lbEstBissextile;
} /// estBissexile

/**
 * 
 * Renvoie le numero du jour dans la semaine
 * 
 * @param {type} aiAnnee
 * @returns {unresolved}
 */
function obtenirPremierJourDeLAnnee(aiAnnee) {
    var liJour1erJanvier;
    var date1erJanvier = new Date(aiAnnee + "/01/01");
    liJour1erJanvier = date1erJanvier.getDay();
    // 0 = dimanche, 1 = lundi ...
    console.log(liJour1erJanvier);
    return liJour1erJanvier;
} /// obtenirPremierJourDeLAnnee

/**
 * 
 * jour commence a 1
 * mois commence a 0
 * annee 
 * 
 * @param {type} aiJour
 * @param {type} aiMois
 * @param {type} aiAnnee
 * @returns {Number}
 */
function obtenirQuantiemeAnnee(aiJour, aiMois, aiAnnee) {
    var liQuantiemeAnnee = aiJour;
    var tJoursMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (estBissexile(aiAnnee)) {
        tJoursMois[1] = 29;
    }
    for (var i = 0; i < aiMois; i++) {
        liQuantiemeAnnee += tJoursMois[i];
    }

    return liQuantiemeAnnee;
} /// obtenirQuantiemeAnnee

/**
 * 
 * @param {type} aiAnnee
 * @returns {String}
 */
function obtenirCalendrier(aiAnnee) {
    // Declarations
    var tJoursMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var tNomsMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var tNomsJours = ["DI", "lu", "Ma", "Me", "Je", "Ve", "SA"];
    var lsNomDuMois;
    var lsCalendrier = "";
    var lsEstBissextile = "L'année n'est pas bissextile !";
    var liQuantiemeAnnee = 1;
    var liJourSemaine;
    var lsJourSemaine;
    var dateDuJour;
    var liQuantiemeDuJour;

    dateDuJour = new Date();
    // getDay() : jour dans la semaine (de 0..6)
    // getDate() : jour dans le  mois (quantieme : 1..31)
    liQuantiemeDuJour = obtenirQuantiemeAnnee(dateDuJour.getDate(), dateDuJour.getMonth(), dateDuJour.getFullYear());
    console.log("Quantième : " + liQuantiemeDuJour);
    //liQuantiemeDuJour = dateDuJour.getDate();

    // Si bissextile
    if (estBissexile(aiAnnee)) {
        tJoursMois[1] = 29;
        lsEstBissextile = "L'année est bissextile !";
    }

    // Le rang 
    var liJour1erJanvier = obtenirPremierJourDeLAnnee(aiAnnee);
    console.log(tNomsJours[liJour1erJanvier]);

    // Affichage
    // 12 mois
    lsCalendrier += "<table border='1'>";
    for (i = 0; i < 12; i++) {
        lsCalendrier += "<tr>";
        lsNomDuMois = tNomsMois[i];

        // Affichage du nom du mois
        lsCalendrier += "<td>" + lsNomDuMois + "</td>";

        // Affichage des jours du mois
        for (j = 1; j <= tJoursMois[i]; j++) {
            liJourSemaine = (liQuantiemeAnnee + liJour1erJanvier - 1) % 7;
            lsJourSemaine = tNomsJours[liJourSemaine];
//console.log(lsJourSemaine==="DI");
            if (liQuantiemeAnnee === liQuantiemeDuJour) {
                lsCalendrier += "<td class='fondRouge'>" + lsJourSemaine + "<br>" + j + "</td>";
            }
            else {
                if (lsJourSemaine === "SA" || lsJourSemaine === "DI") {
                    lsCalendrier += "<td class='fondVert'>" + lsJourSemaine + "<br>" + j + "</td>";
                }
                else {
                    lsCalendrier += "<td>" + lsJourSemaine + "<br>" + j + "</td>";
                }
            }

            liQuantiemeAnnee++;
        }

        lsCalendrier += "</tr>";
    }
    lsCalendrier += "</table>";
    return lsCalendrier;
} /// obtenirCalendrier

/**
 * 
 * @returns {undefined}
 */
function remplirListeAnnee() {
    for (var annee = 1970; annee <= 2015; annee++) {
        var option = document.createElement("option");
        option.setAttribute("value", annee);
        option.innerHTML = annee;
        listeAnnees.appendChild(option);
    }

} /// remplirListeAnnee

/**
 * 
 * @returns {undefined}
 */
function init() {
    listeAnnees = document.getElementById("listeAnnees");
    calendrier = document.getElementById("calendrier");
    titre = document.getElementById("titre");
//    calendrier.innerHTML = obtenirCalendrier(2000);
    remplirListeAnnee();
    listeAnnees.onchange = function() {
        var annee = listeAnnees.value;
        calendrier.innerHTML = obtenirCalendrier(annee);
    };
    var date = new Date();
//    console.log(date);
    var annee = date.getFullYear();
//    console.log(annee);
    listeAnnees.value = annee;
    listeAnnees.onchange();
} /// init


window.onload = init;


