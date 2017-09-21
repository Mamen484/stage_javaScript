/*
 * Controles.js
 * 
 */

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estTelephoneFR(psChaine) {
    // Telephone : 00-00-00-00-00
    var motif = "0[1-9](\\-\\d{2}){4}";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estTelephoneFR

/**
 * 
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estTelephoneFixeFR(psChaine) {
    // Telephone : 00-00-00-00-00 avec le chiffre [01234589]
    var motif = "0[1-589](\\-[0-9]{2}){4}";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estTelephoneFR

/**
 * 
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estTelephoneMobileFR(psChaine) {
    // Telephone : 00-00-00-00-00 avec le chiffre [67]
    var motif = "0[67](\\-[0-9]{2}){4}";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estTelephoneFR

/**
 * 
 * @param {type} psChaine
 * @returns {undefined}
 */
function estTelephoneInternational(psChaine) {
    // Indicatif (1 : USA, 961 : Liban)
    // (+nnnn)000000000
    var motif = "^0[1-9]\\d{8}|0[1-9]([-]\\d{2}){4}|\\(\\+[0-9]{1,4}\\)[1-9]\\d{8}$";
    var er = new RegExp(motif);
    return er.test(psChaine);
}
/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estCPFR(psChaine) {
    /*
     SI le CP commence par 0 alors le chiffre 2 ne peut etre un 0
     */
    var motif = "0[1-9][0-9]{3}|[1-9][0-9]{4}";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estCPFR




/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estNomSansAccent(psChaine) {
    var motif = "^[A-Z][A-Za-z '-]+$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estNomSansAccent

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estNomAvecAccent(psChaine) {
    var motif = "^[A-Za-zàâäéèêëîïôöüûù '-]+$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estNomAvecAccent

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estAdresse(psChaine) {
    var motif = "^[0-9A-Za-zàâäéèêëîïôöüûù ,'-]+$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estAdresse

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estMDPFort(psChaine) {
    // De 6 a 10 caractères, au moins 1 chiffre, au moins 1 majus, au moins une minus
    var motif = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estMDPFort

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estEmail(psChaine) {
    var motif = "^[0-9a-zA-Z_-]+([.][0-9a-zA-Z_-]+)?@[0-9a-zA-Z._-]{2,}[.][a-zA-Z]{2,5}$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estEmail

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estNomUnderscoreste(psChaine) {
    // ?, *, +
    // ? : 0,1
    // * : 0,n
    // + : 1,n
    // Accepte les chiffres
    // mots valides : ville, id_pays, nom_du_pays, code007_du_produit
    var motif = "^[a-z0-9]+(_?[a-z0-9]+)*$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estNomUnderscorise

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estCamelize(psChaine) {
    // ?, *, +
    // ? : 0,1
    // * : 0,n
    // + : 1,n
    // N'accepte pas les chiffres
    // Mots valides : ville, idPays, nomDuPays, ControlesEr, ControlesExpressionsRationnelles
    // Mots invalides : Controles_Expressions_Rationnelles, ControlesExpressionsRationnelles007, URL_DU_SERVEUR
    var motif = "^[A-Za-z][a-z]+([A-Z][a-z]*)*$";
//    var motif = "^[A-Za-z]";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estCamelize


/*
 * NOT USE 
 */
/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estDateFR(psChaine) {
    // Date jj/mm/aaaa ou j/m/aaaa ou j/mm/aaaa ou jj/m/aaaa
    //var motif = "^(\\d{2}/\\d{2}/\\d{4})|(\\d/\\d/\\d{4})|(\\d/\\d{2}/\\d{4})|(\\d{2}/\\d/\\d{4})$";
    var motif = "^\\d{1,2}/\\d{1,2}/\\d{4}$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estDateFR

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estURL(psChaine) {
    // + : 1,n
    // http://... ou https://... ou file://... ou file:///...
    var motif = "^(http://|https://|file://|file:///).+$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estURL

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estConstante(psChaine) {
    // ?, *, +
    // ? : 0,1
    // * : 0,n
    // + : 1,n
    // MMM et n foest _MMM
    // Accepte les chiffres
    // Mots valides : NOM_DU_SERVEUR,
    // Mots invalides : Nom_DU_SERVEUR,
    var motif = "^[A-Z]+(_[A-Z]*)*$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estConstante

/**
 *
 * @param {type} psChaine
 * @returns {Boolean}
 */
function estVille(psChaine) {
    var motif = "^[0-9A-Za-zàâäéèêëîïôöüûù '-]+$";
    var er = new RegExp(motif);
    return er.test(psChaine);
} /// estVille
