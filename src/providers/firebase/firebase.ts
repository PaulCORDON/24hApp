
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import * as firebase from 'firebase';
import { Participation } from '../../model/Participation';

@Injectable()
export class FirebaseProvider {

  ref: firebase.database.Reference;

  constructor(protected nativeStorage: NativeStorage) { }

  addParticipation(participation: Participation): firebase.database.Reference {
    let ref = firebase.database().ref("Participation/").push()

    ref.set({
      nom: participation.nom,
      prenom: participation.prenom,
      mail: participation.mail,
      tel: participation.tel,
      nbTicket: participation.nbTicket
    });
    return ref;
  }

  getParticipation(ref: firebase.database.Reference): Promise<Participation> {
    return new Promise<Participation>((resolve, reject) => {
      ref.on('value', res => {
        let participation = new Participation();
        participation.nom = res.child("nom").val();
        participation.prenom = res.child("prenom").val();
        participation.mail = res.child("mail").val();
        participation.tel = res.child("tel").val();
        participation.nbTicket = res.child("nbTicket").val();
        resolve(participation);
      })
    })
  }

  updateParticipation(ref: firebase.database.Reference, participation: Participation) {
    ref.set({
      nom: participation.nom,
      prenom: participation.prenom,
      mail: participation.mail,
      tel: participation.tel,
      nbTicket: participation.nbTicket
    });
  }
}