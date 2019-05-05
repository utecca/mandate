import { Component, ViewEncapsulation, ChangeDetectionStrategy, Injector, forwardRef, OnDestroy, HostBinding, Input } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseInputComponent } from '../shared/input-menu/base-input.component';

@Component({
    selector: 'man-checkbox',
    templateUrl: './checkbox.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        }
    ]
})
export class CheckboxComponent extends BaseInputComponent implements OnDestroy {

    @Input() public mask = null;
    _class = 'form-check-input man-form-control';
    public controlValue = '';
    private controlValueSubscription: Subscription;

    constructor(overlay: Overlay, injector: Injector, optionService: OptionService) {
        super(optionService);

        this.controlValueSubscription = this.value.subscribe((value) => {
            this.controlValue = value;
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.controlValueSubscription.unsubscribe();
    }

    onClick(event) {
        if (event.srcElement.localName !== 'a') {
            this.value.next(!this.value.value);
        }
    }
}

