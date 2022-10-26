import { NgModule } from '@angular/core';
import { NumberComponent } from './number.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NumberComponent,
    ],
    exports: [
        NumberComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class NumberModule { }
