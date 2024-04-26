import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';
import { DateDropdownComponent } from './inner/date-dropdown.component';

@NgModule({
    declarations: [
        DateComponent,
        DateDropdownComponent
    ],
    exports: [
        DateComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DateModule { }
