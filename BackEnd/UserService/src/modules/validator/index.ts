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
import { IRuleResponce } from './rules';
import { IValidatorResponce } from '../../interfaces/modules/validator/IValidatorResponce';

export function validator(object: IValidatorProperty[]): IValidatorResponce[] {
    let result: IValidatorResponce[] = [];

    object.forEach((item: IValidatorProperty) => {
        const fieldName: string = item.field.fieldName;
        const value: any = item.field.value;
        const rules: any[] = item.field.rules;
        const oResult: IValidatorResponce = {
            fieldName,
            value,
            hasError: false,
            errors: []
        };

        rules.forEach((rule: { check: (value: any, args) => IRuleResponce, params: {} }) => {
            let checkedRule: IRuleResponce = {};

            if (typeof rule === 'object') {
                checkedRule = rule.check(value, ...rule.params);

            } else if (typeof rule === 'function'){
                checkedRule = rule(value);
            }

            oResult.hasError = checkedRule.isError;
            checkedRule.isError && oResult.errors.push(checkedRule.msg);
        });

        result.push(oResult);
    });

    return result;
}