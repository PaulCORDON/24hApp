import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLiteService } from '../SQLite/SQLiteService';
import { ComponentsModule } from '../components/components.module';
import { ConcoursPage } from '../pages/concours/concours';
import { DefisPage } from '../pages/defis/defis';
import { HistoriquePage } from '../pages/historique/historique';
import { QuestionPage } from '../pages/question/question';
import { QuestionPageModule } from '../pages/question/question.module';
import { SlideTutoPage } from '../pages/slide-tuto/slide-tuto';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { TabsPage } from '../pages/tabs/tabs';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { Infos24hProvider } from '../providers/infos24h/infos24h';
import { MyApp } from './app.component';

var config = {
  apiKey: "AIzaSyAUX6GiF2zOiHCseXho3qUWUHNb5V3aj7k",
  authDomain: "app24hcode.firebaseapp.com",
  databaseURL: "https://app24hcode.firebaseio.com",
  projectId: "app24hcode",
  storageBucket: "app24hcode.appspot.com",
  messagingSenderId: "957300827901"
};

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
    ComponentsModule,
    QuestionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DefisPage,
    HistoriquePage,
    TabsPage,
    SplashscreenPage,
    ConcoursPage,
    SlideTutoPage,
    QuestionPage
  ],
  providers: [
    StatusBar,
    Network,
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
