import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { SQLite } from '@ionic-native/sqlite';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Participation } from '../../model/Participation';
import { partition } from 'rxjs/operators';
import { SQLiteService } from '../../SQLite/SQLiteService';

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

  public nombreTicket : number = GlobalVarsProvider.instance.getNombreTicket();
  public nombreTicketDejaRemis:number;
  public ref;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase : FirebaseProvider, public sqlLite: SQLiteService) {
    
  }

  ionViewWillEnter(){
    this.nombreTicket = GlobalVarsProvider.instance.getNombreTicket();

    this.sqlLite.selectData("1", "reference", "*").then((ref) => {
      console.log("reference : ", ref.reference)
      this.ref = ref.reference;
    })

    if(this.ref!=undefined) this.firebase.getParticipation(this.ref).then((res)=>{
      this.nom = res.nom;
      this.prenom = res.prenom;
      this.tel= res.tel;
      this.mail = res.mail;
      this.nombreTicketDejaRemis = res.nbTicket;

      console.log(this.nombreTicketDejaRemis +"  " + this.nombreTicket)
    });
  }

  envoyer(){
    let participation:Participation = new Participation();
    participation.nom = this.nom;
    participation.prenom = this.prenom;
    participation.mail=this.mail;
    participation.tel=this.tel;
    participation.nbTicket=this.nombreTicket;

    console.log(this.nom + " " + this.nombreTicket + " " + this.cg);
    this.ref=this.firebase.addParticipation(participation);
    this.sqlLite.setReference(this.ref);
    this.nombreTicketDejaRemis = this.nombreTicket;
  }


  update(nbT : number){
    let participation:Participation = new Participation();
    participation.nom = this.nom;
    participation.prenom = this.prenom;
    participation.mail=this.mail;
    participation.tel=this.tel;
    participation.nbTicket=nbT;

    console.log(this.nom + " " + this.nombreTicket + " " + this.cg);
    this.firebase.updateParticipation(this.ref,participation);
    if(nbT==this.nombreTicket) this.nombreTicketDejaRemis = nbT;
  }
}
