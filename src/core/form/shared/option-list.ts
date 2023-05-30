import { Option } from './interfaces/option';
import { OptionListRef } from './option-list-ref';

/**
 * Used by the OptionService to fetch options.
 */
export abstract class OptionList {

    public static id = '';
    protected relations: any = null;


    /**
     * Callback for creating a new option.
     */
    public createOptionCallback: (input: string, relations: any) => Promise<any> = null;

    /**
     * Return a specific item. This is used when the form writes changes to the input.
     */
    abstract option(value: any): Promise<Option>;

    /**
     * Returns options that matches the searched string.
     */
    abstract options(optionListRef: OptionListRef, search: string): Promise<Option[]>;

    public setRelations(relations: any): void {
        throw new Error('This OptionList does not support relations.');
    }

    public getRelations(): any {
        return this.relations;
    }
}
