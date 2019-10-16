import {
    ComponentRef, Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf,
    TemplateRef
} from '@angular/core';
import { DialogRef } from './dialog-ref';
import { ComponentType, Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { ManDialogConfig } from './dialog-config';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ManDialogContainerComponent } from './dialog-container.component';
import { startWith } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';
import { ManDialogGlobalConfig } from './dialog-types';
import { defer, Observable, Subject } from 'rxjs/index';

export const MAN_DIALOG_DATA = new InjectionToken<any>('ManDialogData');

export const MAN_DIALOG_GLOBAL_CONFIG = new InjectionToken<ManDialogGlobalConfig>('man-dialog-global-config');

export const MAN_DIALOG_DEFAULT_OPTIONS = new InjectionToken<ManDialogConfig>('man-dialog-default-options');

@Injectable({
    providedIn: 'root'
})
export class Dialog {

    private _openDialogsAtThisLevel: DialogRef<any>[] = [];
    private readonly _afterAllClosedAtThisLevel = new Subject<void>();
    private readonly _afterOpenAtThisLevel = new Subject<DialogRef<any>>();
    private _ariaHiddenElements = new Map<Element, string|null>();

    /** Keeps track of the currently-open dialogs. */
    get openDialogs(): DialogRef<any>[] {
        return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
    }

    /** Stream that emits when a dialog has been opened. */
    get afterOpen(): Subject<DialogRef<any>> {
        return this._parentDialog ? this._parentDialog.afterOpen : this._afterOpenAtThisLevel;
    }

    get _afterAllClosed() {
        const parent = this._parentDialog;
        return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
    }

    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    readonly afterAllClosed: Observable<any> = defer<any>(() => this.openDialogs.length ?
        this._afterAllClosed :
        this._afterAllClosed.pipe(startWith(undefined)));
    constructor(public _overlay: Overlay,
                private _injector: Injector,
                // @Optional() private _location: Location,
                @Optional() @Inject(MAN_DIALOG_DEFAULT_OPTIONS) private _defaultOptions,
                @Optional() @Inject(MAN_DIALOG_GLOBAL_CONFIG) private _config,
                // @Inject(MAT_DIALOG_SCROLL_STRATEGY) private _scrollStrategy,
                @Optional() @SkipSelf() private _parentDialog: Dialog,
                private _overlayContainer: OverlayContainer) {

    }

    /**
     * Show a new model
     */
    public open(componentOrTemplateRef: any, config?: ManDialogConfig) { // ModalInstance
        if (typeof config === 'undefined') {
            config = new ManDialogConfig();
        }

        config = this._applyConfigDefaults(config, this._defaultOptions || new ManDialogConfig());

        if (typeof componentOrTemplateRef.options !== 'undefined') {
            if (typeof componentOrTemplateRef.options.size !== 'undefined') {
                config.size = componentOrTemplateRef.options.size;
            }
        }

        console.log('DEBUG', componentOrTemplateRef.options);

        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }

        const overlayRef = this._createOverlay({});
        const dialogContainer = this._attachDialogContainer(overlayRef, config);
        const dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);

        this.openDialogs.push(dialogRef);
        // dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef)); // TODO
        this.afterOpen.next(dialogRef);

        return dialogRef;
    }

    public alert(content, title?, icon?, config?): Promise<null> {
        if (typeof this._config.specialDialogs.alert.component === 'undefined') {
            throw new Error('Unable to create a alert dialog.' +
                'Please define the alert component in global configuration.');
        }

        // @ts-ignore
        const dialogRef = this.open(this._config.specialDialogs.alert.component, {
            data: {
                content: content,
                title: title,
                icon: icon
            },
            size: this._config.specialDialogs.alert.size
        });

        return dialogRef.beforeClose.toPromise();
    }

    public confirm(content: string, title?: string, icon?: string, config?): Promise<boolean> {
        if (typeof this._config.specialDialogs.confirm.component === 'undefined') {
            throw new Error('Unable to create a confirm dialog.' +
                'Please define the confirm component in global configuration.');
        }

        // @ts-ignore
        const dialogRef = this.open(this._config.specialDialogs.confirm.component, {
            data: {
                content: content,
                title: title,
                icon: icon
            },
            size: this._config.specialDialogs.confirm.size
        });

        return dialogRef.beforeClose.toPromise();
    }

    public getDialogById(id: string): DialogRef<any> | undefined {
        return this.openDialogs.find(dialog => dialog.id === id);
    }

    private _createOverlay(config: ManDialogConfig): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(dialogConfig: ManDialogConfig): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            // scrollStrategy: dialogConfig.scrollStrategy || this._scrollStrategy(),
            // scrollStrategy: dialogConfig.Clo,
            panelClass: dialogConfig.panelClass,
            backdropClass: 'man-dialog-backdrop',
            hasBackdrop: true, // dialogConfig.hasBackdrop,
            direction: dialogConfig.direction,
            /// minWidth: '100%', // dialogConfig.minWidth,
            // minHeight: '100%', // dialogConfig.minHeight,*/
            // maxWidth: '80%', // dialogConfig.maxWidth,
            // maxHeight: '80%', // dialogConfig.maxHeight // TODO LOAD FROM TYPE CONFIG (BASED ON DIALOG TYPE)*/
        });

        if (dialogConfig.backdropClass) {
            state.backdropClass = dialogConfig.backdropClass;
        }

        return state;
    }
    private _attachDialogContainer(overlay: OverlayRef, config: ManDialogConfig) {
        const containerPortal = new ComponentPortal(ManDialogContainerComponent, config.viewContainerRef);
        const containerRef: ComponentRef<ManDialogContainerComponent> = overlay.attach(containerPortal);
        containerRef.instance._config = config;

        return containerRef.instance;
    }

    private _attachDialogContent<T>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        dialogContainer: ManDialogContainerComponent,
        overlayRef: OverlayRef,
        config: ManDialogConfig): DialogRef<T> {

        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const dialogRef = new DialogRef<T>(overlayRef, dialogContainer, config.id);

        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null!,
                    <any>{ $implicit: config.data, dialogRef }));
        } else {
            const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
            const contentRef = dialogContainer.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }

        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);

        return dialogRef;
    }

    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
    */
    private _createInjector<T>(
        config: ManDialogConfig,
        dialogRef: DialogRef<T>,
        dialogContainer: ManDialogContainerComponent): PortalInjector {

        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injectionTokens = new WeakMap();

        // The MatDialogContainer is injected in the portal as the MatDialogContainer and the dialog's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the MatDialogContainer is explicitly
        // added to the injection tokens.
        injectionTokens
            .set(ManDialogContainerComponent, dialogContainer)
            .set(MAN_DIALOG_DATA, config.data)
            .set(DialogRef, dialogRef);

        if (!userInjector || !userInjector.get(Directionality, null)) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                // change: observableOf()
            });
        }

        return new PortalInjector(userInjector || this._injector, injectionTokens);
    }

    private _applyConfigDefaults(config?: ManDialogConfig, defaultOptions?: ManDialogConfig): ManDialogConfig {
        // Add default class
        config['panelClass'] = 'man-dialog-container';

        if (config['type']) {
            config['panelClass'] += ' ' + this._config.types[config['type']].dialogClass;
        }

        return {...defaultOptions, ...config};
    }
}
