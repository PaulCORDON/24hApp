import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-slide-tuto',
  templateUrl: 'slide-tuto.html',
})
export class SlideTutoPage {

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {

    

  }

  ionViewDidLoad() {
    GlobalVarsProvider.instance.setTimerVisibility(false);
  }

  slides = [
    {
      title: "Bienvenue sur l'application\ndes 24H du code",
      description: "En <b>relevant les défis</b> proposés par cette application vous pourrez participer à un concours pour tenter de gagner une surprise.",
      image: "assets/imgs/slide1.png",
    },
    {
      title: "Comment relever les défis ?",
      description: "Rien de plus<b> simple</b>, il suffit de cliquer sur les défis disponibles. Une fois chaque défi terminé vous gagnez un ticket pour participer au concours",
      image: "assets/imgs/slide2.png",
    },
    {
      title: "Comment participer au concours ?",
      description: "Il vous suffira de selectionner <b>l'onglet concours</b>, de remplir les informations demandées et d'envoyer votre participation.",
      image: "assets/imgs/slide3.png",
    }
  ];

  suivant() {
    this.nativeStorage.setItem('premiereOuvertureDeLappli', "true")
      .then(
        () => {
          GlobalVarsProvider.instance.setTimerVisibility(true);
          this.navCtrl.setRoot(TabsPage);
        },
        error => console.error('Error storing item', error)
      );
  }
}