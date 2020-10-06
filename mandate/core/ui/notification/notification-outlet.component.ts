import {Component} from '@angular/core';
import {NotificationService} from './notification.service';

@Component({
    templateUrl: './notification-outlet.component.html',
    selector: '<man-notification-outlet></man-notification-outlet>',
    host: {
        'class': 'man-notification-outlet'
    }
})
export class NotificationOutletComponent {
    constructor(public notification: NotificationService) {

    }
}
