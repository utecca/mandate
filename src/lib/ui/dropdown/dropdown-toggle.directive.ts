import {Directive, ElementRef, forwardRef, Inject} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
    selector: '[mandateDropdownToggle]',
    host: {
        'class': 'dropdown-toggle',
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'dropdown.isOpen()',
        '(click)': 'toggleOpen()'
    }
})
export class DropdownToggleDirective {
    anchorEl;

    constructor(@Inject(forwardRef(() => DropdownDirective)) public dropdown,
                private _elementRef: ElementRef
    ) {
        this.anchorEl = _elementRef.nativeElement;
    }

    toggleOpen() {
        console.log('CLICK');
        this.dropdown.toggle();
    }

    isEventFrom($event) {
        return this._elementRef.nativeElement.contains($event.target);
    }
}
