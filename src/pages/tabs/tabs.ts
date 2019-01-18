import { Component } from '@angular/core';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { ConcoursPage } from '../concours/concours';
import { DefisPage } from '../defis/defis';
import { HistoriquePage } from '../historique/historique';

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
    GlobalVarsProvider.events.subscribe('nombreTicketChanged', () => {
      GlobalVarsProvider.instance.getNombreTicket().then((val) => {
        this.nombreTicket = val;
      });
    });

    GlobalVarsProvider.instance.getNombreTicket().then((val) => {
      this.nombreTicket = val;
    })
  }
}