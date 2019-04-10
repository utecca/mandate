import { NgModule } from '@angular/core';
import { MandateComponent } from './mandate.component';
import { FormModule } from './form/form.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [MandateComponent],
  imports: [
      FormModule,
      UiModule
  ],
  exports: [
      FormModule,
      UiModule
  ]
})
export class MandateModule { }
