import { FormValidInputProps, ValidationProps } from "./inputProps";
import { FieldReturnTypes } from "./returnTypes";

export const fieldValidation = ({
    fieldName,
    value,
  }: ValidationProps): FieldReturnTypes => {
    let isValidated = false;
    let errorMessage = "";
  
    switch (fieldName) {
      case "username":
        const usernameRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric only
        if (!value.trim()) {
          errorMessage = "Username is required.";
        } else if (!usernameRegex.test(value)) {
          errorMessage = "Username must be an alphanumeric combination.";
        } else if (value.length < 3) {
          errorMessage = "Username must be at least 3 characters long.";
        } else {
          isValidated = true;
        }
        break;
  
      case "email":
        const gmailRegex = /^[^\s@]+@gmail\.com$/; // Gmail addresses only
        if (!value.trim()) {
          errorMessage = "Email is required.";
        } else if (!gmailRegex.test(value)) {
          errorMessage = "Email must be a valid Gmail address (e.g., example@gmail.com).";
        } else {
          isValidated = true;
        }
        break;
  
      case "password":
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        if (!value.trim()) {
          errorMessage = "Password is required.";
        } else if (value.length < 8 || value.length > 15) {
          errorMessage = "Password must be between 8 and 15 characters.";
        } else if (!passwordRegex.test(value)) {
          errorMessage =
            "Password must contain at least one letter, one number, and one special character.";
        } else {
          isValidated = true;
        }
        break;
  
      default:
        errorMessage = "Invalid field name.";
    }
  
    return { isValidated, errorMessage };
  };

  export const isFormValid = ({formValues, formErrors}:FormValidInputProps) :boolean=> {
    // Check if any field is empty
    const isEmpty = Object.values(formValues).some((value) => value.trim() === "");
    
    // Check if there are any error messages
    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    return !isEmpty && !hasErrors; // Button will be enabled only if no empty fields and no errors
  };