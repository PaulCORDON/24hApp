import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefisPage } from '../defis/defis';

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
  nbQuestion:number

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idDefi = navParams.get("idDefi");
    this.question = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    this.nbQuestion = navParams.get("nbQuestion");
    console.log("EXPLICATION --- Récupération de la question", this.question);

  }

  ionViewDidLoad() {
    console.log('----------------------- ExplicationPage');
  }

  onClickNextQuestion()
  {
    console.log("EXPLICATION --- Click");
    console.log(this.nbQuestion + " > " + this.numQuestion)
    if(this.nbQuestion > this.numQuestion)
    {
      this.navCtrl.push('QuestionPage', {idDefi: this.idDefi, question: this.question, numQuestion: this.numQuestion, nbQuestion: this.nbQuestion});
    }
    else
    {

      this.navCtrl.push(DefisPage);
    }
      
      
  }

}
