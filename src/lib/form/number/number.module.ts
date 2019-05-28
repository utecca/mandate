import { NgModule } from '@angular/core';
import { NumberComponent } from './number.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NumberComponent,
    ],
    exports: [
        NumberComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class NumberModule { }
