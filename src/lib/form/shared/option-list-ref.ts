import { OptionList } from './option-list';
import { Option } from './interfaces/option';
import { OptionListFunction } from './option-list-function';
import { OptionListArray } from './option-list-array';
import { BehaviorSubject } from 'rxjs';

export class OptionListRef {
    public _placeholder: Option = {
        value: null,
        label: this.placeholder,
        placeholder: true
    };

    public _excludedValues = [];
    public isLoading = false;

    public currentOptions = new BehaviorSubject<Option[]>([]);

    /**
     * Contains the selected option (this.value contains the actual value).
     */
    public selectedOption = new BehaviorSubject<Option>(null);

    constructor(
        public _optionList: OptionList | OptionListFunction | OptionListArray,
        private value: BehaviorSubject<any>,
        private placeholder: string,
        private _showPlaceholderAsOption: boolean
    ) {
        // Get the initial options
        setTimeout(() => {
            if (this.currentOptions.value.length === 0) {
                this.options(null);
            }
        }, 0);

        this.value.subscribe((newValue) => { // TODO Unsubscribe on destroy!
            if (newValue === null || typeof newValue === 'undefined') {
                this.selectedOption.next(this._placeholder);
                this.isLoading = false;
            } else {
                this.isLoading = true;
                // Get the selected option from OptionList
                this._optionList.option(newValue).then(
                    result => {
                        // Check if the value is still the same
                        if (this.value.value === result.value) {
                            this.selectedOption.next(result);
                            this.isLoading = false;
                        }
                    }
                );
            }
        });
    }

    /**
     * Will ask the OptionList to return the options matching the search-string.
     */
    public options(search: string = null): void {
        this._optionList.options(this, search).then(
            result => {
                const options: Option[] = [];

                if ((search === '' || search === null) && this.placeholder !== '' && this._showPlaceholderAsOption) {
                    options.push(this._placeholder);
                }

                this.currentOptions.next(options.concat(result));
            },
            error => {}
        );
    }

    /**
     * Exclude certain values from options.
     */
    public exclude(values): void {
        if (!this.compareArray(values, this._excludedValues)) {
            this._excludedValues = values;

            // Get the initial options
            this.options(null);
        }
    }


    // TODO Move to Plumber!
    private compareArray(array1: any[], array2: any[]) {

        const duplicates = [];

        array1.forEach((i1) => {
            array2.forEach((i2) => {
                if (i1 === i2) {
                    duplicates.push(i1);
                }
            });
        });

        return duplicates.length === array1.length && duplicates.length === array2.length;
    }
}
