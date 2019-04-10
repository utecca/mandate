import {Component, Input} from '@angular/core';

@Component({
    templateUrl: './checklist-item.component.html',
    selector: '<man-checklist-item></man-checklist-item>',
    host: {
        'class': 'man-checklist-item',
        '[class.valid]': 'valid',
        '[class.invalid]': '!valid'
    }
})
export class ChecklistItemComponent {
    @Input('label') label: string;
    @Input('description') description: string;
    @Input('valid') valid: boolean;
}
