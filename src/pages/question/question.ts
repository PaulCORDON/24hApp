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
  idDefi:any;
  question:any;
  bonneReponse:any;
  listProposition:any;
  numQuestion:number;

  flash = [
    { opacity:1},
    { opacity:0},
    { opacity:1}
  ];

  flashTiming = {
    duration: 500
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService) {
    this.idDefi = navParams.get("idDefi");
    this.question = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    console.log("Question Recup", this.question);
    console.log("ID Defi recup", this.idDefi);
    
    this.getReponses();
    this.bonneReponse = 2;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  getReponses()
  {
    this.sqlLite.selectData("where `idQuestion` = " + this.question[this.numQuestion].id, "propositionQuiz", "*").then((data) => {
      this.listProposition = data;
    });
  }

  

  cliqueReponse(isReponse:number, id:any){

    console.log("num Reponse", isReponse);
    if(isReponse == 1){
      //document.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#3E9623";
      this.navCtrl.push('ExplicationPage', {idDefi: this.idDefi, question: this.question, numQuestion : this.numQuestion+1});

    
    }
    else{
      //document.getElementById("reponse"+numQuestion).animate(this.flash,this.flashTiming);
      document.getElementById(id).style.backgroundColor = "#FD5757";
    }
  }

}
