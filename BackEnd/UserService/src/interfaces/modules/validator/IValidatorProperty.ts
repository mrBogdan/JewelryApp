import { IRule } from '../../../modules/validator/rules';

export interface IRuleResponse {
    isError: boolean;
    msg: string;
}


export interface IRuleFn {
    (value: any, args?: any): IRuleResponse
}

export interface IValidatorProperty {
    field: {
        fieldName: string,
        value: any;
        rules: (IRule | IRuleFn)[];
    }
}