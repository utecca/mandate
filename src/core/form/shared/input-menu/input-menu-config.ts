import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy} from '@angular/cdk/overlay';
import {ViewContainerRef} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

export class InputMenuConfig<D = any> {

    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /** Dialog type for the dialog. The types are configured in the MAN_DIALOG_TYPES provider. */
    type?: string;

    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;

    /** Custom class for the overlay pane. */
    panelClass?: string | string[] = '';

    /** Whether the dialog has a backdrop. */
    hasBackdrop = true;

    /** Custom class for the backdrop, */
    backdropClass = '';

    /** Whether the user can use escape or clicking outside to close a modal. */
    disableClose = false;

    /** Width of the dialog. */
    width = '';

    /** Height of the dialog. */
    height = '';

    /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;

    /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;

    /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
    maxWidth?: number | string = '80vw';

    /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;

    /** Position overrides. */
    // position?: DialogPosition;

    /** Data being injected into the child component. */
    data?: D | null = null;

    /** Layout direction for the dialog's content. */
    direction?: Direction;

    /** ID of the element that describes the dialog. */
    ariaDescribedBy?: string | null = null;

    /** Aria label to assign to the dialog element */
    ariaLabel?: string | null = null;

    /** Whether the dialog should focus the first focusable element on open. */
    autoFocus = true;

    /** Scroll strategy to be used for the dialog. */
    scrollStrategy?: ScrollStrategy;

    /** Whether the dialog should close when the user goes backwards/forwards in history. */
    closeOnNavigation = true;

    parentElementOffset: {
        x: number,
        y: number
    };

    scrollOffset: BehaviorSubject<{x: number, y: number}>;
    // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
}
