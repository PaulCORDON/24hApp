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

  listTheme: any;
  listDefi: any;
  listProposition :any;
  question : any;
  nbQuestion: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    sqlLite.selectData("", "theme", "*").then((themeData) => {
      console.log("DEFI --- Nom des thèmes :", themeData);
      this.listTheme = themeData;
      sqlLite.selectData("", "defi", "*").then((defidata) => {
        console.log("DEFI --- Liste des défis", defidata)
        this.listDefi = defidata;
      })
      //console.log(this.listTheme);
    });
  }

  getNbQuestion(idDefi) {
    this.sqlLite.selectData("where `idDefi` =" + idDefi, "question", "count(*) AS NBQUESTION").then((data) => {
      console.log("DEFI --- Nombre de question dans le défi : ", data[0].NBQUESTION);
      this.nbQuestion = data[0];
    });


  }

  getQuestion(idDefi)
  {
    this.sqlLite.selectData("where `idDefi` = " + idDefi, "question", "*").then((data) => {
      console.log("DEFI --- Listes des questions : ", data);
      this.question = data;
      this.getNbQuestion(idDefi);
      
    });
  }


  cliqueDefi(idDefi: number) {
    console.log("DEFI --- ID du défi cliqué : ", idDefi);
    this.getQuestion(idDefi);
    //console.log("DEFI --- Nb Question : ", this.nbQuestion.NBQUESTION)
    this.navCtrl.push('QuestionPage', {idDefi: idDefi, question: this.question, numQuestion : 0, nbQuestion: this.nbQuestion.NBQUESTION});
  }

  ionViewDidLoad() {
    console.log('--------------------------DefisPage');

  }

}
