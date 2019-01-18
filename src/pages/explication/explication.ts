import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

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
  newTicket: boolean = false;
  image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public sqlLite: SQLiteService) {
    this.idDefi = navParams.get("idDefi");
    this.question = navParams.get("question");
    this.numQuestion = navParams.get("numQuestion");
    this.nbQuestion = navParams.get("nbQuestion");
    this.listDefi = navParams.get("listDefi");
    this.listReponses = navParams.get("listReponses");
    this.toast = navParams.get("toast");
    this.explication = navParams.get("explication");
  }

  ionViewDidLoad() {
    this.isNextQuestion = (this.nbQuestion > this.numQuestion);

    if (!this.isNextQuestion) {
      this.sqlLite.selectData("where `id` = " + this.idDefi, "defi", "etat").then((defiListe) => {
        if (defiListe[0].etat != 2) {
          this.newTicket = true;
          GlobalVarsProvider.instance.updateNombreTicket(1);
          this.sqlLite.setData("defi", "etat", 2, "where `id` = " + this.idDefi);
          this.sqlLite.setData("theme", "nbTicketActuel", 1, "where `id` = " + (this.listDefi[this.idDefi - 1].idTheme));
          this.sqlLite.setData("defi", "etat", 1, "where `id` = " + (++this.idDefi));
        }
      });
    }
  }

  onClickTerminer() {
    this.navCtrl.popToRoot();
  }

  onClickNextQuestion() {
    this.navCtrl.push('QuestionPage', { idDefi: this.idDefi, question: this.question, numQuestion: ++this.numQuestion, nbQuestion: this.nbQuestion, listDefi: this.listDefi });
  }
}
