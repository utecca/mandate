import { Component, ViewEncapsulation, ChangeDetectionStrategy, Injector, forwardRef, OnDestroy, Input, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseInputComponent } from '../shared/base-input.component';
import { prettyNumber } from 'ngx-plumber';

@Component({
    selector: 'man-number',
    templateUrl: './number.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberComponent),
            multi: true,
        }
    ]
})
export class NumberComponent extends BaseInputComponent implements OnDestroy {

    @Input() mode: 'default'|'amount' = 'default';

    @Input() decimals = 0;

    @Input() thousandSeparator = true;

    @Input() nullable = false;
    public controlValue = '';

    protected _innerClass = 'form-control man-text';

    private controlValueSubscription: Subscription;

    constructor(element: ElementRef, overlay: Overlay, injector: Injector, optionService: OptionService) {
        super(element, optionService);

        this.controlValueSubscription = this._value.subscribe((value) => {
            if (typeof value === 'undefined') {
                this.updateControlValue();
            } else {
                if (!this._focused) {
                    this.updateControlValue();
                }
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.controlValueSubscription.unsubscribe();
    }

    inputValue(value) {
        const number = this.parseStringToNumber(value);

        if (this.nullable && isNaN(number) || (number === null || typeof value === 'undefined')) {
            this._value.next(null);
        } else {
            this._value.next(
                parseFloat(number.toFixed(this.decimals))
            );
        }
    }

    private parseStringToNumber(input: string|number): number {
        return parseFloat(
            input
                .toString()
                .replace(/[^0-9,\-]/g, '')
                .replace(',', '.')
        );
    }

    onBlur(event) {
        super.onBlur(event);
        this.updateControlValue();
    }

    updateControlValue() {
        if (this._value.value === null) {
            this.controlValue = '';
        } else {
            this.controlValue = prettyNumber(this._value.value, this.decimals, this.thousandSeparator);
        }
    }
}

