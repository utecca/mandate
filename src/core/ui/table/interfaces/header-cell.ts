export interface HeaderCell {
    content: string;
    name?: string;
    sortable?: boolean;
    orientation?: 'left'|'center'|'right';
    compact?: boolean;
    noBreak?: boolean;
}
