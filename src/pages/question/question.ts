import { Component, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  explication:any;

  //Animations
  flash = [
    { opacity: 1 },
    { opacity: 0 },
    { opacity: 1 }
  ];

  flashTiming = {
    duration: 500
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    //Récupération des valeurs de la page précédente
    this.idDefi = navParams.get("idDefi");
    this.listQuestion = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    this.nbQuestion = navParams.get("nbQuestion");
    this.listDefi = navParams.get("listDefi");

    console.log("QUESTION --- Récupération de la liste des questions", this.listQuestion);
    console.log("QUESTION --- Récupération de l'ID du défi", this.idDefi);

    this.getReponses();

  }


  ionViewDidLoad() {
    console.log('---------------------------- QuestionPage');
  }


  //Méthode pour récupérer les réponses à la question
  getReponses() {
    console.log("QUESTION --- Numéro de la question (brute) ", this.numQuestion);
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "reponse", "*").then((reponsesData) => {
      this.listReponses = reponsesData;
      console.log("QUESTION --- Listes des réponses : ", this.listReponses)
      console.log("QUESTION --- Numéro de la question (affichage) : ", this.numQuestion+1 + "/" + this.nbQuestion);
    });
  }

  getExplication()
  {
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "explication", "*").then((explicationData) => {
      this.explication = explicationData[0];
      this.navCtrl.push('ExplicationPage', { idDefi: this.idDefi, question: this.listQuestion, numQuestion: ++this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi, listReponses : this.listReponses, toast: false, explication:this.explication });
      console.log("EXPLICATION --- Explication : ", this.explication);
    });
  }

  getExplicationFin()
  {
    this.sqlLite.selectData("where `idQuestion` = " + this.listQuestion[this.numQuestion].id, "explication", "*").then((explicationData) => {
      this.explication = explicationData[0];
      this.navCtrl.push('ExplicationPage', { idDefi: this.idDefi, question: this.listQuestion, numQuestion: this.numQuestion, nbQuestion: --this.nbQuestion, listDefi: this.listDefi, listReponses : this.listReponses, toast: true, explication:this.explication });
      console.log("EXPLICATION --- Explication : ", this.explication);
    });
  }



  cliqueReponse(isReponse: number, id: any) {

    console.log("QUESTION --- Clic")
    console.log("QUESTION --- isReponse : ", isReponse);
    console.log("QUESTION --- Numero question : " + this.numQuestion + " ------ Nombre de question : " + this.nbQuestion);

    if (isReponse == 1) {
      //document.getElementById(id).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#3E9623";
      if (this.numQuestion < this.nbQuestion - 1) {
        this.getExplication();
        console.log("QUESTION --- Continuation des questions")
        
      }
      else {
        

        this.getExplicationFin();
        
      }
    }
    else {
      //document.getElementById(id).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#FD5757";
    }
  }

}
