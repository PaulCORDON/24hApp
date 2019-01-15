import { Component, NgZone } from '@angular/core';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  public time:string;

  constructor(private zone: NgZone) {
    GlobalVarsProvider.events.subscribe('timeChanged',()=>{
      this.zone.run(()=>{
        this.time = GlobalVarsProvider.instance.getTimer();
       // console.log("timer component" + this.time)
      });
    });
   }
}
