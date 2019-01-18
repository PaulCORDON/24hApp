import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';



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

  currentTab: String;
  annee: String;
  infos24h: any =
    [{
      "annee": "2012", "dates": "26-27 janvier 2012", "Lieu": "ENSIM", "nbSujet": "3", "titreSujet1": "Création d'un ping-pong en réseau", "demandeurSujet1": "ENSIM", "titreSujet2": "Création d'un labyrinthe virtuel, à plusieurs étages", "demandeurSujet2": "ENSIM", "titreSujet3": "Résolution automatique de puzzle", "demandeurSujet3": "ENSIM", "titreSujet4": "", "demandeurSujet4": "", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "En 2012 a lieu la première édition des 24 heures du code. Cette édition se déroule dans les locaux de l'ENSIM, l'école d'ingénieurs de l'Université du Mans. Lors de cette première édition, seuls les élèves de l'ENSIM peuvent participer à l'évènement.",
      "Anectode2": "",
      "Anectode3": "", "nbParticipants": "24"
    },
    {
      "annee": "2013", "dates": "18-19 janvier 2013", "Lieu": "ENSIM", "nbSujet": "3", "titreSujet1": "Taping game (style guitar hero)", "demandeurSujet1": "ENSIM", "titreSujet2": "Old school RPG (jeu en 2D", "demandeurSujet2": "ENSIM", "titreSujet3": "Puzzle helper : travailler sur des images pour isoler et caractériser des pi\u00e8ces pour les assembler plus facilement", "demandeurSujet3": "ENSIM", "titreSujet4": "", "demandeurSujet4": "", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "La deuxième édition des 24 heures du code a lieu à l'ENSIM, l'école d'ingénieurs de l'Université du Mans. Contrairement à la première édition qui n'était ouverte qu'aux élèves de l'ENSIM, celle-ci est alors ouverte à tous les élèves de l'Université du Mans.",
      "Anectode2": "C'est aussi en 2013 que les 24 heures du code s'affichent sur les réseaux sociaux.",
      "Anectode3": "", "nbParticipants": "56"
    },
    {
      "annee": "2014", "dates": "25-26 janvier 2014", "Lieu": "CCI", "nbSujet": "4", "titreSujet1": "Cartes communicantes intelligentes capables de se localiser les unes par rapport aux autres", "demandeurSujet1": "ENSIM", "titreSujet2": "Game & Watch", "demandeurSujet2": "ENSIM", "titreSujet3": "Opendata transports publics de Rennes", "demandeurSujet3": "HAUM \/ Mozilla", "titreSujet4": "Vindinium : arene RPG tout en IA", "demandeurSujet4": "HAUM", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "En 2014, c'est la première fois que les 24 heures du code ont lieu à la CCI. En effet, les deux éditions précédentes avaient eu lieu à l'ENSIM, l'école d'ingénieurs de l'université du Mans.",
      "Anectode2": "C'est aussi la première fois que l'évènement est ouvert à tous, n'importe qui peut alors s'inscrire et y participer.",
      "Anectode3": "", "nbParticipants": "121"
    },
    {
      "annee": "2015", "dates": "17-18 janvier 2015", "Lieu": "CCI", "nbSujet": "4", "titreSujet1": "Labycraft : dans l'idée du film Labyrinthe, générer automatiquement des labyrinthes dans minecraft", "demandeurSujet1": "ENSIM", "titreSujet2": "SPC56XX : reproduire un symbole à l'aide d'un laser motorisé", "demandeurSujet2": "ST Microelectronics", "titreSujet3": "Android TV : détection de visage et reconnaissance de personnes", "demandeurSujet3": "ST Microelectronics", "titreSujet4": "Urbanflow : utilisation des opendata de la SETRAM pour calculer des parcours en ville", "demandeurSujet4": "HAUM", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "Refonte du site internet des 24 heures du code a été créé. Cela facilite notamment les inscriptions des participants.",
      "Anectode2": "C'est la première fois que des ateliers mindstorms sont instaurés. Ces ateliers sont ouverts aux visiteurs de l'évènement, enfants, ados ou adultes.",
      "Anectode3": "", "nbParticipants": "109"
    },
    {
      "annee": "2016", "dates": "23-24 janvier 2016", "Lieu": "CCI", "nbSujet": "4", "titreSujet1": "Les minions", "demandeurSujet1": "ST Microelectronics", "titreSujet2": "Jouer une pi\u00e8ce de théatre à partir de son texte et des didascalies", "demandeurSujet2": "ENSIM", "titreSujet3": "Laser game", "demandeurSujet3": "ENSIM", "titreSujet4": "Opendata : déplacement mutli transports", "demandeurSujet4": "HAUM", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "21 enfants\/ados ont participé aux ateliers mindstorms, ainsi que 16 adultes qui ont participé à un atelier mindstorm for Scrum.",
      "Anectode2": "Pour le plus grand plaisir des codeurs, des ateliers de massages sont mis en place. Cela permet aux codeurs de faire une petite pause détente pendant l'évènement.",
      "Anectode3": "", "nbParticipants": "109"
    },
    {
      "annee": "2017", "dates": "21-22 janvier 2017", "Lieu": "CCI", "nbSujet": "5", "titreSujet1": "Les boules interactives", "demandeurSujet1": "HAUM", "titreSujet2": "BattleCode", "demandeurSujet2": "CESI", "titreSujet3": "1024 Bornes", "demandeurSujet3": "ENSIM", "titreSujet4": "Automobile", "demandeurSujet4": "ST Microelectronics", "titreSujet5": "Bug Tracker", "demandeurSujet5": "SopraSteria",
      "Anectode1": "Un jeu concours a eu lieu pour les visiteurs, de 14h à 18h. Des drones étaient à gagner !",
      "Anectode2": "",
      "Anectode3": "", "nbParticipants": "160"
    },
    {
      "annee": "2018", "dates": "20-21 janvier 2018", "Lieu": "CCI", "nbSujet": "4", "titreSujet1": "Fourmis autonomes - IA", "demandeurSujet1": "HAUM", "titreSujet2": "Géolocalisation, calculs de trajets en respectant le code de la route ", "demandeurSujet2": "MMA DTSI", "titreSujet3": "robots & labyrinthe", "demandeurSujet3": "ST Microelectronics", "titreSujet4": "Fléchettes connectées", "demandeurSujet4": "Sopra-Steria", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "Pour l'édition 2018, a été mis en place un conseil scientifique. C'est à dire que les sujets sont tous proposés par des entreprises ou associations.",
      "Anectode2": "",
      "Anectode3": "", "nbParticipants": "132"
    },
    {
      "annee": "2019", "dates": "19-20 janvier 2019", "Lieu": "Campus La Californie", "nbSujet": "4", "titreSujet1": "24h non stop", "demandeurSujet1": "Coach AAC", "titreSujet2": "l\'ecole des sorciers", "demandeurSujet2": "ST Microelectronics", "titreSujet3": "mission impossible !", "demandeurSujet3": "Sopra Steria", "titreSujet4": "HAUMduino", "demandeurSujet4": "HAUM", "titreSujet5": "", "demandeurSujet5": "",
      "Anectode1": "En raison d'une manifestation prévue place de la république le samedi 19 janvier, le lieu des 24 heures du code a été modifié. L'évènement prend donc place au campus 'La Californie' au Mans.",
      "Anectode2": "Des ateliers lego wedo & scratch sont mis en place.",
      "Anectode3": "", "nbParticipants": "168"
    }]

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    platform.ready().then(() => {
      //Desactive le bouton retour du telephone sur toute l'appli
      platform.registerBackButtonAction(() => {

      }, 100);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
    this.currentTab = "sujets";
    this.annee = "2019";
  }



}
