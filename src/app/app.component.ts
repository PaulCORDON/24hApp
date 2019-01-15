import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import {SQLiteService} from "../SQLite/SQLiteService"
import *as firebase from 'firebase';
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      sqliteService.createDataBaseFile();
      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(()=>{
        this.showTimer = true;
      },4000)
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
