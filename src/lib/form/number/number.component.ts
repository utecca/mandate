import { Component, ViewEncapsulation, ChangeDetectionStrategy, Injector, forwardRef, OnDestroy, Input, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BaseInputComponent } from '../shared/input-menu/base-input.component';
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

    _class = 'form-control man-form-control';

    public controlValue = '';

    private controlValueSubscription: Subscription;

    constructor(element: ElementRef, overlay: Overlay, injector: Injector, optionService: OptionService) {
        super(element, optionService);

        this.controlValueSubscription = this.value.subscribe((value) => {
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
        this.value.next(
            parseFloat(
                value
                    .toString()
                    .replace(/[^0-9,\-]/g, '')
                    .replace(',', '.')
            ).toFixed(this.decimals)
        );
    }

    onBlur(event) {
        super.onBlur(event);
        this.updateControlValue();
    }

    updateControlValue() {
        if (typeof this.value.value === 'undefined') {
            this.controlValue = '';
        } else {
            this.controlValue = prettyNumber(this.value.value, this.decimals);
        }
    }
}

