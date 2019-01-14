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
    [{ "id":"101","titre": "Test 1", "etat": "debloque","theme":"100"},{"id":"102","titre":"Wesh lol","etat":"bloque","theme":"200"}];
  listeThemes: any=
    [{ "id":"100","titre": "Le code / La programmation"},{"id":"200","titre":"Les femmes dans l'informatique"}];
  listTheme:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlLite: SQLiteService, zone: NgZone) {

    sqlLite.selectData(200, "theme", "*").then((data) => {
      console.log("Nom", data.nom);
        this.listTheme = data.nom
        console.log(this.listTheme);
    });
  }
  
  cliqueDefi(id: number) {

    this.navCtrl.push('QuestionPage',{idDefi:id,idQuestion:1});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefisPage');

  }
}
