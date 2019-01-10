import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

@IonicPage()
@Component({
  selector: 'page-concours',
  templateUrl: 'concours.html',
})
export class ConcoursPage {

  public nom:string;
  public prenom:string;
  public tel:string;
  public mail:string;

  public cg:boolean = false;

  public nombreTicket = GlobalVarsProvider.instance.getNombreTicket();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcoursPage');
  }

  envoyer(){
    console.log(this.nom + " " + this.prenom + " " + this.cg);
  }

}
