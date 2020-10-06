/* tslint:disable:no-unused-variable */
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectComponent
            ]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
    });

    it('should create the select', () => {
        expect(component).toBeTruthy();
    });
});
