import { Component, ElementRef, forwardRef, HostBinding, HostListener, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
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

    _class = 'form-control man-form-control';

    @Input() private filter = false;

    @HostBinding('tabindex') tabindex = 0;

    /**
     * Contains the value subscription.
     */
    private selectValueSubscription: Subscription;

    constructor(
        element: ElementRef,
        overlay: Overlay,
        injector: Injector,
        optionService: OptionService
    ) {
        super(element, overlay, injector, optionService);

        this.selectValueSubscription = this.value.subscribe((value) => {
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
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.selectValueSubscription.unsubscribe();
    }
}
