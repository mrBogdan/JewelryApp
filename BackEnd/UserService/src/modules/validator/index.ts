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

import { IRuleFn, IRuleResponse, IValidatorProperty } from '../../interfaces/modules/validator/IValidatorProperty';
import { IRule } from './rules';
import { IValidatorResponse } from '../../interfaces/modules/validator/IValidatorResponse';

export function validator(object: IValidatorProperty[]): IValidatorResponse[] {
    let result: IValidatorResponse[] = [];

    object.forEach((item: IValidatorProperty) => {
        const fieldName: string = item.field.fieldName;
        const value: any = item.field.value;
        const rules: (IRule | IRuleFn)[] = item.field.rules;
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
                checkedRule = rule.check(value, ...rule.params);
            } else if (typeof rule === 'function'){
                // @ts-ignore
                checkedRule = rule(value);
            }

            if (!oResult.hasError) {
                oResult.hasError = checkedRule.isError;
            }

            // @ts-ignore
            checkedRule.isError && oResult.errors.push(checkedRule.msg);
        });

        oResult.hasError && result.push(oResult);
    });

    return result;
}