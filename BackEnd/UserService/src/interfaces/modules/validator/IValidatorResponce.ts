export interface IValidatorResponce {
    fieldName: string;
    value: any;
    hasError: boolean;
    errors?: []
}