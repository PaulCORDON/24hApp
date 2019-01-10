import { Component } from '@angular/core';
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

  sqliteservice: SQLiteService;
  listeDefis: any =
    [{ "id":"101","titre": "Niquez des mères", "etat": "debloque","theme":"100"},{"id":"102","titre":"Wesh lol","etat":"bloque","theme":"200"}];
  listeThemes: any=
    [{ "id":"100","titre": "Le code / La programmation"},{"id":"200","titre":"Les Gonzesses dans l'informatique"}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefisPage');
   
  }

  cliqueDefi(id: number){
    
    this.navCtrl.push('');
  }

}
