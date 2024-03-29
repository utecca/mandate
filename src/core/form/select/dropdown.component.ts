import { AfterViewInit, Component, EventEmitter, HostListener, Input, Output, ViewChild, ViewChildren } from '@angular/core';
import { OptionListRef } from '../shared/option-list-ref';

@Component({
    templateUrl: './dropdown.component.html',
    selector: 'man-select-dropdown',
})
export class DropdownComponent implements AfterViewInit {
    @Input() public optionListRef: OptionListRef;
    @Input() public tindex: number;
    public _value: any;
    @Input() disableCreate: boolean = false;

    @Input() set value(value) {
        this._value = value;
    }
    @Output() public newValue = new EventEmitter();
    @Output() public clickCreate = new EventEmitter<string>();

    @ViewChild('filter') public filterInput;
    @ViewChild('dropdown') public dropdown;
    @ViewChildren('options') public options;

    public focusedOption = 0;
    public filterText = '';
    public _config = {
        filter: true
    };

    ngAfterViewInit() {
        // Focus the filterInput input or the dummy focus trap.
        this.filterInput.nativeElement.focus();

        // Subscribe to blur-events on the filterInput input
        this.filterInput.nativeElement.addEventListener('blur', ($event) => {
            // console.log('EVENT', $event);
            // this.inputMenuRef.close(false);
            // TODO check if new activeElement is inside the dropdown.
            // TODO If not, close the menu. If it is, and the clicked element was not a new value, refocus the input
        });

        this.optionListRef.options().then((options) => {
            // Find the currently selected option if it is available in currentOptions
            this.optionListRef.currentOptions.value.forEach((option, index) => {
                if (option.value === this._value) {
                    this.setFocusedOption(index);
                }
            });
        });
    }

    public onFilter(event): void {
        this.optionListRef.options(event.target.value.toLowerCase());
        this.focusedOption = 0;
        this.filterText = event.target.value;
    }

    public setValue(value: any): void {
        this.newValue.emit(value);
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

    public onCreateClick(): void {
        this.clickCreate.emit(this.filterText);
    }

    @HostListener('document:keydown', ['$event'])
    public handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (this.focusedOption - 1 >= 0) {
                    this.setFocusedOption(this.focusedOption - 1);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (this.focusedOption + 1 < this.optionListRef.currentOptions.value.length) {
                    this.setFocusedOption(this.focusedOption + 1);
                }
                break;
            case 'Tab':
            case 'Enter':
                if (this.optionListRef.currentOptions.value.length === 0) {
                    this.onCreateClick();
                } else {
                    if (this.optionListRef.currentOptions.value[this.focusedOption]) {
                        this.setValue(this.optionListRef.currentOptions.value[this.focusedOption].value);
                    }
                }
                break;
        }
    }
}
