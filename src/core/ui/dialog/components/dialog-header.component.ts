import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DialogRef } from '../dialog-ref';

interface Position {
    x: number;
    y: number;
}

@Component({
    templateUrl: 'dialog-header.component.html',
    selector: '<man-dialog-header></man-dialog-header>',
    host: {
        'class': 'man-dialog-header'
    }
})
export class DialogHeaderComponent {
    @Input() dialogRef: DialogRef<any>;
    @HostBinding('class.dragging') dragging = false;

    @HostListener('pointerdown', ['$event'])
    onPointerDown(event: PointerEvent): void {
        this.dragging = true;

        this.startPosition = {
            x: event.clientX - this.position.x,
            y: event.clientY - this.position.y
        }
    }

    position: Position = {x: 0, y: 0};
    private startPosition: Position;
    private self: HTMLElement;

    constructor(private elementRef: ElementRef) {
        this.self = this.elementRef.nativeElement;
    }

    @HostListener('document:pointermove', ['$event'])
    onPointerMove(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }

        this.position.x = event.clientX - this.startPosition.x;
        this.position.y = event.clientY - this.startPosition.y;
        this.updateDialogPosition();
    }

    @HostListener('document:pointerup', ['$event'])
    onPointerUp(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }

        this.dragging = false;
    }

    private updateDialogPosition() {
        // @ts-ignore
        this.self.closest('.dialog').style.transform = `translateX(${this.position.x}px) translateY(${this.position.y}px)`;
    }
}
