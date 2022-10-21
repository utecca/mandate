import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {InputMenuContainerComponent} from './input-menu-container.component';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    declarations: [
        InputMenuContainerComponent
    ],
    entryComponents: [
        InputMenuContainerComponent
    ],
    exports: [
        InputMenuContainerComponent
    ]
})
export class InputMenuModule { }
