import { AfterViewInit, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { InputMenuRef } from '../../shared/input-menu/input-menu-ref';
import { isDescendant } from 'ngx-plumber';
import { Subscription } from 'rxjs';

@Component({
    selector: 'man-select-dropdown',
    templateUrl: 'select-dropdown.component.html'
})
export class SelectDropdownComponent implements OnDestroy, AfterViewInit {

    @ViewChild('filter') public filter;
    @ViewChild('dropdown') public dropdown;

    private keySubscription: Subscription;

    public _config = {
        filter: true
    };

    constructor(public inputMenuRef: InputMenuRef<any>) {
        this.initKeyEventListeners();
    }

    ngAfterViewInit() {
        console.log('FOCUSING...', this.filter.nativeElement);

        // Focus the filter input or the dummy focus trap.
        this.filter.nativeElement.focus();

        this.inputMenuRef.markAsOpen();

        // TODO remove listeners again after destroy

        // Subscribe to blur-events on the filter input
        this.filter.nativeElement.addEventListener('blur', ($event) => {
            console.log('EVENT', $event);
            // this.inputMenuRef.close(false);
            // TODO check if new activeElement is inside the dropdown.
            // TODO If not, close the menu. If it is, and the clicked element was not a new value, refocus the input
        });



    }

    public onFilter(event): void {
        this.inputMenuRef.data.optionList.options(event.srcElement.value.toLowerCase());
        // this.inputMenuRef.data.filter.next(event.srcElement.value.toLowerCase());
    }

    public setValue(value: any): void {
        console.log('AXA SET VAL', value);
        this.inputMenuRef.data.value.next(value);
        this.inputMenuRef.close();
    }


    ngOnDestroy() {
        this.keySubscription.unsubscribe();
    }

    private initKeyEventListeners(): void {
        this.keySubscription = this.inputMenuRef._overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':     break;
                case 'ArrowDown':   break;
                case 'Enter':   break;
                case 'Tab':
                    this.inputMenuRef.close(true);
                    // event.preventDefault();
                    break;
            }
        });
    }

    @HostListener('document:click', ['$event'])
    public clickEventListener($event: Event) {
        console.log('::: Click detected.');

        if (this.inputMenuRef.isOpen) {
            if (isDescendant(this.dropdown.nativeElement, $event.srcElement)) {
                this.filter.nativeElement.focus();
            } else {
                this.inputMenuRef.close(false);
                console.log('::: FOCUS AFTER CLICK');
            }
        }


    }
}
