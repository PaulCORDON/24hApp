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

  public hide() {
    let tabs = document.querySelectorAll('.tabbar');
    let scrollContent = document.querySelectorAll('.scroll-content');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });

      // fix for removing the margin if you got scorllable content
      setTimeout(() =>{
        Object.keys(scrollContent).map((key) => {
          scrollContent[key].style.marginBottom = '0';
        });
      })
    }
  }

  public show() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(0px)';
      });
    }
  }
}
