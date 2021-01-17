import { isArray } from "util"

export const IsInteger = (numbers: any): boolean => {

    if (!isArray(numbers))
        numbers = [numbers];
    return numbers.every(e => !Number.isNaN(parseInt(e)));
}