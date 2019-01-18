import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  idDefi: any; //ID du défi sur lequel le joueur a tapé
  numQuestion: number; // Numéro de la question
  nbQuestion: number; // Nombre de questions dans le défi

  //Liste des composants
  listQuestion: any;
  listReponses: any;
  listDefi: any;
  explication: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    //Récupération des valeurs de la page précédente
    this.idDefi = navParams.get("idDefi");
    this.listQuestion = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    this.nbQuestion = navParams.get("nbQuestion");
    this.listDefi = navParams.get("listDefi");

    this.getReponses();
  }

  //Méthode pour récupérer les réponses à la question
  getReponses() {
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "reponse", "*").then((reponsesData) => {
      this.listReponses = reponsesData;
    });
  }

  getExplication() {
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "explication", "*").then((explicationData) => {
      this.explication = explicationData[0];
      this.navCtrl.push('ExplicationPage', { idDefi: this.idDefi, question: this.listQuestion, numQuestion: this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi, listReponses: this.listReponses, toast: false, explication: this.explication });
    });
  }

  getExplicationFin() {
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "explication", "*").then((explicationData) => {
      this.explication = explicationData[0];
      this.navCtrl.push('ExplicationPage', { idDefi: this.idDefi, question: this.listQuestion, numQuestion: this.numQuestion, nbQuestion: --this.nbQuestion, listDefi: this.listDefi, listReponses: this.listReponses, toast: true, explication: this.explication });
    });
  }

  cliqueReponse(isReponse: number, id: any) {
    if (isReponse == 1) {
      document.getElementById(id).classList.add('flash');
      document.getElementById(id).style.backgroundColor = "#3E9623";
      if (this.numQuestion < this.nbQuestion - 1) {
        this.getExplication();
      }
      else {
        this.getExplicationFin();
      }
    }
    else {
      document.getElementById(id).classList.add('flash');
      document.getElementById(id).style.backgroundColor = "#FD5757";
    }
  }
}