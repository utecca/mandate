import { OptionList } from './option-list';
import { Option } from './interfaces/option';
import { OptionListRef } from './option-list-ref';

/**
 * Used for wrapping a callback in an OptionList.
 */
export class OptionListFunction extends OptionList {
    private callback;

    constructor(options: any) {
        super();

        this.callback = options;
        // // this._optionList = <any>options; // TODO
        //             // this._currentOptions = [];
    }
    option(value: any): Promise<Option> {
        return undefined;
    }

    options(optionListRef: OptionListRef, search: string): Promise<Option[]> {
        return undefined;
    }

    preOptions(): Promise<Option[]> {
        return undefined;
    }

    refetch(): void {
    }

}
