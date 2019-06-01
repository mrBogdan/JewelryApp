import { IRuleFn, IRuleResponse } from '../../interfaces/modules/validator/IValidatorProperty';

export interface IRule {
    check: IRuleFn,
    params: any[],
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

export function checkEmail(value: string): IRuleResponse {
    return {
        isError: !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)),
        msg: 'Invalid email',
    }
}

export function onlyLetter(value: string): IRuleResponse {
    return {
        isError: !(/^[a-zA-Z]*$/.test(value)),
        msg: 'Only letters'
    }
}

export function hasNumber(value: string): IRuleResponse {
    return {
        isError: !(/[0-9]/.test(value)),
        msg: 'Should has at least one number'
    }
}

export function hasUpperCase(value: string): IRuleResponse {
    return {
        isError: !(/[A-Z]/.test(value)),
        msg: 'Should has at least one upper case letter'
    }
}

export function hasLowerCase(value: string): IRuleResponse {
    return {
        isError: !(/[a-z]/.test(value)),
        msg: 'Should has at least one lower case letter'
    }
}