import {Notification} from './notification';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private nextNotificationId = 0;
    readonly notificationIds = [];
    readonly notifications = {};

    constructor() {
    }


    public show(title: string, text?: string, type?: string, timeout?: number, icon?: string): Notification {
        const notification = new Notification(title, text, type, icon);
        const notificationId = this.nextNotificationId;
        this.nextNotificationId++;

        // Add the notification to the notifications arrays
        this.notifications[notificationId] = notification;
        this.notificationIds.push(notificationId);

        if (typeof timeout === 'undefined') {
            timeout = 5000;
        }

        // Set a timer if the timeout != 0
        if (timeout !== 0) {
            setTimeout(() => {
                this.hideNotification(notificationId);
            }, timeout);
        }

        return notification;
    }

    /**
     * Remove a notification
     */
    public hideNotification(id: number): void {
        this.notificationIds.splice(this.notificationIds.indexOf(id), 1);
    }

    /**
     * Remove a notification. It must be hidden before it can be deleted.
     */
    public removeNotification(id: number): void {
        if (!this.notificationIds.indexOf(id)) {
            delete this.notifications[id];
        } else {
            throw new Error('A notification must be hidden before it can be removed.');
        }
    }
}
