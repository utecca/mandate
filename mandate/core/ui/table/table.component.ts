import { Component, Input } from '@angular/core';
import { TableConfig } from './interfaces/table-config';

@Component({
    selector: '<man-table></man-table>',
    templateUrl: './table.component.html'
})
export class TableComponent {
    @Input() config: TableConfig;

    /**
     * Handle a Buoy query.
     */
    @Input() query: any;

    public expandedRows: number[] = [];

    public sortName: string = null;
    public sortAsc = true;

    constructor() {
    }

    public expandRow(id: number, event: any) {
        if (event) {
            if (event.dtIgnore === true) {
                return false;
            }
        }

        if (this.expandedRows.indexOf(id) > -1) {
            delete this.expandedRows[this.expandedRows.indexOf(id)];
        } else {
            this.expandedRows.push(id);
        }
    }

    /**
     * Contract all rows.
     */
    public contractAllRows() {
        //
    }

    /**
     * Contract row with id.
     */
    public contractRow(id: number) {
        //
    }

    public thClick(column) {
        if (column.sortable === true) {
            if (this.sortName !== column.name) {
                this.sortAsc = true;
                this.sortName = column.name;
            } else {
                if (this.sortAsc === false) {
                    this.sortName = null;
                }
                this.sortAsc = !this.sortAsc;
            }
        }
        this.handleSortChange();
    }

    private handleSortChange() {
        if (typeof this.query !== 'undefined') {
            const orderBy = {};

            if (this.sortName !== null) {
                orderBy[this.sortName] = this.sortAsc ? 'ASC' : 'DESC';
            }

            this.query.setVariable('orderBy', orderBy).setPage(1).refetch();
            console.log('CLI', this.query);
        }
    }

}
