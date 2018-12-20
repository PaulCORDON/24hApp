import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcoursPage } from './concours';

@NgModule({
  declarations: [
    ConcoursPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcoursPage),
  ],
})
export class ConcoursPageModule {}
