import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoriquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {
  currentTab : String;
  annee : String;
  infos24h : any = 
  [{"annee":"2012","dates":"26-27 janvier 2012","Lieu":"ENSIM","nbSujet":"3","titreSujet1":"Cr\u00e9ation d'un ping-pong en r\u00e9seau","demandeurSujet1":"ENSIM","titreSujet2":"Cr\u00e9ation d'un labyrinthe virtuel, \u00e0 plusieurs \u00e9tages","demandeurSujet2":"ENSIM","titreSujet3":"R\u00e9solution automatique de puzzle","demandeurSujet3":"ENSIM","titreSujet4":"","demandeurSujet4":"","titreSujet5":"","demandeurSujet5":"","Anectode1":"Edition interne \u00e0 l'ENSIM","Anectode2":"","Anectode3":"","nbParticipants":"24"}, {"annee":"2013","dates":"18-19 janvier 2013","Lieu":"ENSIM","nbSujet":"3","titreSujet1":"Taping game (style guitar hero)","demandeurSujet1":"ENSIM","titreSujet2":"Old school RPG (jeu en 2D","demandeurSujet2":"ENSIM","titreSujet3":"Puzzle helper : travailler sur des images pour isoler et caract\u00e9riser des pi\u00e8ces pour les assembler plus facilement","demandeurSujet3":"ENSIM","titreSujet4":"","demandeurSujet4":"","titreSujet5":"","demandeurSujet5":"","Anectode1":"Edition interne Universit\u00e9 du Maine","Anectode2":"","Anectode3":"","nbParticipants":"56"}, {"annee":"2014","dates":"25-26 janvier 2014","Lieu":"CCI","nbSujet":"4","titreSujet1":"Cartes communicantes intelligentes capables de se localiser les unes par rapport aux autres","demandeurSujet1":"ENSIM","titreSujet2":"Game & Watch","demandeurSujet2":"ENSIM","titreSujet3":"Opendata transports publics de Rennes","demandeurSujet3":"HAUM \/ Mozilla","titreSujet4":"Vindinium : arene RPG tout en IA","demandeurSujet4":"HAUM","titreSujet5":"","demandeurSujet5":"","Anectode1":"Edition ouverte \u00e0 tous","Anectode2":"","Anectode3":"","nbParticipants":"121"}, {"annee":"2015","dates":"17-18 janvier 2015","Lieu":"CCI","nbSujet":"4","titreSujet1":"Labycraft : dans l'id\u00e9e du film Labyrinthe, g\u00e9n\u00e9rer automatiquement des labyrinthes dans minecraft","demandeurSujet1":"ENSIM","titreSujet2":"SPC56XX : reproduire un symbole \u00e0 l'aide d'un laser motoris\u00e9","demandeurSujet2":"ST Microelectronics","titreSujet3":"Android TV : d\u00e9tection de visage et reconnaissance de personnes","demandeurSujet3":"ST Microelectronics","titreSujet4":"Urbanflow : utilisation des opendata de la SETRAM pour calculer des parcours en ville","demandeurSujet4":"HAUM","titreSujet5":"","demandeurSujet5":"","Anectode1":"","Anectode2":"","Anectode3":"","nbParticipants":"109"}, {"annee":"2016","dates":"23-24 janvier 2016","Lieu":"CCI","nbSujet":"4","titreSujet1":"Les minions","demandeurSujet1":"ST Microelectronics","titreSujet2":"Jouer une pi\u00e8ce de th\u00e9atre \u00e0 partir de son texte et des didascalies","demandeurSujet2":"ENSIM","titreSujet3":"Laser game","demandeurSujet3":"ENSIM","titreSujet4":"Opendata : d\u00e9placement mutli transports","demandeurSujet4":"HAUM","titreSujet5":"","demandeurSujet5":"","Anectode1":"Ateliers mindstorms enfants \/ Ado  ==> 21 enfants + Mindstorms for scrum : 16 adultes \/ Ateliers de massage pour les codeurs","Anectode2":"","Anectode3":"","nbParticipants":"109"}, {"annee":"2017","dates":"21-22 janvier 2017","Lieu":"CCI","nbSujet":"5","titreSujet1":"Les boules interactives","demandeurSujet1":"HAUM","titreSujet2":"BattleCode","demandeurSujet2":"CESI","titreSujet3":"1024 Bornes","demandeurSujet3":"ENSIM","titreSujet4":"Automobile","demandeurSujet4":"ST Microelectronics","titreSujet5":"Bug Tracker","demandeurSujet5":"SopraSteria","Anectode1":"Ateliers mindstorms enfants \/ Ado  \/ Ateliers massage","Anectode2":"","Anectode3":"","nbParticipants":"160"}, {"annee":"2018","dates":"20-21 janvier 2018","Lieu":"CCI","nbSujet":"4","titreSujet1":"Fourmis autonomes - IA","demandeurSujet1":"HAUM","titreSujet2":"G\u00e9olocalisation, calculs de trajets en respectant le code de la route ","demandeurSujet2":"MMA DTSI","titreSujet3":"robots & labyrinthe","demandeurSujet3":"ST Microelectronics","titreSujet4":"Fl\u00e9chettes connect\u00e9es","demandeurSujet4":"Sopra-Steria","titreSujet5":"","demandeurSujet5":"","Anectode1":"Ateliers mindstorms enfants \/ Ado  \/ Ateliers massage \/ Mise en place Conseil scientifique : les sujets sont tous pos\u00e9s par des entreprises ou associations","Anectode2":"","Anectode3":"","nbParticipants":"132"}, {"annee":"2019","dates":"19-20 janvier 2019","Lieu":"CCI","nbSujet":"","titreSujet1":"","demandeurSujet1":"HAUM","titreSujet2":"","demandeurSujet2":"Coach AAC","titreSujet3":"","demandeurSujet3":"ST Microelectronics","titreSujet4":"","demandeurSujet4":"Sopra Steria","titreSujet5":"","demandeurSujet5":"","Anectode1":"Ateliers lego wedo & scratch ","Anectode2":"","Anectode3":"","nbParticipants":""}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
    this.currentTab="sujets";
    this.annee="2018"
  }

}
