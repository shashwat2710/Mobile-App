import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type PasswordInputProps = {
  customStyleClass?: {
    customFieldClass: string;
    customFieldLabelClass: string;
    customFieldInputClass: string;
    customFieldPlaceholderClass: string;
    customFieldPasswordIcon:string;
  };
  label:string,
  placeholder: string;
  fieldName: string;
  value: string;
  onChange: (text: string) => void;
};

export const PasswordInput = ({
  customStyleClass,
  placeholder,
  label,
  fieldName,
  value,
  onChange,
}: PasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className={customStyleClass?.customFieldClass}>
            {label && (
              <Text className={customStyleClass?.customFieldLabelClass}>{label}</Text>
            )}
      <View className=" relative w-full">
      <TextInput
        className={customStyleClass?.customFieldInputClass}
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={customStyleClass?.customFieldPlaceholderClass}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} className={`${customStyleClass?.customFieldPasswordIcon}`}>
        <Icon
          name={isPasswordVisible ? "eye" : "eye-slash"} // Toggle between eye and eye-slash icon
          size={20}
          color="#CDCDE0" // You can customize the icon color here
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
