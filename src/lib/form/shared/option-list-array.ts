import { OptionList } from './option-list';
import { Option } from './interfaces/option';

/**
 * Used for wrapping an array of options in an OptionList.
 */
export class OptionListArray extends OptionList {

    constructor(options: Option[]) {
        super();
        // this._optionsSource = collect(options); // TODO
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
