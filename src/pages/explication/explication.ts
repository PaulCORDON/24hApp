import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explication',
  templateUrl: 'explication.html',
})
export class ExplicationPage {
  idDefi:any;
  question:any;
  numQuestion:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idDefi = navParams.get("idDefi");
    this.question = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    console.log("Question Recup Explication", this.question);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplicationPage');
  }

  onClickNextQuestion()
  {
    this.navCtrl.push('QuestionPage', {idDefi: this.idDefi, question: this.question, numQuestion: this.numQuestion++});
  }

}
