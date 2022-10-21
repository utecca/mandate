import {Directive, ElementRef, forwardRef, Inject, Renderer2} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
    selector: '[mandateDropdownMenu]',
    host: {
        '[class.dropdown-menu]': 'true',
        '[class.show]': 'dropdown.isOpen()'
    }
})
export class DropdownMenuDirective {
    isOpen = false;

    constructor(
        @Inject(forwardRef(() => DropdownDirective)) public dropdown,
        private _elementRef: ElementRef,
        private _renderer: Renderer2) {}

    isEventFrom($event) {
        return this._elementRef.nativeElement.contains($event.target); }
}
