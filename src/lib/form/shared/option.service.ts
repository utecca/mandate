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
        if (this._optionLists.hasOwnProperty(optionList.id)) {
            throw Error('An OptionList with id "' + optionList.id + '" is already registered. Please use a unique id.');
        } else {
            if (typeof args !== 'undefined') {
                this._optionLists[optionList.id] = new optionList(...args);
            } else {
                this._optionLists[optionList.id] = new optionList();
            }
        }
    }

    /**
     * Get an OptionList from it's id.
     */
    public get(id: string): OptionList {
        if (!this._optionLists.hasOwnProperty(id)) {
            throw Error('An OptionList with id "' + id +
                '" has not been registered. Please register OptionLists before requesting options from them.');
        }
        return this._optionLists[id];
    }
}
