import { Injectable } from '@angular/core';
import { OptionList } from './option-list';


@Injectable({
    providedIn: 'root'
})
export class OptionService {
    private _optionLists: {
        [Key: string]: OptionList
    } = {};

    constructor() {
        console.log('** OPTION SERVICE INIT **');
    }

    /**
     * Register a new OptionList.
     */
    public register(optionList, args?: any[]) {
        if (this._optionLists.hasOwnProperty(optionList.name)) {
            throw Error('An OptionList with name "' + optionList.name + '" is already registered. Please use a unique name.');
        } else {
            if (typeof args !== 'undefined') {
                this._optionLists[optionList.name] = new optionList(...args);
            } else {
                this._optionLists[optionList.name] = new optionList();
            }
        }
    }

    /**
     * Get an OptionList from it's name.
     */
    public get(name: string): OptionList {
        if (!this._optionLists.hasOwnProperty(name)) {
            throw Error('An OptionList with name "' + name +
                '" has not been registered. Please register OptionLists before requesting options from them.');
        }
        return this._optionLists[name];
    }
}
