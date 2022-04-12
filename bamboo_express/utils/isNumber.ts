export default function isNumber(value : string) : boolean {
    return !isNaN(Number(value));
}