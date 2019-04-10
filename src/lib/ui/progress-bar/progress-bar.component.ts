import {Component, Input, OnChanges} from '@angular/core';
// import {trigger, state, style, animate, transition, keyframes, stagger} from '@angular/animations';

@Component({
    selector: 'man-progress-bar',
    styleUrls: ['./progress-bar.component.scss'],
    templateUrl: './progress-bar.component.html',
    /*animations: [
        trigger('visible', [
            state('true', style({})),
            transition('false => true', [
                animate(300, keyframes([
                    style({height: 0}),
                    style({})
                ]))
            ]),
            state('false', style({display: 'none'})),
            transition('true => false', [
                animate(3000, keyframes([
                    style({offset: 0}),
                    style({width: '100%', position: 'absolute', right: 0, offset: 0.33}),
                    style({width: 0, offset: 1})
                ]))
            ])
        ])
    ]*/
})
export class ProgressBarComponent implements OnChanges {
    public mode = 'bootstrap4';

    @Input('progress') progress;
    @Input('visible') visible;
    @Input('label') label;
    @Input('barClass') barClass;

    public valProgress = 0;


    constructor() {}

    isVisible(): boolean {
        if (this.visible === 'auto') {
            if (this.progress !== 0 && this.progress !== 100) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    }

    ngOnChanges() {
        if (this.progress > 100) {
            this.valProgress = 100;
        } else if (this.progress < 0) {
            this.valProgress = 0;
        } else {
            this.valProgress = this.progress;
        }
    }

}
