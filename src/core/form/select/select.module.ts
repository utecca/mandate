import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectDropdownComponent } from './inner/select-dropdown.component';

@NgModule({
    declarations: [
        SelectComponent,
        SelectDropdownComponent
    ],
    entryComponents: [
        SelectDropdownComponent
    ],
    exports: [
        SelectComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SelectModule { }
