import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';

/**
 * Generated class for the DefisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-defis',
  templateUrl: 'defis.html',
})
export class DefisPage {

  //Liste des différents composants de la BDD
  listTheme: any;
  listDefi: any;
  listProposition: any;
  listQuestion: any;

  //Nombre de questions dans un défi
  nbQuestion: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    
  }

  ionViewWillEnter(){
    this.GetAllData(); //Récupération des thèmes et des défis
  }

  //Méthode pour récupérer la liste des thèmes
  GetAllData() {
    this.sqlLite.selectData("", "theme", "*").then((themeData) => {
      this.listTheme = themeData;
      console.log("DEFI --- Liste des thèmes :", this.listTheme);
      this.getDefis(); //Accès à la liste des défis
    });
  }

  //Méthode récupérant la liste des défis
  getDefis() {
    this.sqlLite.selectData("", "defi", "*").then((defiData) => {
      this.listDefi = defiData;
      console.log("DEFI --- Liste des défis", this.listDefi)
    })
  }

  cliqueDefi(idDefi: number) {
    console.log("DEFI --- Clic");
    console.log("DEFI --- ID du défi cliqué : ", idDefi);
    this.getQuestion(idDefi);
  }

  //Méthode pour récupérer la liste des questions
  getQuestion(idDefi) {
    this.sqlLite.selectData("where `idDefi` = " + idDefi, "question", "*").then((questionData) => {
      this.listQuestion = questionData;
      console.log("DEFI --- Listes des questions : ", this.listQuestion);
      this.getNbQuestion(idDefi);
    });
  }

  //Méthode récupérant le nombre de questions d'un défi
  getNbQuestion(idDefi) {
    this.sqlLite.selectData("where `idDefi` =" + idDefi, "question", "count(*) AS NBQUESTION").then((nbQuestionData) => {
      console.log("DEFI --- Nombre de question dans le défi : ", nbQuestionData[0].NBQUESTION);
      this.nbQuestion = nbQuestionData[0].NBQUESTION;
      this.navCtrl.push('QuestionPage', {idDefi: idDefi, question: this.listQuestion, numQuestion: 0, nbQuestion: this.nbQuestion, listDefi: this.listDefi});
    });
  }




  ionViewDidLoad() {
    console.log('--------------------------DefisPage');

  }

}
