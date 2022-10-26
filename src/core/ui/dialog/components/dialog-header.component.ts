import { Component, Input } from '@angular/core';
import { DialogRef } from '../dialog-ref';

@Component({
    templateUrl: 'dialog-header.component.html',
    selector: '<man-dialog-header></man-dialog-header>',
    host: {
        'class': 'man-dialog-header'
    }
})
export class DialogHeaderComponent {
    @Input() dialogRef: DialogRef<any>;
}
