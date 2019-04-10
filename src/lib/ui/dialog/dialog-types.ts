import {Component} from '@angular/core';

export interface ManDialogType {
    panelClass?: string | string[];
    hasBackdrop?: boolean;
    backdropClass?: string | string[];
    disableClose?: boolean;
    autoFocus?: boolean,
    closeOnNavigation?: boolean;
    dialogContainer?: Component;
}

export interface ManDialogGlobalConfig {
    types: {[name: string]: ManDialogType};
    specialDialogs?: {
        alert: {
            component: string,
            type: string
        },
        confirm: {
            component: string,
            type: string
        }
    };
}



let test: ManDialogGlobalConfig = {
    types: {
        'test': {
            panelClass: 'test'
        }
    }
};