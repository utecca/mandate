import {NgModule} from '@angular/core';
import {ProgressBarComponent} from './progress-bar.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        ProgressBarComponent
    ],
    exports: [
        ProgressBarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProgressBarModule {

}
