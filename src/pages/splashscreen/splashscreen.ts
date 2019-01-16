import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoriquePage } from '../historique/historique';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { SlideTutoPage } from '../slide-tuto/slide-tuto';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

/**
 * Generated class for the SplashscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {
  splash = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashscreenPage');
    setTimeout(() => {
      this.splash = false;
      this.nativeStorage.getItem('premiereOuvertureDeLappli')
        .then(
          data => {
            GlobalVarsProvider.instance.setTimerVisibility(true);
            this.navCtrl.setRoot(TabsPage);
          },
          error => {
            this.navCtrl.setRoot(SlideTutoPage);
          }
        );

    }, 4000);

  }

}
