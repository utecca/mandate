import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { UiModule } from './ui/ui.module';

@NgModule({
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
