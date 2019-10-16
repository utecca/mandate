import { Component, ElementRef, forwardRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionService } from '../shared/option.service';
import { BaseOptionInputComponent } from '../shared/input-menu/base-option-input.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'man-select',
    templateUrl: 'select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        }
    ]
})
export class SelectComponent extends BaseOptionInputComponent implements OnInit, OnDestroy {

    /**
     * Is the current value loading?
     */
    public isLoading = false;

    @Input() private filter = false;

    /**
     * Contains the value subscription.
     */
    private selectValueSubscription: Subscription;

    constructor(
        element: ElementRef,
        overlay: Overlay,
        injector: Injector,
        optionService: OptionService,
        sso: ScrollStrategyOptions
    ) {
        super(element, overlay, injector, optionService, sso);

        setTimeout(() => {
            this.selectValueSubscription = this.value.subscribe((value) => {
                if (typeof this._optionList !== 'undefined') {
                    this.isLoading = true;
                    this._optionList.option(value)
                        .then((option) => {
                            // TODO Make sure that the value has not changed since.
                            this._selectedOption.next(option);
                            this.isLoading = false;
                        })
                        .catch();
                } else {
                    throw Error('Select-inputs must have options defined.');
                }
            });
        }, 0);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.selectValueSubscription.unsubscribe();
    }
}
