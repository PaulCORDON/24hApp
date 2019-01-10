import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';

@Injectable()
export class GlobalVarsProvider {

  public static instance:GlobalVarsProvider = new GlobalVarsProvider();
  
  private nombreTicket:number = 0;

  private constructor() {
    
  }

  public getNombreTicket():number{
    return this.nombreTicket;
  }

  public updateNombreTicket(n:number):number{
    this.nombreTicket += n;
    TabsPage.events.publish('nombreTicketChanged');
    return this.nombreTicket;
  }

}
