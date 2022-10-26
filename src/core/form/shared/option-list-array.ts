import { OptionList } from './option-list';
import { Option } from './interfaces/option';
import { OptionListRef } from './option-list-ref';

/**
 * Used for wrapping an array of options in an OptionList.
 */
export class OptionListArray extends OptionList {

    constructor(private _options: Option[]) {
        super();
    }

    option(value: any): Promise<Option> {
        return new Promise<Option>((resolve, reject) => {
            for (const i of Object.keys(this._options)) {
                if (this._options[i].value === value) {
                    resolve(this._options[i]);
                }
            }
        });
    }

    options(optionListRef: OptionListRef, search: string): Promise<Option[]> {
        return new Promise<Option[]>((resolve, reject) => {
            resolve(this._options);
        });
    }
}
