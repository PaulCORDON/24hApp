import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DefisPage } from '../pages/defis/defis';
import { ConcoursPage } from '../pages/concours/concours';
import { HistoriquePage } from '../pages/historique/historique';
import { Infos24hProvider } from '../providers/infos24h/infos24h';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteService } from '../SQLite/SQLiteService';

@NgModule({
  declarations: [
    MyApp,
    DefisPage,
    ConcoursPage,
    HistoriquePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DefisPage,
    ConcoursPage,
    HistoriquePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SQLiteService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Infos24hProvider
  ]
})
export class AppModule {}
