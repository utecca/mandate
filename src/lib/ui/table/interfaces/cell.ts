export interface Cell {
    content: string,
    orientation?: "left"|"center"|"right",
    colSpan?: number
}