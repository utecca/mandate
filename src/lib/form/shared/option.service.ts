import { Injectable } from '@angular/core';
import { OptionList } from './option-list';
import { OptionListRef } from './option-list-ref';
import { isFunction } from 'ngx-plumber';
import { Option } from './interfaces/option';
import { BehaviorSubject } from 'rxjs';
import { OptionListArray } from './option-list-array';


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

    public get(
        options: Option[] | string | ((filter: string) => Option[]), value: BehaviorSubject<any>,
        placeholder: string,
        placeholderInOptions: boolean
    ): OptionListRef {
        if (isFunction(options)) {
            // this._optionList = new OptionListFunction(options);
        } else if (options instanceof Array) {
            return new OptionListRef(new OptionListArray(options), value, placeholder, placeholderInOptions);
        } else if (typeof options !== 'undefined') {
            return new OptionListRef(this.getOptionList(<string>options), value, placeholder, placeholderInOptions);
        }
    }

    private getOptionList(id: string): OptionList {
        if (!this._optionLists.hasOwnProperty(id)) {
            throw Error('An OptionList with id "' + id +
                '" has not been registered. Please register OptionLists before requesting options from them.');
        }
        return this._optionLists[id];
    }
}
