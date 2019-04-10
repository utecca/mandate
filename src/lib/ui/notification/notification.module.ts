import {NgModule} from '@angular/core';
import {NotificationService} from './notification.service';
import {NotificationOutletComponent} from './notification-outlet.component';
import {NotificationComponent} from './notification.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        NotificationOutletComponent,
        NotificationComponent
    ],
    exports: [
        NotificationOutletComponent,
        NotificationComponent,
    ],
    providers: [
    ],
    imports: [
        CommonModule
    ]
})
export class NotificationModule { }
