import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DefisPage } from '../defis/defis';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
  idDefi: any;
  question: any;
  numQuestion: number;
  nbQuestion: number;
  listDefi: any;
  listReponses: any;
  toast: boolean;
  explication:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public sqlLite: SQLiteService) {
    this.idDefi = navParams.get("idDefi");
    this.question = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    this.nbQuestion = navParams.get("nbQuestion");
    this.listDefi = navParams.get("listDefi");
    this.listReponses = navParams.get("listReponses");
    this.toast = navParams.get("toast");
    this.explication = navParams.get("explication");
    console.log("EXPLICATION --- Toast :", this.toast);
    console.log("EXPLICATION --- Récupération de la question", this.question);

  }

  ionViewDidLoad() {
    console.log('----------------------- ExplicationPage');
  }


  onClickNextQuestion() {
    console.log("EXPLICATION --- Click");
    console.log(this.nbQuestion + " > " + this.numQuestion)
    if (this.nbQuestion > this.numQuestion) {
      this.navCtrl.push('QuestionPage', { idDefi: this.idDefi, question: this.question, numQuestion: this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi });
    }
    else {
      if (this.toast == true) {
        let toast = this.toastCtrl.create({
          message: 'Vous avez répondu à toutes les questions. Félicitations, un tocket a été ajouté à votre compte utilisateur',
          duration: 3000,
          position: 'middle'
        });

        toast.onDidDismiss(() => {
          GlobalVarsProvider.instance.updateNombreTicket(1);
          this.navCtrl.push(DefisPage);
          console.log('Dismissed toast');
        });

        toast.present();
      }
      else
        this.navCtrl.push(DefisPage);
    }
    console.log("QUESTION --- Listes des réponses : ", this.listReponses)
    console.log("QUESTION --- Numéro de la question (affichage) : ", this.numQuestion + "/" + this.nbQuestion);

  }
}
