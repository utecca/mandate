import { ContentChild, Directive, EventEmitter, HostListener, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

@Directive({
    selector: '[mandateDropdown]',
    exportAs: 'mandateDropdown',
    host: {
        'class': 'dropdown',
        '[class.show]': 'isOpen()',
    }
})
export class DropdownDirective implements OnInit , OnDestroy {
    @ContentChild(DropdownMenuDirective, {static: false}) private _menu: DropdownMenuDirective;

    @ContentChild(DropdownToggleDirective, {static: false}) private _toggle: DropdownToggleDirective;

    @Input() public autoClose: boolean | 'outside' | 'inside'; // TODO Necessary?

    @Input('open') _open = false;

    @Output() openChange = new EventEmitter();

    private _zoneSubscription: any;

    constructor(
        public ngZone: NgZone
    ) {
        this.autoClose = true;
        this._zoneSubscription = ngZone.onStable.subscribe(() => { });
    }

    ngOnInit() {
    }

    /**
     * Checks if the dropdown menu is open or not.
     */
    isOpen(): boolean { return this._open; }

    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    open(): void {
        if (!this._open) {
            this._open = true;
            this.openChange.emit(true);
        }
    }

    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    close(): void {
        if (this._open) {
            this._open = false;
            this.openChange.emit(false);
        }
    }

    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    @HostListener('document:click', ['$event'])
    closeFromClick(event) {
        if (this.autoClose && event.button !== 2 && !this._isEventFromToggle(event)) {
            if (this.autoClose === true) {
                this.close();
            } else if (this.autoClose === 'inside' && this._isEventFromMenu(event)) {
                this.close();
            } else if (this.autoClose === 'outside' && !this._isEventFromMenu(event)) {
                this.close();
            }
        }
    }

    @HostListener('window:keyup', ['$event'])
    closeFromOutsideEsc(event) {
        if (this.autoClose && event.key === 'Escape') {
            this.close();
        }
    }

    ngOnDestroy() {
        this._zoneSubscription.unsubscribe();
    }

    private _isEventFromToggle(event) {
        return this._toggle ? this._toggle.isEventFrom(event) : false;
    }

    private _isEventFromMenu(event) {
        return this._menu ? this._menu.isEventFrom(event) : false;
    }
}
