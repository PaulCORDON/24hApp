import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimerComponent } from './timer/timer';

@NgModule({
	declarations: [TimerComponent],
	imports: [],
	exports: [TimerComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
