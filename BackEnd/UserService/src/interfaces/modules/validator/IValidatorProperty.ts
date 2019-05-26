export interface IValidatorProperty {
    field: {
        fieldName: string,
        value: any;
        rules: any[]; // (value: any, params: {}) => ({ isError: boolean, message?: string })
    }
}