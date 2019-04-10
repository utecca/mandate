import { OptionList } from './option-list';
import { Option } from './interfaces/option';

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

    options(search: string): Promise<Option[]> {
        return undefined;
    }

    preOptions(): Promise<Option[]> {
        return undefined;
    }

}
