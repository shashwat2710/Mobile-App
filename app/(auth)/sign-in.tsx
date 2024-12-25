import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormFields from "../components/FormFields/FormFields";
import signInForm from "../Data/loginForm.json";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton/CustomButton";
import { fieldValidation, isFormValid } from "../helper/utils";

const signIn = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string): void => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
        const { isValidated, errorMessage } = fieldValidation({ fieldName: name as "username" | "email" | "password", value });
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMessage, // Update error message for the field
        }));
        
  };


  const handleLogin = () => {};
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full container justify-center  h-full px-4 my-[-25px] '>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[110px] h-[125px]'
          />
          <Text className='text-2xl text-white text-semibold font-psemibold my-[-20px]'>
            Log in to Portal
          </Text>
          <FormFields
            inputForm={signInForm}
            headerText={"Sign In"}
            handleInputChange={handleInputChange}
            formValue={formValues}
            formErrors={formErrors}
          />
          <View className='flex justify-end w-full items-end'>
            <Text
              className='text-[#CDCDE0] mt-4 text-sm'
              onPress={() => {
                router.push("/forgot-password");
              }}
            >
              Forgot password
            </Text>
          </View>
          <CustomButton
            label={"Log In"}
            handlePress={handleLogin}
            containerStyles='w-full mt-7 mb-2'
            isLoading={false}
            disabled={!isFormValid({formValues, formErrors})}
          />
          <View className="flex justify-center items-center w-full">
          <Text className="text-gray-100 text-sm mt-5">
      Don't have an account?{" "}
      <TouchableOpacity onPress={()=>router.navigate("/sign-up")}>
        <Text className="text-secondary-100 font-pbold">Sign Up</Text>
      </TouchableOpacity>
    </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
