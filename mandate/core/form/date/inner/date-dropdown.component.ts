import { AfterViewInit, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { InputMenuRef } from '../../shared/input-menu/input-menu-ref';
import { isDescendant } from 'ngx-plumber';

@Component({
    selector: 'man-date-dropdown',
    templateUrl: 'date-dropdown.component.html'
})
export class DateDropdownComponent implements OnDestroy, AfterViewInit {

    @ViewChild('dropdown') public dropdown;

    public _config = {
        filter: true
    };

    constructor(public inputMenuRef: InputMenuRef<any>) {
        this.initKeyEventListeners();
    }

    ngAfterViewInit() {
    }

    public setValue(value: any): void {
        console.log('AXA SET VAL', value);
        this.inputMenuRef.data.value.next(value);
        this.inputMenuRef.close();
    }


    ngOnDestroy() {
    }

    private initKeyEventListeners(): void {
        /*this.keySubscription = this.inputMenuRef._overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':     break;
                case 'ArrowDown':   break;
                case 'Enter':   break;
                case 'Tab':
                    this.inputMenuRef.close(true);
                    // event.preventDefault();
                    break;
            }
        });*/
    }

    @HostListener('document:click', ['$event'])
    public clickEventListener($event: Event) {
        console.log('::: Click detected.');

        if (this.inputMenuRef.isOpen) {
            if (isDescendant(this.dropdown.nativeElement, $event.srcElement)) {
                // this.filterInput.nativeElement.focus();
            } else {
                this.inputMenuRef.close(false);
                console.log('::: FOCUS AFTER CLICK');
            }
        }


    }
}
