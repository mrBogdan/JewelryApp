/*
 *  --------------- EXAMPLE OF OBJECT ---------------
 * [{
 * 'field': {
 *   fieldName: 'password',
 *   value: '123456BG',
 *       rules: [
 *          {
 *              params: {},
 *              check: hasLowerCase
 *
 *          },
 *          hasLowerCase,
 *          hasDigit,
 *          isTooLong
 *       ]
 *  }
 * }]
 *
 */

import { IValidatorProperty } from '../../interfaces/modules/validator/IValidatorProperty';
import { IRule, IRuleResponse } from './rules';
import { IValidatorResponse } from '../../interfaces/modules/validator/IValidatorResponse';

export function validator(object: IValidatorProperty[]): IValidatorResponse[] {
    let result: IValidatorResponse[] = [];

    object.forEach((item: IValidatorProperty) => {
        const fieldName: string = item.field.fieldName;
        const value: any = item.field.value;
        const rules: any[] = item.field.rules;
        const oResult: IValidatorResponse = {
            fieldName,
            value,
            hasError: false,
            errors: []
        };

        rules.forEach((rule: IRule) => {
            let checkedRule: IRuleResponse = {
                isError: false,
                msg: ''
            };

            if (typeof rule === 'object') {
                // @ts-ignore
                checkedRule = rule.check(value, ...rule.params);

            } else if (typeof rule === 'function'){
                // @ts-ignore
                checkedRule = rule(value);
            }

            oResult.hasError = checkedRule.isError;
            // @ts-ignore
            checkedRule.isError && oResult.errors.push(checkedRule.msg);
        });

        result.push(oResult);
    });

    return result;
}