import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { InputMenuContainerComponent } from './input-menu-container.component';


let uniqueId = 0;

export class InputMenuRef<T, R = any> {

    /** Subscription to changes in the user's location. */
    // private _locationChanges: SubscriptionLike = Subscription.EMPTY;

    constructor(
        public _overlayRef: OverlayRef,
        public _containerInstance: InputMenuContainerComponent,
        readonly id: string = `man-input-menu-${uniqueId++}`
    ) {

        // Pass the id along to the container.
        _containerInstance._id = id;

        // Emit when opening animation completes
        _containerInstance._animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'enter'),
            take(1)
        )
            .subscribe(() => {
                this._afterOpen.next();
                this._afterOpen.complete();
            });

        // Dispose overlay when closing animation is complete
        _containerInstance._animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'exit'),
            take(1)
        )
            .subscribe(() => {
                this._overlayRef.dispose();
                // this._locationChanges.unsubscribe();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null!;
            });

        _overlayRef.keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE))
            .subscribe(() => this.close(true));
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    /**
     * Gets an observable that is notified when the dialog is finished opening.
     */
    get afterOpen(): Observable<void> {
        return this._afterOpen.asObservable();
    }

    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    get afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }

    /**
     * Gets an observable that is notified when the dialog has started closing.
     */
    get beforeClose(): Observable<R | undefined> {
        return this._beforeClose.asObservable();
    }

    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    get backdropClick(): Observable<MouseEvent> {
        return this._overlayRef.backdropClick();
    }

    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    get keydownEvents(): Observable<KeyboardEvent> {
        return this._overlayRef.keydownEvents();
    }
    /** The instance of component opened into the dialog. */
    componentInstance: T;

    /** Subject for notifying the user that the dialog has finished opening. */
    private readonly _afterOpen = new Subject<void>();

    /** Subject for notifying the user that the dialog has finished closing. */
    private readonly _afterClosed = new Subject<R | undefined>();

    /** Subject for notifying the user that the dialog has started closing. */
    private readonly _beforeClose = new Subject<R | undefined>();

    /** Result to be passed to afterClosed. */
    private _result: R | undefined;

    /** Contains any data passed to the actual dropdown menu */
    public data: any;

    private _isOpen = false;

    /**
     * Close the dialog.
     */
    close(restoreFocus = true): void {
        console.log('CLOSE', restoreFocus);

        // Transition the backdrop in parallel to the dialog.
        /*this._containerInstance._animationStateChanged.pipe(
            filterInput(event => event.phaseName === 'start'),
            take(1)
        )
            .subscribe(() => {
                this._beforeClose.next(dialogResult);
                this._beforeClose.complete();
                this._overlayRef.detachBackdrop();
            });*/

        this._containerInstance._startExitAnimation(restoreFocus);
    }

    public markAsOpen(): void {
        setTimeout(() => {
            this._isOpen = true;
        }, 100);

    }

    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position?: any): this {
        const strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        } else {
            strategy.centerHorizontally();
        }

        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        } else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();

        return this;
    }

    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSize(width: string = 'auto', height: string = 'auto'): this {
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    }

    /** Fetches the position strategy object from the overlay ref. */
    private _getPositionStrategy(): GlobalPositionStrategy {
        return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
    }

}
