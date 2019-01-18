import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';
import { Events, Platform } from 'ionic-angular';
import { SQLiteService } from "../SQLite/SQLiteService";
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SplashscreenPage;
  showTimer: boolean;

  public static event: Events;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, sqliteService: SQLiteService, event: Events) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      MyApp.event = event;
      event.subscribe('timerVisibilityChanged', () => {
        console.log("event timerVisibilityChanged")
        this.showTimer = GlobalVarsProvider.instance.getTimerVisibility();
      });
      this.showTimer = GlobalVarsProvider.instance.getTimerVisibility();
    });

    var config = {
      apiKey: "AIzaSyAUX6GiF2zOiHCseXho3qUWUHNb5V3aj7k",
      authDomain: "app24hcode.firebaseapp.com",
      databaseURL: "https://app24hcode.firebaseio.com",
      projectId: "app24hcode",
      storageBucket: "app24hcode.appspot.com",
      messagingSenderId: "957300827901"
    };
    firebase.initializeApp(config);
  }
}