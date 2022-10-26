import { Option } from './interfaces/option';
import { OptionListRef } from './option-list-ref';

/**
 * Used by the OptionService to fetch options.
 */
export abstract class OptionList {

    public static id = '';

    /**
     * Callback for creating a new option.
     */
    public createOptionCallback: (input: string) => Promise<any> = null;

    /**
     * Return a specific item. This is used when the form writes changes to the input.
     */
    abstract option(value: any): Promise<Option>;

    /**
     * Returns options that matches the searched string.
     */
    abstract options(optionListRef: OptionListRef, search: string): Promise<Option[]>;
}
