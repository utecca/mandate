import { NgModule } from '@angular/core';
import { OptionService } from './shared/option.service';
import { InputMenuModule } from './shared/input-menu/input-menu.module';
import { SelectModule } from './select/select.module';
import { TextModule } from './text/text.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DateModule } from './date/date.module';
import { NumberModule } from './number/number.module';

@NgModule({
    providers: [
        OptionService
    ],
    exports: [
        CheckboxModule,
        DateModule,
        NumberModule,
        SelectModule,
        TextModule
    ],
    imports: [
        InputMenuModule,
        CheckboxModule,
        DateModule,
        NumberModule,
        SelectModule,
        TextModule
    ]
})
export class FormModule { }
