export type ValidationProps = {
    fieldName: string,
    value: string,
}

export type FormInputProps = {
    username?: string;
    email?:string;
    password?:string;
}

export type FormValidInputProps = {

    formValues: FormInputProps;
    formErrors: FormInputProps;
}