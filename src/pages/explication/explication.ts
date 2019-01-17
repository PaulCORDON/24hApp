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
  explication: any;
  isNextQuestion: boolean;
  newTicket : boolean = false;

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
    this.isNextQuestion = (this.nbQuestion > this.numQuestion);
    

    if(!this.isNextQuestion){
      this.sqlLite.selectData("where `id` = " + this.idDefi, "defi", "etat").then((defiListe) => {
        if (defiListe[0].etat != 2) {
          this.newTicket=true;
          console.log("QUESTION --- Etat du défi : " + JSON.stringify(defiListe[0]));
          GlobalVarsProvider.instance.updateNombreTicket(1);  
          this.sqlLite.setData("defi", "etat", 2, "where `id` = " + this.idDefi);
          this.sqlLite.setData("theme", "nbTicketActuel", 1, "where `id` = " + (this.listDefi[this.idDefi - 1].idTheme));  
          this.sqlLite.setData("defi", "etat", 1, "where `id` = " + (++this.idDefi));
        }
  
        console.log("QUESTION --- Listes des réponses : ", this.listReponses)
        console.log("QUESTION --- Numéro de la question (affichage) : ", this.numQuestion + "/" + this.nbQuestion);
      });
    }
  }

  onClickTerminer() {
    console.log("QUESTION --- C'était la dernière question");
    this.navCtrl.push(DefisPage);
  }

  onClickNextQuestion() {
    console.log("EXPLICATION --- Click");
    console.log(this.nbQuestion + " > " + this.numQuestion)
    this.navCtrl.push('QuestionPage', { idDefi: this.idDefi, question: this.question, numQuestion: this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi });
  }

}
