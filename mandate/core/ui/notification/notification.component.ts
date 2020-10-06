import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
    templateUrl: './notification.component.html',
    selector: '<man-notification></man-notification>'
})
export class NotificationComponent implements OnDestroy {
  @Input() data;

  @Output('destroy') destroy = new EventEmitter();

  constructor() { }

  ngOnDestroy() {
      setTimeout(() => {
          this.destroy.emit();
      }, 500);
  }
}
