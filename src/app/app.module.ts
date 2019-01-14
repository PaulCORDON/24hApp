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

import { FirebaseProvider } from '../providers/firebase/firebase';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    MyApp,
    DefisPage,
    HistoriquePage,
    TabsPage,
    SplashscreenPage,
    ConcoursPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DefisPage,
    HistoriquePage,
    TabsPage,
    SplashscreenPage,
    ConcoursPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SQLiteService,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Infos24hProvider,
    FirebaseProvider
  ]
})
export class AppModule { }
