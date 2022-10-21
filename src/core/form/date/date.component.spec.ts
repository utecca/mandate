/* tslint:disable:no-unused-variable */
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { DateComponent } from './date.component';

describe('SelectComponent', () => {
    let component: DateComponent;
    let fixture: ComponentFixture<DateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DateComponent
            ]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateComponent);
        component = fixture.componentInstance;
    });

    it('should create the select', () => {
        expect(component).toBeTruthy();
    });
});
