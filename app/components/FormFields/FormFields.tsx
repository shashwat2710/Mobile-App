import { Text, View } from "react-native";
import React from "react";
import { CustomTextInput } from "./TextInput";
import PasswordInput from "./PasswordInput.";

type UserKeys = "email" | "password" | "username";
type FieldName = UserKeys | string;
type InputType = "email-address" | "default" | "password" | string;
type FormFields = {
  headerText: string;
  inputForm: Array<{
    fieldName: FieldName;
    fieldLabel: string;
    inputType: InputType;
    inputPlaceholder: string;
  }>;
  formValue: Record<FieldName, string>;
  formErrors: { [key: string]: string };
  handleInputChange: (name: FieldName, value: string) => void;
};

const FormFields = ({
  headerText = "",
  inputForm,
  handleInputChange,
  formValue,
  formErrors,
}: FormFields) => {
  const customFieldClass = "mt-4";
  const customFieldLabelClass =
    "text-[#CDCDE0] my-[8px] font-pmedium text-[16px] ";
  const customFieldInputClass =
    " text-white text-pbold tex-[16px] p-3 border-[#232533] h-[58px] bg-[#1E1E2D]  border border-2 focus:border-[#FF9C01] rounded-lg";
  const customFieldPlaceholderClass = "#7B7B8B";
  const customFieldPasswordIcon =
    "absolute right-2 top-1/2 transform -translate-y-1/2";
  return (
    <View className='space-y-2'>
      <Text className='text-white mt-10 text-2xl font-pbold'>{headerText}</Text>
      {inputForm.map((formField) => {
        return (
          <View key={formField.fieldName}>
            {(formField.inputType === "email-address" ||
              formField.inputType === "default") && (
              <CustomTextInput
                label={formField.fieldLabel}
                customStyleClass={{
                  customFieldClass,
                  customFieldLabelClass,
                  customFieldInputClass,
                  customFieldPlaceholderClass,
                }}
                value={formValue[formField.fieldName]}
                placeholder={formField.inputPlaceholder}
                inputType={formField.inputType}
                fieldName={formField.fieldName}
                onChangeText={handleInputChange}
              />
            )}
            {formField.inputType === "password" && (
              <PasswordInput
                customStyleClass={{
                  customFieldClass,
                  customFieldLabelClass,
                  customFieldInputClass,
                  customFieldPlaceholderClass,
                  customFieldPasswordIcon,
                }}
                label={formField.fieldLabel}
                placeholder={formField.inputPlaceholder}
                fieldName={formField.fieldName}
                value={formValue?.password}
                onChange={(text) =>
                  handleInputChange(formField.fieldName, text)
                }
              />
            )}

            {formErrors[formField.fieldName] && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors[formField.fieldName]}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default FormFields;
