import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validator Creation Funtions

// Password with at least one lowercase, one uppercase, and one number
export function passwordstrengthValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUppercase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const isLongEnough = value.length >= 8;
        const passwordValid = hasUppercase && hasLowerCase && hasNumeric && isLongEnough;
        return !passwordValid ? {passwordStrength: true} : null;

    }
}

// Text containing only letters and is between 3 and 45 characters
export function fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const onlyLetters = /[a-zA-Z]+$/.test(value);
        const properLength = value.length >= 3 && value.length <= 45;
        const nameValid = onlyLetters && properLength;

        return !nameValid ? {fullNameFormat: true} : null;

    }
}

// Number above 50
export function WeightValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        const value = control.value;

        if (!value) {
            return null;
        }

        // Check numeric value
        const isNumber = Number(value);
        if (!isNumber) return {properWeight: true}

        // Check proper range
        if (value < 50) return {properWeight: true}

        return null;
    }
}