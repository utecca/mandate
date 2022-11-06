import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';

@Component({template: ''})
export abstract class FormInputComponent implements ControlValueAccessor, OnDestroy {
    public _disabled: boolean = false;
    public _tabIndex: number = null;
    public _placeholder = new BehaviorSubject<string>(null);
    public value = new BehaviorSubject<any>(null);

    protected onChange: CallableFunction;
    protected onTouched: CallableFunction;

    @Input() set disabled(value: boolean) {
        this._disabled = value;
    }

    @Input() set placeholder(value: string) {
        this._placeholder.next(value);
    }

    @Input() set tindex(value: number) {
        this._tabIndex = value;
    }

    @Output('change') public changeEmitter = new EventEmitter<any>();
    @Output('focus') public focusEmitter = new EventEmitter<FocusEvent>();
    @Output('blur') public blurEmitter = new EventEmitter<FocusEvent>();

    protected valueSubscription: Subscription;

    protected constructor() {
        this.valueSubscription = this.value.subscribe(value => {
            if (typeof this.onChange !== 'undefined') {
                this.onChange(value);
            }
            this.changeEmitter.emit(value);
        })
    }

    public registerOnChange(fn: CallableFunction): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: CallableFunction): void {
        this.onTouched = fn;
    }

    public ngOnDestroy(): void {
        this.valueSubscription?.unsubscribe();
    }

    public writeValue(value: any): void {
        this.value.next(value);
    }

    public onBlur(event: FocusEvent): void {
        this.blurEmitter.emit(event);
    }

    public onFocus(event: FocusEvent): void {
        this.onTouched();
        this.focusEmitter.emit(event);
    }
}
