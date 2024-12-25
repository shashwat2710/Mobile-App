import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import React from "react";

type TextInputProps = {
  customStyleClass?: {
    customFieldClass: string;
    customFieldLabelClass: string;
    customFieldInputClass: string;
    customFieldPlaceholderClass: string;
  };
  label: string;
  value: string;
  fieldName: string;
  inputType:KeyboardTypeOptions | undefined,
  onChangeText: (text:string, value: string) => void;
  placeholder: string;
};

export const CustomTextInput = ({
  customStyleClass,
  label = "",
  value = "",
  fieldName = "",
  inputType,
  onChangeText,
  placeholder = "",
}: TextInputProps) => {
  return (
    <View className={`${customStyleClass?.customFieldClass}`}>
      {label && (
        <Text className={customStyleClass?.customFieldLabelClass}>{label}</Text>
      )}
      <TextInput
        className={customStyleClass?.customFieldInputClass}
        placeholderTextColor={customStyleClass?.customFieldPlaceholderClass}
        value={value}

        onChangeText={(text)=>onChangeText(fieldName, text)}
        placeholder={placeholder}
        keyboardType={inputType}
      />
    </View>
  );
};

export default CustomTextInput;
