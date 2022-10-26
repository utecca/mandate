import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { DropdownComponent } from './dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    declarations: [
        SelectComponent,
        DropdownComponent,
    ],
    exports: [
        SelectComponent,
    ],
    imports: [
        OverlayModule,
        CommonModule,
        A11yModule
    ]
})
export class SelectModule {
}
