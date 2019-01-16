import { Component } from '@angular/core';
import { HistoriquePage } from '../historique/historique';
import { DefisPage } from '../defis/defis';
import { ConcoursPage } from '../concours/concours';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistoriquePage;
  tab2Root = DefisPage;
  tab3Root = ConcoursPage;

  public nombreTicket = 0;

  public timer;

  constructor() {
    console.log(GlobalVarsProvider.instance.getTimer());

    GlobalVarsProvider.events.subscribe('nombreTicketChanged',()=>{
      GlobalVarsProvider.instance.getNombreTicket().then((val)=>{
        this.nombreTicket =val;
        console.log("event nombreTicketChanged " + this.nombreTicket)
      });      
    });

    GlobalVarsProvider.instance.getNombreTicket().then((val) => {
      this.nombreTicket = val;
    })
  }
}
