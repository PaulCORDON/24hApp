import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';

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
  idDefi:number;
  idQuestion:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    /*this.idDefi = navParams.get("idDefi");
    this.idQuestion = navParams.get("idQuestion");

    sqlLite.selectData(this.idDefi,"question","*");*/

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

}
