import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) { }

  ionViewWillEnter() {
    //Récupération des thèmes et des défis
    this.GetAllData();
  }

  //Méthode pour récupérer la liste des thèmes
  GetAllData() {
    this.sqlLite.selectData("", "theme", "*").then((themeData) => {
      this.listTheme = themeData;
      this.getDefis(); //Accès à la liste des défis
    });
  }

  //Méthode récupérant la liste des défis
  getDefis() {
    this.sqlLite.selectData("", "defi", "*").then((defiData) => {
      this.listDefi = defiData;
    })
  }

  cliqueDefi(idDefi: number) {
    this.getQuestion(idDefi);
  }

  //Méthode pour récupérer la liste des questions
  getQuestion(idDefi) {
    this.sqlLite.selectData("where `idDefi` = " + idDefi, "question", "*").then((questionData) => {
      this.listQuestion = questionData;
      this.getNbQuestion(idDefi);
    });
  }

  //Méthode récupérant le nombre de questions d'un défi
  getNbQuestion(idDefi) {
    this.sqlLite.selectData("where `idDefi` =" + idDefi, "question", "count(*) AS NBQUESTION").then((nbQuestionData) => {
      this.nbQuestion = nbQuestionData[0].NBQUESTION;
      this.navCtrl.push('QuestionPage', { idDefi: idDefi, question: this.listQuestion, numQuestion: 0, nbQuestion: this.nbQuestion, listDefi: this.listDefi });
    });
  }
}
