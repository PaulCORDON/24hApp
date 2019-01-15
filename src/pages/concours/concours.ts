import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { SQLite } from '@ionic-native/sqlite';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Participation } from '../../model/Participation';
import { partition } from 'rxjs/operators';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { NativeStorage } from '@ionic-native/native-storage';
@IonicPage()
@Component({
  selector: 'page-concours',
  templateUrl: 'concours.html',
})
export class ConcoursPage {

  public nom: string;
  public prenom: string;
  public tel: string;
  public mail: string;

  public cg: boolean = false;

  public nombreTicket: number = GlobalVarsProvider.instance.getNombreTicket();
  public nombreTicketDejaRemis: number;
  public ref: firebase.database.ThenableReference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider, public sqlLite: SQLiteService, private nativeStorage: NativeStorage) {

  }

  ionViewWillEnter() {
    this.nombreTicket = GlobalVarsProvider.instance.getNombreTicket();

    // this.sqlLite.selectData("", "reference", "*").then((ref) => {
    //   console.log("dans le ionViewWillEnter ref[0] ")
    //   console.log(ref[0].reference)
    //   this.ref = ref[0].reference;
    // })
    this.nativeStorage.getItem('refFirebase')
      .then(
        data => {
          console.log(data);
          this.ref=data;
        },
        error => console.error(error)
      );
    console.log("ionViewWillEnter après selectData");
    console.log(this.ref);

    if (this.ref != undefined) this.firebase.getParticipation(this.ref).then((res) => {
      this.nom = res.nom;
      this.prenom = res.prenom;
      this.tel = res.tel;
      this.mail = res.mail;
      this.nombreTicketDejaRemis = res.nbTicket;
      console.log("!!!!!!! " + this.nom)
      console.log("ici " + this.nombreTicketDejaRemis + "  " + this.nombreTicket)
    })
      .catch(() => console.log("errorrrrrrr"));
  }

  envoyer() {
    let participation: Participation = new Participation();
    participation.nom = this.nom;
    participation.prenom = this.prenom;
    participation.mail = this.mail;
    participation.tel = this.tel;
    participation.nbTicket = this.nombreTicket;

    console.log(this.nom + " " + this.nombreTicket + " " + this.cg);
    this.ref = this.firebase.addParticipation(participation);
    console.log(this.ref);
    console.log("en JSON :");
    console.log(JSON.stringify(this.ref));
    this.nativeStorage.setItem('refFirebase', this.ref)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );


    //this.sqlLite.setReference(this.ref);
    this.nombreTicketDejaRemis = this.nombreTicket;
  }


  update(nbT: number) {
    let participation: Participation = new Participation();
    participation.nom = this.nom;
    participation.prenom = this.prenom;
    participation.mail = this.mail;
    participation.tel = this.tel;
    participation.nbTicket = nbT;

    console.log(this.nom + " " + this.nombreTicket + " " + this.cg);
    this.firebase.updateParticipation(this.ref, participation);
    if (nbT == this.nombreTicket) this.nombreTicketDejaRemis = nbT;
  }
}
