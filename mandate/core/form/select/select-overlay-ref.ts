import {
    BlockScrollStrategy, Overlay, OverlayConfig, OverlayContainer, OverlayRef,
    ScrollStrategy
} from '@angular/cdk/overlay';

export class SelectOverlayRef {
    // private _overlay;

    constructor(public _overlay: Overlay) {
        this._overlay.create();
    }
}

