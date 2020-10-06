/* tslint:disable:no-unused-variable */
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProgressBarComponent
            ]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
    });

    it('should create the progress-bar', () => {
        expect(component).toBeTruthy();
    });
});
