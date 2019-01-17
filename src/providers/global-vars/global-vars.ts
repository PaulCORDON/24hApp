import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class GlobalVarsProvider {

  public static instance: GlobalVarsProvider = new GlobalVarsProvider();

  public static events = new Events();

  private nombreTicket: number = 0;
  private timer: string;
  private showTimer: boolean = false;

  private nativeStorage: NativeStorage = new NativeStorage();

  private constructor() {
    this.countdown();
  }

  getTimerVisibility(): boolean {
    return this.showTimer;
  }

  setTimerVisibility(show: boolean): boolean {
    this.showTimer = show;
    console.log("setTimerVisibility " + show);
    MyApp.event.publish('timerVisibilityChanged');
    return this.showTimer;
  }

  private async countdown() {
    let msTimer = new Date("Jan 20, 2019 10:00:00").getTime() - new Date().getTime();
    let sTimer = Math.floor(msTimer / 1000);
    let mTimer = Math.floor(sTimer / 60);
    let hTimer = Math.floor(mTimer / 60);

    let seconde: string;
    if ((sTimer % 60) < 10) {
      seconde = "0" + (sTimer % 60);
    }
    else seconde = "" + (sTimer % 60);

    let minute: string;
    if ((mTimer % 60) < 10) {
      minute = "0" + (mTimer % 60);
    }
    else minute = "" + (mTimer % 60);

    let heure: string;
    if ((hTimer % 24) < 10) {
      heure = "0" + (hTimer % 24);
    }
    else heure = "" + (hTimer % 24);

    this.timer = "" + heure + ":" + minute + ":" + seconde;

    await this.delay(1000)

    GlobalVarsProvider.events.publish('timeChanged');
    this.countdown();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public getNombreTicket(): Promise<number> {

    return this.nativeStorage.getItem('nbTicket')
      .then(
        data => { return data; },
        error => { return 0; }
      );
  }

  public updateNombreTicket(n: number) {
    this.getNombreTicket().then((val) => {
      this.nativeStorage.setItem('nbTicket', val + n)
        .then(
          () => {
            console.log('Stored item!');
            GlobalVarsProvider.events.publish('nombreTicketChanged');
          },
          error => console.error('Error storing item', error)

        );
    });    
    this.nombreTicket += n;
    return this.nombreTicket;

  }

  public getTimer(): string {

    return this.timer;
  }

}
