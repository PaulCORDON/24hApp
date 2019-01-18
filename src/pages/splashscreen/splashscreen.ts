import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteService } from '../../SQLite/SQLiteService';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { SlideTutoPage } from '../slide-tuto/slide-tuto';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {
  splash = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage, sqliteService: SQLiteService) {
    sqliteService.createDataBaseFile();
  }

  ionViewDidLoad() {
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