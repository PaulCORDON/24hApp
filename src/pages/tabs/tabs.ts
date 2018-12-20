import { Component } from '@angular/core';


import { HistoriquePage } from '../historique/historique';
import { DefisPage } from '../defis/defis';
import { ConcoursPage } from '../concours/concours';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistoriquePage;
  tab2Root = DefisPage;
  tab3Root = ConcoursPage;

  constructor() {

  }
}
