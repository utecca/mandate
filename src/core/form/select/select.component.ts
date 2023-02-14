import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormInputComponent } from '../form-input.component';
import { Option } from '../shared/interfaces/option';
import { CdkConnectedOverlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { BehaviorSubject } from 'rxjs';
import { OptionListRef } from '../shared/option-list-ref';
import { isDescendant } from 'ngx-plumber';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    templateUrl: './select.component.html',
    selector: 'man-select',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ]
})
export class SelectComponent extends FormInputComponent {
    public isOpen = false;
    public scrollStrategy: ScrollStrategy;
    public optionListRef: OptionListRef;
    public _placeholderInOptions = new BehaviorSubject<boolean>(true);

    @ViewChild('input') private input;
    @ViewChild('origin') private origin;
    @ViewChild('overlay') private overlay: CdkConnectedOverlay;

    @Input() disableCreate: boolean = false

    @Input()
    private set options(options: Option[] | string | ((filter: string) => Option[])) {
        this.optionListRef = this.optionService.get(options, this._value, this._placeholder, this._placeholderInOptions);
    }

    @Input()
    public set placeholderInOptions(value: boolean) {
        if (value !== this._placeholderInOptions.value) {
            this._placeholderInOptions.next(value);
        }
    }

    @Input()
    public set placeholder(input: string) {
        if (typeof input !== 'undefined') {
            if (input === '') {
                input = '-- Vælg --';  // TODO: Get default text from settings.
            }
            this._placeholder.next(input);
        } else {
            this._placeholder = null;
        }
    }

    constructor(
        sso: ScrollStrategyOptions,
        private optionService: OptionService,
    ) {
        super();
        this.scrollStrategy = sso.close();
    }

    public onOutsideClick(event: MouseEvent): void {
        // Ignore the click if the origin was clicked. CDK will take care of detaching the overlay
        if (!isDescendant(this.origin.elementRef.nativeElement, event.target)) {
            this.isOpen = false;
        }
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (this._disabled) {
            return;
        }
        if (event.key.length === 1 || ['ArrowUp', 'ArrowDown'].includes(event.key)) {
            this.isOpen = true;
        }
    }

    public onClickCreate(text: string): void {
        this.isOpen = false;
        // this.inputMenuRef.close();
        this.optionListRef._optionList.createOptionCallback(text)
            .then(
                success => {
                    this._value.next(success);

                    // Focus the input
                    this.input.nativeElement.focus();

                    // Refetch the options
                    this.optionListRef.options();
                },
                error => {}
            );
    }

    public focus(): void {
        this.input.nativeElement.focus();
    }

    public onClick(): void {
        if (this._disabled) {
            return;
        }

        this.isOpen = !this.isOpen;
    }
}
