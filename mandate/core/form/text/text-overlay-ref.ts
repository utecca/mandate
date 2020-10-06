import {
    BlockScrollStrategy, Overlay, OverlayConfig, OverlayContainer, OverlayRef,
    ScrollStrategy
} from '@angular/cdk/overlay';

export class TextOverlayRef {
    constructor(public _overlay: Overlay) {
        this._overlay.create();
    }
}

