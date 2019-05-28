import { Component, ViewEncapsulation, ChangeDetectionStrategy, Injector, forwardRef, OnDestroy, Input } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseInputComponent } from '../shared/input-menu/base-input.component';

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

    _class = 'form-control man-form-control';

    public controlValue = '';

    private controlValueSubscription: Subscription;

    constructor(overlay: Overlay, injector: Injector, optionService: OptionService) {
        super(optionService);

        this.controlValueSubscription = this.value.subscribe((value) => {
            this.controlValue = value; // TODO Use prettyNumber:2
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.controlValueSubscription.unsubscribe();
    }

    inputValue(value) {
        this.value.next(parseInt(value, null)); // TODO Read pretty number.
    }
}

