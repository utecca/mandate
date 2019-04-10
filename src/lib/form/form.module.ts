import { NgModule } from '@angular/core';
import { OptionService } from './shared/option.service';
import { InputMenuModule } from './shared/input-menu/input-menu.module';
import { SelectModule } from './select/select.module';
import { TextModule } from './text/text.module';
import { CheckboxModule } from './checkbox/checkbox.module';

@NgModule({
    providers: [
        OptionService
    ],
    exports: [
        CheckboxModule,
        SelectModule,
        TextModule
    ],
    imports: [
        InputMenuModule,
        CheckboxModule,
        SelectModule,
        TextModule
    ]
})
export class FormModule { }
