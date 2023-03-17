import { Component, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputComponent } from '../form-input.component';

@Component({
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
export class TextComponent extends FormInputComponent implements OnDestroy {

    @Input() rows = 1;
    @Input() mask;
    @ViewChild('inner') protected inner: ElementRef;

    public controlValue = '';
    private controlValueSubscription: Subscription;

    constructor() {
        super();

        this.controlValueSubscription = this._value.subscribe((value) => {
            this.controlValue = value;
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.controlValueSubscription.unsubscribe();
    }

    handleInput(value: string): void {
        if (value === '') {
            value = null;
        }

        this._value.next(value);
    }

    public focus() {
        this.inner.nativeElement.focus();
    }
}

