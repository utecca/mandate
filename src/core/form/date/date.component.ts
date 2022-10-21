import { Component, ElementRef, forwardRef, HostListener, Injector } from '@angular/core';
import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { OptionService } from '../shared/option.service';
import { BaseDropdownInputComponent } from '../shared/input-menu/base-dropdown-input.component';
import { DateDropdownComponent } from './inner/date-dropdown.component';
import { pad } from 'ngx-plumber';

@Component({
    selector: 'man-date',
    templateUrl: 'date.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateComponent),
            multi: true,
        }
    ]
})
export class DateComponent extends BaseDropdownInputComponent {

    public controlValue = '';

    private isValid = true;

    constructor(
        element: ElementRef,
        overlay: Overlay,
        injector: Injector,
        optionService: OptionService,
        sso: ScrollStrategyOptions
    ) {
        super(element, overlay, injector, optionService, sso);

        /*this.selectValueSubscription = this.value.subscribe((value) => {
            if (typeof value !== 'undefined') {
                this.isLoading = true;
                this._optionList.option(value)
                    .then((option) => {
                        // TODO Make sure that the value has not changed since.
                        this._selectedOption.next(option);
                        this.isLoading = false;
                    })
                    .catch();
            }
        });*/
    }

    /**
     * Read input from the user and convert into date.
     */
    public inputValue(value: string) {
        value = value.replace(/\D+/g, '/');

        let result = null;

        // If string contains dividers (/)
        if (value.indexOf('/') > -1) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
                result = {
                    year: this.toInteger(dateParts[0]),
                    month: null,
                    day: null
                };
            } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
                result = {
                    year: this.toInteger(dateParts[1]),
                    month: this.toInteger(dateParts[0]),
                    day: null
                };
            } else if (
                dateParts.length === 3 && this.isNumber(dateParts[0])
                && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])
            ) {
                result = {
                    year: this.formatYear(dateParts[2]),
                    month: this.toInteger(dateParts[1]),
                    day: this.toInteger(dateParts[0])
                };
            }
        } else {
            const valueArr: string[] = value.match(/.{1,2}/g);

            // If string length is 4
            if (value.length === 4) {
                result = {
                    year: new Date().getFullYear(),
                    month: this.toInteger(valueArr[1]),
                    day: this.toInteger(valueArr[0])
                };
            }
            // If string length is 6
            if (value.length === 6) {
                result = {
                    year: this.formatYear(valueArr[2]),
                    month: this.toInteger(valueArr[1]),
                    day: this.toInteger(valueArr[0])
                };
            }

            // If string length is 8
            if (value.length === 8) {
                result = {
                    year: this.formatYear(valueArr[2] + valueArr[3]),
                    month: this.toInteger(valueArr[1]),
                    day: this.toInteger(valueArr[0])
                };
            }
        }

        // Add a date-element
        if (result != null) {
            result['date'] = new Date(this.formatYear(result['year']), result['month'] - 1, result['day']);

            // Check if the date exists
            if (
                result.date.getDate() !== result['day']
                || result.date.getMonth() !== result['month'] - 1
                || result.date.getFullYear() !== this.formatYear(result['year'])
            ) {
                // Write new value to input
                this.setValue(null);
            } else {
                // Write new value to input
                this.setValue(result.year, result.month, result.day);
            }

        } else {
            this.setValue(null);
        }
    }

    /**
     * Set the value of the date input.
     */
    setValue(year: number, month?: number, day?: number) {
        if (year) {
            this.value.next(year + '-' + pad(month, 2) + '-' + pad(day, 2));
            this.controlValue = pad(day, 2) + '.' + pad(month, 2) + '.' + year;
            this.isValid = true;
        } else {
            this.value.next(null);
            this.isValid = false;
        }
    }

    /**
     * Handle value changes in the form.
     */
    public writeValue(value: any): void {
        let date: any = Date.parse(value);
        if (!isNaN(date)) {
            date = new Date(date);

            this.setValue(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }

    @HostListener('keydown', ['$event'])
    public open(event: KeyboardEvent = null): void {

        if (event !== null) {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event = null;
            }
        }

        if (event === null) {
            this.openDropdown(
                DateDropdownComponent,
                {
                    value: this.value,
                    inner: this.inner
                }
            );
        }
    }

    private isNumber(value: any): boolean {
        return !isNaN(this.toInteger(value));
    }

    private toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }

    private formatYear(year): number {
        const dateStr = year.toString();
        if (dateStr.length === 1) {
            year = '201' + year;
        } else if (dateStr.length === 2) {
            year = '20' + year;
        } else if (dateStr.length === 3) {
            year = '2' + year;
        }

        return this.toInteger(year);
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        if (this.isValid) {
            return null;
        }

        return {
            validDate: {
                valid: false
            }
        };
    }

    /**
     * Register Angular's OnChange hook.
     */
    public registerOnChange(fn: any): void {
        super.registerOnChange(fn);

        // Rewrite current value, in-case it is a Date-object
        if (this.value.value !== null) {
            this.writeValue(this.value.value);
        }
    }
}
