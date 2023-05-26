import { NgModule } from '@angular/core';
import { Dialog } from './dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ManDialogContainerComponent } from './dialog-container.component';
import { A11yModule } from '@angular/cdk/a11y';
import { AlertDialogComponent } from './dialogs/alert-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';
import { DialogHeaderComponent } from './components/dialog-header.component';
import { DialogBodyComponent } from './components/dialog-body.component';
import { DialogFooterComponent } from './components/dialog-footer.component';

@NgModule({
    declarations: [
        ManDialogContainerComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        AlertDialogComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        A11yModule
    ],
    entryComponents: [
        ManDialogContainerComponent,
        AlertDialogComponent,
        ConfirmDialogComponent
    ],
    exports: [
        OverlayModule,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
    ],
    providers: [
        Dialog
    ]
})
export class DialogModule {
}
