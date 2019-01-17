import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import {SQLiteService} from "../SQLite/SQLiteService"
import *as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { TimerComponent } from '../components/timer/timer';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { QuestionPage } from '../pages/question/question';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashscreenPage;
  showTimer:boolean;

  public static event:Events;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, sqliteService : SQLiteService, event:Events) {
    platform.ready().then(() => {
      sqliteService.createDataBaseFile();
      statusBar.styleDefault();
      splashScreen.hide();

      MyApp.event = event;
      event.subscribe('timerVisibilityChanged', () => {
        this.showTimer = GlobalVarsProvider.instance.getTimerVisibility();
      });
      this.showTimer = GlobalVarsProvider.instance.getTimerVisibility();
      
      setTimeout(()=>{
        GlobalVarsProvider.instance.setTimerVisibility(true);
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
