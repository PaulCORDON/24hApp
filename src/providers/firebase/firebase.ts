
import { Injectable } from '@angular/core';
import { Participation } from '../../model/Participation';
import * as firebase from 'firebase'

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor() {
    console.log('Hello FirebaseProvider Provider');
  }

  addParticipation(participation: Participation):firebase.database.ThenableReference {
    let ref = firebase.database().ref("Participation/").push()
    console.log(ref);
    ref.set({
      nom : participation.nom,
      prenom : participation.prenom,
      mail: participation.mail,
      tel : participation.tel,
      nbTicket : participation.nbTicket
    });

    return ref;
  }

  getParticipation(ref : firebase.database.ThenableReference):Promise<Participation> {
    console.log(ref);
    return new Promise<Participation>((resolve, reject) => {      
      ref.on('value', res => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        let participation = new Participation();
        participation.nom=res.child("nom").val();
        participation.prenom=res.child("prenom").val();
        participation.mail=res.child("mail").val();
        participation.tel=res.child("tel").val();
        participation.nbTicket=res.child("nbTicket").val();
        console.log(participation.nom +"  FIREBASE.Ts nom");
        resolve(participation);
      })
    })
  }

  updateParticipation(ref : firebase.database.ThenableReference,participation : Participation) {     
    console.log("updateParticipation avant le set");
    console.log(ref);
    ref.set({
      nom : participation.nom,
      prenom : participation.prenom,
      mail: participation.mail,
      tel : participation.tel,
      nbTicket : participation.nbTicket
    });
  }


}
