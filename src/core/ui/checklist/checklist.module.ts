import {NgModule} from '@angular/core';
import {ChecklistComponent} from './checklist.component';
import {ChecklistItemComponent} from './checklist-item.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ChecklistComponent,
        ChecklistItemComponent
    ],
    exports: [
        ChecklistComponent,
        ChecklistItemComponent
    ]
})
export class ChecklistModule { }
