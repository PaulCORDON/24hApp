import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import {SQLiteService} from "../SQLite/SQLiteService"

import { TabsPage } from '../pages/tabs/tabs';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { TimerComponent } from '../components/timer/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashscreenPage;
  showTimer = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, sqliteService : SQLiteService) {
    platform.ready().then(() => {
      sqliteService.createDataBaseFile();
      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(()=>{
        this.showTimer = true;
      },4000)
    });
  }
}
