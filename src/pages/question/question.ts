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
      console.log("QUESTION --- Numéro de la question (affichage) : ", this.numQuestion + "/" + this.nbQuestion);
    });
  }





  cliqueReponse(isReponse: number, id: any) {

    console.log("QUESTION --- Clic")
    console.log("QUESTION --- isReponse : ", isReponse);
    console.log("QUESTION --- Numero question : " + this.numQuestion + " ------ Nombre de question : " + this.nbQuestion);

    if (isReponse == 1) {
      //document.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#3E9623";
      if (this.numQuestion < this.nbQuestion - 1) {
        console.log("QUESTION --- Continuation des questions")
        this.navCtrl.push('ExplicationPage', { idDefi: this.idDefi, question: this.listQuestion, numQuestion: ++this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi, listReponses : this.listReponses, toast: false });
      }
      else {
        console.log("QUESTION --- C'était la dernière question");
        

        this.sqlLite.selectData("where `id` = " + this.idDefi, "defi", "etat").then((etatDefi) => {
          if (etatDefi[0] != 2) {
            console.log("QUESTION --- Etat du défi : " + etatDefi[0]);
            this.sqlLite.setData("defi", "etat", 2, "where `id` = " + this.idDefi);
            this.sqlLite.setData("theme", "nbTicketActuel", 1, "where `id` = " + (this.listDefi[this.idDefi - 1].idTheme));
            //GlobalVarsProvider.instance.updateNombreTicket(1);
            this.sqlLite.setData("defi", "etat", 1, "where `id` = " + (++this.idDefi));
          }
          
          console.log("QUESTION --- Listes des réponses : ", this.listReponses)
          console.log("QUESTION --- Numéro de la question (affichage) : ", this.numQuestion + "/" + this.nbQuestion);
        });

        
        this.navCtrl.push('ExplicationPage', { toast : true });
      }
    }
    else {
      //document.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#FD5757";
    }
  }

}
