/*
 * Diaporama.js
 */

var tImages;
var i;
var btFirst;
var btPrevious;
var btNext;
var btLast;
var btPlay;
var btZoom;
var lblMessage;
var jauge;
var photo;
var photoMax;
var cadreBlanc;
var oTimer;
var bCadreBlancAffiche;
var bPlay;
var largeurInitialePhoto;
var MAX = 8;

/**
 * 
 * @returns {undefined}
 */
function initVariablesGlobales() {
    /*
     * INIT BOOLEANs ...
     */
    bCadreBlancAffiche = false;
    bPlay = false;
} /// initVariablesGlobales

/**
 * 
 * @returns {undefined}
 */
function initElementsDInterface() {
    /*
     * RECUPERATION DES ELEMENTS D'INTERFACE
     */
    btFirst = document.getElementById("btFirst");
    btPrevious = document.getElementById("btPrevious");
    btNext = document.getElementById("btNext");
    btLast = document.getElementById("btLast");
    btPlay = document.getElementById("btPlay");

    btZoom = document.getElementById("btZoom");

    jauge = document.getElementById("jauge");

    lblMessage = document.getElementById("lblMessage");
    photo = document.getElementById("photo");
    photoMax = document.getElementById("photoMax");
    cadreBlanc = document.getElementById("cadreBlanc");
} /// initElementsDInterface

/**
 * 
 * @returns {undefined}
 */
function initEvenements() {
    /*
     * EVENEMENTS
     */
    btFirst.onclick = function() {
        i = 0;
        afficherPhoto();
        //deplacer("first");
    };

    btPrevious.onclick = function() {
        i--;
        afficherPhoto();
//        deplacer("previous");
    };

    btNext.onclick = function() {
        i++;
        afficherPhoto();
//        deplacer("next");
    };
    btLast.onclick = function() {
        i = MAX - 1;
        afficherPhoto();
//        deplacer("last");
    };

    btPlay.onclick = function() {
        bPlay = !bPlay;
        if (bPlay) {
            btPlay.value = "||";
            oTimer = window.setInterval(diapoAuto, 1000);
        }
        else {
            btPlay.value = "Play";
            clearInterval(oTimer);
        }
    };

    btZoom.onclick = function() {
        if (bCadreBlancAffiche) {
            cadreBlanc.style.display = "none";
        }
        else {
            cadreBlanc.style.display = "block";
            photoMax.setAttribute("src", tImages[i].src);
        }
        bCadreBlancAffiche = !bCadreBlancAffiche;
    };

    jauge.oninput = function() {
//        var liValeur = jauge.value;
//        console.log("largeurInitialePhoto : " + largeurInitialePhoto);
//        console.log("liValeur : " + liValeur);
//        var liLargeur = parseInt(largeurInitialePhoto * (liValeur / 100));
//        console.log("liLargeur : " + liLargeur);
//        photo.width = liLargeur;
        photo.width = jauge.value;
        //photo.setAttribute("width", liLargeur);
    };
} /// initEvenements()


/**
 * 
 * @returns {undefined}
 */
function init() {

    initVariablesGlobales();
    initElementsDInterface();
    initEvenements();

    // Chargement des photos
    tImages = new Array();
    for (i = 0; i < MAX; i++) {
        tImages[i] = new Image();
        tImages[i].src = "../images/" + (i) + ".jpg";
    }
    i = 0;

    /*
     * CODES
     */
    largeurInitialePhoto = photo.width;
    console.log(largeurInitialePhoto);

    //deplacer("first");
    afficherPhoto();
} /// INIT

/**
 * 
 * @returns {undefined}
 */
function afficherPhoto() {
    photo.setAttribute("src", tImages[i].src);
    lblMessage.innerHTML = (i + 1) + " sur " + MAX;
    changerEtatBoutons();
    cacherAgrandissement();
} /// afficherPhoto

/**
 * 
 * @returns {undefined}
 */
function diapoAuto() {
    if (i === MAX - 1) {
        i = 0;
    }
    else {
        i++;
    }
    afficherPhoto();
} /// diapoAuto

/**
 *
 * @returns {undefined}
 */
function changerEtatBoutons() {
    // --- KO !!!
//    btFirst.setAttribute("disabled", "false");
//    btPrevious.setAttribute("disabled", "false");
//    btNext.setAttribute("disabled", "false");
//    btLast.setAttribute("disabled", "false");
    btFirst.disabled = (i === 0);
    btPrevious.disabled = (i === 0);
    btNext.disabled = (i === MAX - 1);
    btLast.disabled = (i === MAX - 1);

//    btFirst.style.backgroundColor = "#ADFF2F";
//    btPrevious.style.backgroundColor = "#ADFF2F";
//    btNext.style.backgroundColor = "#ADFF2F";
//    btLast.style.backgroundColor = "#ADFF2F";

    btFirst.style.backgroundColor = "#000";
    btPrevious.style.backgroundColor = "#000";
    btNext.style.backgroundColor = "#000";
    btLast.style.backgroundColor = "#000";

    if (i === 0) {
        btFirst.style.backgroundColor = "#F00";
        btPrevious.style.backgroundColor = "#F00";
    }
    if (i === MAX - 1) {
        btNext.style.backgroundColor = "#F00";
        btLast.style.backgroundColor = "#F00";
    }

} /// changerEtatBoutons


/**
 * 
 * @returns {undefined}
 */
function cacherAgrandissement() {
    cadreBlanc.style.display = "none";
    bCadreBlancAffiche = false;
} /// cacherAgrandissement


// ----------
//window.onload = init(); /// OK ???
window.onload = init;
