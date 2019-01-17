import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
/**
 * Generated class for the SlideTutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slide-tuto',
  templateUrl: 'slide-tuto.html',
})
export class SlideTutoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideTutoPage');
    GlobalVarsProvider.instance.setTimerVisibility(false);
  }
  slides = [
    {
      title: "Bienvenue sur l'application\ndes 24H du code",
      description: "En <b>relevant les défis</b> proposés par cette application vous pourrez participer à un concours pour tenter de gagner UN GROS CADEAU.",
      image: "assets/img/slide1.png",
    },
    {
      title: "Comment relever les défis ?",
      description: "Rien de plus<b> simple</b> il suffit de cliquer sur les défis disponibles. Une fois le défi terminé vous gagnerez un ticket pour participer au concours",
      image: "assets/img/slide2.png",
    },
    {
      title: "Comment participer au concours ?",
      description: "Il vous suffira de selectionner <b>l'onglet concours</b>, de remplir les informations demandées et d'envoyer votre participation.",
      image: "assets/img/slide3.png",
    }
  ];

  suivant() {
    this.nativeStorage.setItem('premiereOuvertureDeLappli', "true")
      .then(
        () =>{
          console.log('premiereOuvertureDeLappli');
          GlobalVarsProvider.instance.setTimerVisibility(true);
          this.navCtrl.setRoot(TabsPage);
        },
        error => console.error('Error storing item', error)
      );
  }
}
