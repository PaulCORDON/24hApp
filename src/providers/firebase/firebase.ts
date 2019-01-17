
import { Injectable } from '@angular/core';
import { Participation } from '../../model/Participation';
import * as firebase from 'firebase'
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  ref:firebase.database.Reference;

  constructor(protected nativeStorage:NativeStorage) {
    console.log('Hello FirebaseProvider Provider');
  }

  addParticipation(participation: Participation):firebase.database.Reference {
    let ref = firebase.database().ref("Participation/").push()
    
    ref.set({
      nom : participation.nom,
      prenom : participation.prenom,
      mail: participation.mail,
      tel : participation.tel,
      nbTicket : participation.nbTicket
    });
    console.log("addParticipation : " + ref);

    return ref;
  }

  getParticipation(ref : firebase.database.Reference):Promise<Participation> {
    console.log("getParticipation : " + ref);
    return new Promise<Participation>((resolve, reject) => {      
      ref.on('value', res => {
        let participation = new Participation();
        participation.nom=res.child("nom").val();
        participation.prenom=res.child("prenom").val();
        participation.mail=res.child("mail").val();
        participation.tel=res.child("tel").val();
        participation.nbTicket=res.child("nbTicket").val();
        resolve(participation);
      })
    })
  }

  updateParticipation(ref : firebase.database.Reference,participation : Participation) {     
    console.log("updateParticipation : " + ref);
    ref.set({
      nom : participation.nom,
      prenom : participation.prenom,
      mail: participation.mail,
      tel : participation.tel,
      nbTicket : participation.nbTicket
    });
  }
}
