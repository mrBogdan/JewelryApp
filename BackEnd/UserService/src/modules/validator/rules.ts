export interface IRuleResponse {
    isError: boolean;
    msg: string;
}

export function hasLessThenLength(value: string, neededLength: number, fieldName: string = ''): IRuleResponse {
    return {
        isError: !(value.length < neededLength),
        msg: `The length of  ${fieldName} is great then ${neededLength}`,
    };
}

export function hasGreatThenLength(value: string, neededLength: number, fieldName: string = ''): IRuleResponse {
    return {
        isError: !(value.length > neededLength),
        msg: `The length of  ${fieldName} is less then ${neededLength}`,
    }
}


export function hasGreatThenOrEqualLength(value: string, neededLength: number, fieldName: string = ''): IRuleResponse {
    return {
        isError: !(value.length >= neededLength),
        msg: `The length of  ${fieldName} is less and not equal then ${neededLength}`,
    };
}

export function hasLowerCaseChar(value: string, fieldName: string): IRuleResponse {
    return {
        isError: !(/[a-z]/.test(value)),
        msg: `The ${fieldName} must has lower case symbols`,
    };
}

export function hasUpperCaseChar(value: string, fieldName: string): IRuleResponse {
    return {
        isError: !(/[A-Z]/.test(value)),
        msg: `The ${fieldName} must has lower case symbols`,
    };
}