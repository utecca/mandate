import { OptionList } from './option-list';
import { Option } from './interfaces/option';

/**
 * Used for wrapping an array of options in an OptionList.
 */
export class OptionListArray extends OptionList {

    constructor(private _options: Option[]) {
        super();
        this.currentOptions.next(_options);
        // this._optionsSource = collect(options); // TODO
    }

    option(value: any): Promise<Option> {
        return new Promise<Option>((resolve, reject) => {
            for (const i of Object.keys(this._options)) {
                if (value === null || typeof value === 'undefined') {
                    resolve(this._placeholder);
                } else {
                    if (this._options[i].value === value) {
                        resolve(this._options[i]);
                    }
                    console.log('SET VAL', value, this._options[i]);
                }
            }
        });
    }

    options(search: string): Promise<Option[]> {
        return new Promise<Option[]>((resolve, reject) => {
            resolve(this._options);
        });
    }
}
