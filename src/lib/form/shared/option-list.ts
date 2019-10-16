import { Option } from './interfaces/option';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Used by the OptionService to fetch options.
 */
export abstract class OptionList {

    public static id = '';

    /**
     * Callback for creating a new option.
     */
    public createOptionCallback: (input: string) => Promise<any> = null;

    public currentOptions = new BehaviorSubject<Option[]>([]);

    public _placeholder: Option = {
        value: null,
        label: 'N/A'
    };

    private _placeholderEnabled = false;

    /**
     * Return a specific item. This is used when the form writes changes to the input.
     */
    abstract option(value: any): Promise<Option>;

    /**
     * Returns options that matches the searched string.
     */
    abstract options(search: string): Promise<Option[]>;

    public init() {
        console.log('SETTING OPTIONS');
        // Fetch options
        this.options('');
    }

    public set placeholder(input: string) {
        if (typeof input !== 'undefined') {
            if (input === '') {
                input = '-- Vælg --'; // TODO: Get default text from settings.
            }

            this._placeholder = {
                label: input,
                value: null
            };
            this._placeholderEnabled = true;
        } else {
            this._placeholderEnabled = false;
            this._placeholder = null;
        }
    }

    protected setCurrentOptions(search: string, options: Option[]): Option[] {
        let newOptions: Option[] = [];

        if (this._placeholderEnabled && search === '') {
            newOptions.push(this._placeholder);
        }

        newOptions = newOptions.concat(options);

        this.currentOptions.next(newOptions);
        return newOptions;
    }
}
