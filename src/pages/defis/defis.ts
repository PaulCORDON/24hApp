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

  listeDefis: any =
    [{ "id": "101", "titre": "Test 1", "etat": "debloque", "theme": "100" }, { "id": "102", "titre": "Wesh lol", "etat": "bloque", "theme": "200" }];
  listeThemes: any =
    [{ "id": "100", "titre": "Le code / La programmation" }, { "id": "200", "titre": "Les femmes dans l'informatique" }];
  listTheme: any;
  listDefi: any;
  listProposition :any;
  question : any;
  nbTheme: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    this.getNbTheme();
    sqlLite.selectData("", "theme", "*").then((themeData) => {
      console.log("ThemeData.id = ", themeData);
      this.listTheme = themeData;
      sqlLite.selectData("", "defi", "*").then((defidata) => {
        console.log("Défi Data", defidata)
        this.listDefi = defidata;
      })
      console.log(this.listTheme);
    });
  }

  getNbTheme() {
    this.sqlLite.selectData("", "theme", "count(*)").then((data) => {
      console.log("Nombre de thèmes : ", data);
      this.nbTheme = data;
    });


  }

  getQuestion(idDefi)
  {
    this.sqlLite.selectData("where `idDefi` = " + idDefi, "question", "*").then((data) => {
      console.log("Question : ", data);
      this.question = data;
      
    });
  }

  getReponses()
  {
    
  }


  cliqueDefi(idDefi: number) {
    this.getQuestion(idDefi);
    this.navCtrl.push('QuestionPage', {idDefi: idDefi, question: this.question, numQuestion : 0});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefisPage');

  }

}
