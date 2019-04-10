import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        TextComponent,
    ],
    exports: [
        TextComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class TextModule { }
