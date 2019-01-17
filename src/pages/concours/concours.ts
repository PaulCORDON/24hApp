import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { SQLite } from '@ionic-native/sqlite';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Participation } from '../../model/Participation';
import { partition } from 'rxjs/operators';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { NativeStorage } from '@ionic-native/native-storage';
import * as firebase from 'firebase'
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

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
  public isEnable: boolean = false;
  public cg: boolean = false;

  public nombreTicket: number;
  public nombreTicketDejaRemis: number;
  public ref: firebase.database.Reference;

  public connect:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, private toastCtrl: ToastController, private nativeStorage: NativeStorage, protected network: Network) {
    this.connect = (network.type!="none");
    network.onConnect().subscribe(() => {
      this.connect = true;
      this.ionViewWillEnter();
    });
    network.onDisconnect().subscribe(() => {
      this.connect = false;
    });
  }

  ionViewWillEnter() {
    GlobalVarsProvider.instance.getNombreTicket().then((val) => {
      this.nombreTicket = val;
    })

    this.nativeStorage.getItem('refFirebase')
      .then(
        data => {
          console.log("data getItem : " + data);
          this.ref = firebase.database().refFromURL(data);
          console.log("ref getItem : " + this.ref)

          if (this.ref != undefined) this.firebaseProvider.getParticipation(this.ref).then((res) => {
            this.nom = res.nom;
            this.prenom = res.prenom;
            this.tel = res.tel;
            this.mail = res.mail;
            this.nombreTicketDejaRemis = res.nbTicket;
            console.log("getParticipation : " + this.nombreTicketDejaRemis + "  " + this.nombreTicket)
          })
            .catch(() => console.log("getParticipation error"));
        },
        error => console.error(error)
      );
  }

  envoyer() {
    let participation: Participation = new Participation();
    participation.nom = this.nom;
    participation.prenom = this.prenom;
    participation.mail = this.mail;
    participation.tel = this.tel;
    participation.nbTicket = this.nombreTicket;

    console.log(this.nom + " " + this.nombreTicket + " " + this.cg);
    this.ref = this.firebaseProvider.addParticipation(participation);
    console.log("envoyer ref : " + this.ref);

    this.nativeStorage.setItem('refFirebase', this.ref.toJSON())
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );


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
    this.firebaseProvider.updateParticipation(this.ref, participation);
    if (nbT == this.nombreTicket) this.nombreTicketDejaRemis = nbT;
  }

  newInput() {
    console.log(this.nom);
    this.isEnable = (this.nom != "" && this.prenom != "" && this.tel != "" && this.cg);

  }

  easterEgg() {
    this.nativeStorage.getItem('easterEgg0')
      .then(
        data => {
          let toast = this.toastCtrl.create({
            message: 'Tu as déjà trouvé ce ticket.',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        },
        error => {
          this.nativeStorage.setItem('easterEgg0', "true")
            .then(
              () => console.log('easterEgg0'),
              error => console.error('Error storing item', error)
            );
          let toast = this.toastCtrl.create({
            message: 'Bravo votre curiosité a été récompensée vous avez gagnez un ticket.\nIl n\'y a pas de conditions générales.',
            duration: 3000,
            position: 'middle'
          });

          toast.onDidDismiss(() => {
            GlobalVarsProvider.instance.updateNombreTicket(1);
            console.log('Dismissed toast');
          });

          toast.present();

        }
      );




  }
}