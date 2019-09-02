import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Injector,
    forwardRef,
    OnDestroy,
    Input,
    ElementRef
} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OptionService } from '../shared/option.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseInputComponent } from '../shared/base-input.component';

@Component({
    // moduleId: module.id,
    selector: 'man-text',
    templateUrl: './text.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextComponent),
            multi: true,
        }
    ]
})
export class TextComponent extends BaseInputComponent implements OnDestroy {

    @Input('rows') set rows(input) {
        this._rows = input;
    }
    @Input() mask;
    _class = 'form-control man-form-control';
    public controlValue = '';
    public _rows = 1;
    private controlValueSubscription: Subscription;

    constructor(element: ElementRef, overlay: Overlay, injector: Injector, optionService: OptionService) {
        super(element, optionService);

        this.controlValueSubscription = this.value.subscribe((value) => {
            this.controlValue = value;
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.controlValueSubscription.unsubscribe();
    }
}

