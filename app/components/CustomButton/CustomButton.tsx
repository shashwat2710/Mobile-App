import {   GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import React from 'react';

type CustomButtonProps = {
  label:String,
  handlePress?: (event?: GestureResponderEvent) => void;
  containerStyles?:String;
  isLoading?: boolean | undefined;
  disabled?: boolean | undefined;
}

const CustomButton = ({label="", handlePress = ()=>{}, containerStyles = "", isLoading = false, disabled =  false}:CustomButtonProps) => {
  const isDisabled = isLoading || disabled;
  console.log(isDisabled);
  return (
    <TouchableOpacity className={`bg-secondary-100 rounded-xl min-h-[58px] justify-center items-center ${containerStyles} ${isDisabled ? 'opacity-50': ''}`}
    disabled={isDisabled}
    onPress={handlePress}
    activeOpacity={0.7}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton