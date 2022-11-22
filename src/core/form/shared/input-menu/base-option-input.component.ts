import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Option } from '../interfaces/option';
import { OptionService } from '../option.service';
import { ElementRef, HostListener, Injector, Input, OnDestroy, ViewChild, Directive, Component } from '@angular/core';
import { SelectDropdownComponent } from '../../select/inner/select-dropdown.component';
import { BaseDropdownInputComponent } from './base-dropdown-input.component';
import { OptionListRef } from '../option-list-ref';
import { BehaviorSubject } from 'rxjs';

@Component({
    template: '',
})
export abstract class BaseOptionInputComponent extends BaseDropdownInputComponent implements OnDestroy {

    /** The inner element, is the actual input. */
    @ViewChild('inner', {static: true}) inner;

    /**
     * Contains the OptionList if global mode is selected.
     */
    public _optionListRef: OptionListRef;

    public _placeholder = new BehaviorSubject<string>('');

    public _placeholderInOptions = new BehaviorSubject<boolean>(true);

    @Input()
    private set options(options: Option[] | string | ((filter: string) => Option[])) {
        this._optionListRef = this._optionService.get(options, this._value, this._placeholder, this._placeholderInOptions);
        // TODO Subscribe to valuechanges!
    }

    @Input()
    private set exclude(values: number[]) {
        this._optionListRef.exclude(values);
    }

    @Input()
    public set placeholder(value) {
        if (value !== this._placeholder.value) {
            this._placeholder.next(value);
        }
    }

    @Input()
    public set placeholderInOptions(value: boolean) {
        if (value !== this._placeholderInOptions.value) {
            this._placeholderInOptions.next(value);
        }
    }

    constructor(
        element: ElementRef,
        overlay: Overlay,
        injector: Injector,
        optionService: OptionService,
        sso: ScrollStrategyOptions
    ) {
        super(element, overlay, injector, optionService, sso);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    @HostListener('click')
    @HostListener('keydown', ['$event'])
    public open(event: KeyboardEvent = null): void {
        if (!this._disabled) {
            if (event !== null) {
                if (event.key.length === 1 || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    event = null;
                }
            }

            if (event === null) {
                this.openDropdown(
                    SelectDropdownComponent,
                    {
                        optionListRef: this._optionListRef,
                        value: this._value,
                        inner: this.inner
                    }
                );
            }
        }
    }
}
