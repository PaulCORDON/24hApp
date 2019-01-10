import { Injectable } from '@angular/core';

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
    return this.nombreTicket;
  }

}
