import { BaseInputComponent } from './base-input.component';
import { InputMenuConfig } from './input-menu-config';
import { globalOffset } from 'ngx-plumber';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { InputMenuRef } from './input-menu-ref';
import { InputMenuContainerComponent } from './input-menu-container.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injector } from '@angular/core';
import { OptionService } from '../option.service';

export abstract class BaseDropdownInputComponent extends BaseInputComponent {
    constructor(
        private _overlay: Overlay,
        private _injector: Injector,
        optionService?: OptionService
    ) {
        super(optionService);
    }
    protected openDropdown(component: any, data?: any) { // TODO: Config should be defined
        const config: InputMenuConfig = {
            panelClass: '',
            hasBackdrop: true,
            backdropClass: '',
            disableClose: false,
            width: '100',
            height: '100',
            autoFocus: true,
            closeOnNavigation: true,
            parentElementOffset: globalOffset(this.inner),
            data: data
        };

        const overlayRef = this._createOverlay(config);
        const dropdownContainer = this._attachDropdownContainer(overlayRef, config);
        this.inputMenuRef = this._attachDropdownContent(component, dropdownContainer , overlayRef, config);
    }

    private _createOverlay(config: InputMenuConfig): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(inputMenuConfig: InputMenuConfig): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._overlay.scrollStrategies.block(),
            panelClass: inputMenuConfig.panelClass,
            backdropClass: 'man-input-dropdown-backdrop',
            hasBackdrop: true, // dialogConfig.hasBackdrop,
            direction: inputMenuConfig.direction,
        });

        if (inputMenuConfig.backdropClass) {
            state.backdropClass = inputMenuConfig.backdropClass;
        }

        return state;
    }

    private _createInjector<T>(
        config: InputMenuConfig,
        inputMenuRef: InputMenuRef<T>,
        dropdownContainer: InputMenuContainerComponent): PortalInjector {

        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injectionTokens = new WeakMap();

        // The MatDialogContainer is injected in the portal as the MatDialogContainer and the dialog's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the MatDialogContainer is explicitly
        // added to the injection tokens.
        injectionTokens
            .set(InputMenuContainerComponent, dropdownContainer)
            .set(InputMenuRef, inputMenuRef);

        /*if (!userInjector || !userInjector.get(Directionality, null)) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                // change: observableOf()
            });
        }*/

        return new PortalInjector(userInjector || this._injector, injectionTokens);
    }

    private _attachDropdownContent<T>(
        dropdownComponent: ComponentType<T>,
        dropdownContainer: InputMenuContainerComponent,
        overlayRef: OverlayRef,
        config: any) {

        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const inputMenuRef = new InputMenuRef<T>(overlayRef, dropdownContainer, config.id);

        // Add the data to inputMenuRef
        inputMenuRef.data = config.data;

        const injector = this._createInjector<T>(config, inputMenuRef, dropdownContainer);
        const contentRef = dropdownContainer.attachComponentPortal<T>(
            new ComponentPortal(dropdownComponent, undefined, injector));
        inputMenuRef.componentInstance = contentRef.instance;


        inputMenuRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position); // TODO necessary?

        return inputMenuRef;
    }


    private _attachDropdownContainer(overlay: OverlayRef, inputMenuConfig: InputMenuConfig) {
        const containerPortal = new ComponentPortal(InputMenuContainerComponent, inputMenuConfig.viewContainerRef);
        const containerRef: ComponentRef<InputMenuContainerComponent> = overlay.attach(containerPortal);
        containerRef.instance._config = inputMenuConfig;

        return containerRef.instance;
    }
}
