import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class GlobalVarsProvider {

  public static instance:GlobalVarsProvider = new GlobalVarsProvider();
  
  public static events = new Events();

  private nombreTicket:number = 0;
  private timer:string;

  private constructor() {
    this.countdown();
  }

  private async countdown(){
    let msTimer = new Date("Jan 20, 2019 10:00:00").getTime() - new Date().getTime();
    let sTimer = Math.floor(msTimer/1000);
    let mTimer = Math.floor(sTimer/60);
    let hTimer = Math.floor(mTimer/60);

    let seconde:string;
    if((sTimer%60)<10){
      seconde = "0"+(sTimer%60);
    }
    else seconde = ""+(sTimer%60);

    let minute:string;
    if((mTimer%60)<10){
      minute = "0"+(mTimer%60);
    }
    else minute = ""+(mTimer%60);

    let heure:string;
    if((hTimer%24)<10){
      heure = "0"+(hTimer%24);
    }
    else heure = ""+(hTimer%24);

    this.timer = "" + heure + ":" + minute + ":" + seconde;

    await this.delay(1000)

    GlobalVarsProvider.events.publish('timeChanged');
    this.countdown();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public getNombreTicket():number{
    return this.nombreTicket;
  }

  public updateNombreTicket(n:number):number{
    this.nombreTicket += n;
    GlobalVarsProvider.events.publish('nombreTicketChanged');
    return this.nombreTicket;
  }

  public getTimer():string{
    return this.timer;
  }

}
