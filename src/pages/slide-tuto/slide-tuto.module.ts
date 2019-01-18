import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideTutoPage } from './slide-tuto';

@NgModule({
  declarations: [
    SlideTutoPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideTutoPage),
  ],
})
export class SlideTutoPageModule { }