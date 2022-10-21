import { AfterViewInit, Component, HostListener, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { InputMenuRef } from '../../shared/input-menu/input-menu-ref';
import { isDescendant } from 'ngx-plumber';
import { Subscription } from 'rxjs';

@Component({
    selector: 'man-select-dropdown',
    templateUrl: 'select-dropdown.component.html'
})
export class SelectDropdownComponent implements OnDestroy, AfterViewInit {

    @ViewChild('filter') public filterInput;
    @ViewChild('dropdown') public dropdown;
    @ViewChild('optionsContainer') public optionsContainer;
    @ViewChildren('options') public options;

    private keySubscription: Subscription;

    public focusedOption = 0;
    public filterText = '';

    public _config = {
        filter: true
    };

    constructor(public inputMenuRef: InputMenuRef<any>) {
        this.initKeyEventListeners();

        // Fetch options
        // this.inputMenuRef.data.optionList.options('');
    }

    ngAfterViewInit() {
        // Focus the filterInput input or the dummy focus trap.
        this.filterInput.nativeElement.focus();

        this.inputMenuRef.markAsOpen();

        // TODO remove listeners again after destroy

        // Subscribe to blur-events on the filterInput input
        this.filterInput.nativeElement.addEventListener('blur', ($event) => {
            // console.log('EVENT', $event);
            // this.inputMenuRef.close(false);
            // TODO check if new activeElement is inside the dropdown.
            // TODO If not, close the menu. If it is, and the clicked element was not a new value, refocus the input
        });

        // Find the currently selected option if it is available in currentOptions
        /*this.inputMenuRef.data.optionList.currentOptions.value.forEach((option, index) => {
            if (option.value === this.inputMenuRef.data.value.value) {
                this.setFocusedOption(index);
            }

        });*/
    }

    public onFilter(event): void {
        this.inputMenuRef.data.optionListRef.options(event.target.value.toLowerCase());
        this.focusedOption = 0;
        this.filterText = event.target.value;
    }

    public setValue(value: any): void {
        this.inputMenuRef.data.value.next(value);
        this.inputMenuRef.close();
    }

    public setFocusedOption(index: number): void {
        this.focusedOption = index;

        // Set timeout in order to wait for UI to update.
        setTimeout(() => {
            this.options.toArray().forEach((option) => {
                // console.log('OPTS', option.nativeElement.classList);
                if (option.nativeElement.classList.contains('focus')) {
                    option.nativeElement.scrollIntoView();
                }
            });
        }, 0);
    }

    public createOption(): void {
        if (this.inputMenuRef.data.optionListRef._optionList.createOptionCallback) { // TODO Is this enough filtering?
            this.inputMenuRef.close();
            this.inputMenuRef.data.optionListRef._optionList.createOptionCallback(this.filterText)
                .then(
                    success => {
                        this.setValue(success);

                        // Focus the input
                        this.inputMenuRef.data.inner.nativeElement.focus();

                        // Refetch the options
                        this.inputMenuRef.data.optionListRef.options();
                    },
                    error => {}
                );
        }
    }

    ngOnDestroy() {
        this.keySubscription.unsubscribe();
    }

    private initKeyEventListeners(): void {
        this.keySubscription = this.inputMenuRef._overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => { // TODO Unsubscribe
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (this.focusedOption - 1 >= 0) {
                        this.setFocusedOption(this.focusedOption - 1);
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (this.focusedOption + 1 < this.inputMenuRef.data.optionListRef.currentOptions.value.length) {
                        this.setFocusedOption(this.focusedOption + 1);
                    }
                    break;
                case 'Tab':
                case 'Enter':
                    if (event.key !== 'Tab') {
                        event.preventDefault();
                    }
                    if (this.inputMenuRef.data.optionListRef.currentOptions.value.length === 0) {
                        this.createOption();
                    } else {
                        if (this.inputMenuRef.data.optionListRef.currentOptions.value[this.focusedOption]) {
                            this.setValue(this.inputMenuRef.data.optionListRef.currentOptions.value[this.focusedOption].value);
                        }
                    }
                    break;
            }
        });
    }

    @HostListener('document:click', ['$event'])
    public clickEventListener(event: MouseEvent) {
        // TODO Also restore focus if the element itself is clicked!
        console.log('Click', event);
        if (this.inputMenuRef.isOpen) {
            if (isDescendant(this.dropdown.nativeElement, event.target)) {
                if (!(<HTMLInputElement>event.target).classList.contains('option')) {
                    this.filterInput.nativeElement.focus();
                }
                // Do nothing - the event is handled elsewhere
            } else {
                this.inputMenuRef.close(false);
            }
        }
    }
}
