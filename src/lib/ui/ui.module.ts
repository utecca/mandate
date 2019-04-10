import { NgModule } from '@angular/core';
import { TableModule } from './table/table.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { ChecklistModule } from './checklist/checklist.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';


@NgModule({
  imports: [
      ChecklistModule,
      DialogModule,
      DropdownModule,
      NotificationModule,
      ProgressBarModule,
      TableModule
  ],
  declarations: [],
  exports: [
      ChecklistModule,
      DialogModule,
      DropdownModule,
      NotificationModule,
      ProgressBarModule,
      TableModule
  ]
})
export class UiModule { }
