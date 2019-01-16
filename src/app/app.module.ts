import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';
import { ConcoursPage } from '../pages/concours/concours';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DefisPage } from '../pages/defis/defis';
import { HistoriquePage } from '../pages/historique/historique';
import { Infos24hProvider } from '../providers/infos24h/infos24h';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteService } from '../SQLite/SQLiteService';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';


var config = {
  apiKey: "AIzaSyAUX6GiF2zOiHCseXho3qUWUHNb5V3aj7k",
  authDomain: "app24hcode.firebaseapp.com",
  databaseURL: "https://app24hcode.firebaseio.com",
  projectId: "app24hcode",
  storageBucket: "app24hcode.appspot.com",
  messagingSenderId: "957300827901"
};

import { ComponentsModule } from '../components/components.module';
import { NativeStorage } from '@ionic-native/native-storage';
import { SlideTutoPage } from '../pages/slide-tuto/slide-tuto';


@NgModule({
  declarations: [
    MyApp,
    DefisPage,
    HistoriquePage,
    TabsPage,
    SplashscreenPage,
    ConcoursPage,
    SlideTutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DefisPage,
    HistoriquePage,
    TabsPage,
    SplashscreenPage,
    ConcoursPage,
    SlideTutoPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SQLiteService,
    NativeStorage,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Infos24hProvider,
    FirebaseProvider
  ]
})
export class AppModule { }
