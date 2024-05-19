export function numberWithSpaces(x) {
    return (x === undefined ? '' : x.toString()).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}