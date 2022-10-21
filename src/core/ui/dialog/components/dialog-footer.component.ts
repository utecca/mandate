import {Component, Input} from '@angular/core';
import {DialogRef} from '../dialog-ref';

@Component({
    templateUrl: 'dialog-footer.component.html',
    selector: '<man-dialog-footer></man-dialog-footer>',
    host: {
        'class': 'man-dialog-footer'
    }
})
export class DialogFooterComponent {
    @Input('dialogRef') dialogRef: DialogRef<any>;
}
