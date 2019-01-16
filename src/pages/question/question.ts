import { Component, keyframes } from '@angular/core';
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
  bonneReponse:number;
  flash = [
    { opacity:1},
    { opacity:0},
    { opacity:1}
  ];

  flashTiming = {
    duration: 500
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    /*this.idDefi = navParams.get("idDefi");
    this.idQuestion = navParams.get("idQuestion");

    sqlLite.selectData(this.idDefi,"question","*");*/

    this.bonneReponse = 2;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  cliqueReponse(numQuestion:number){

    if(numQuestion == this.bonneReponse){
      //.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById("reponse"+numQuestion).style.backgroundColor = "#3E9623";
    
    }
    else{
     // document.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById("reponse"+numQuestion).style.backgroundColor = "#FD5757";
    }
  }

}
