import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../interfaces/option';
import { OptionService } from '../option.service';
import { ElementRef, HostListener, Injector, Input, OnDestroy, ViewChild } from '@angular/core';
import { SelectDropdownComponent } from '../../select/inner/select-dropdown.component';
import { OptionList } from '../option-list';
import { isFunction } from 'ngx-plumber';
import { OptionListFunction } from '../option-list-function';
import { OptionListArray } from '../option-list-array';
import { BaseDropdownInputComponent } from './base-dropdown-input.component';

export abstract class BaseOptionInputComponent extends BaseDropdownInputComponent implements OnDestroy {

    /** The inner element, is the actual input. */
    @ViewChild('inner', {static: true}) inner;

    /**
     * Contains the OptionList if global mode is selected.
     */
    public _optionList: OptionList;

    /**
     * Contains the selected option (this.value contains the actual value).
     */
    public _selectedOption = new BehaviorSubject<Option>(null);

    @Input()
    private set options(options: Option[] | string | ((filter: string) => Option[])) {
        if (isFunction(options)) {
            this._optionList = new OptionListFunction(options);
        } else if (options instanceof Array) {
            this._optionList = new OptionListArray(options);
            console.log('OPTS', this._optionList);
        } else if (typeof options !== 'undefined') {
            this._optionList = this._optionService.get(<string>options);
        }

        // Set placeholder
        this._optionList.placeholder = this.placeholder;

        // Init OptionList
        this._optionList.init();
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

        if (event !== null) {
            if (event.key.length === 1 || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event = null;
            }
        }

        if (event === null) {
            this.openDropdown(
                SelectDropdownComponent,
                {
                    optionList: this._optionList,
                    selectedOption: this._selectedOption,
                    value: this.value,
                    inner: this.inner
                }
            );
        }
    }
}
