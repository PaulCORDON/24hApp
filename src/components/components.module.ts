import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TimerComponent } from './timer/timer';
@NgModule({
	declarations: [TimerComponent],
	imports: [],
	exports: [TimerComponent],
	schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
