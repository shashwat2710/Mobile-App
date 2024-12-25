
import React from 'react'
import {Tabs, Redirect} from "expo-router";
import { Image, Text, View } from 'react-native';

import {icons} from "../../constants";

type TabIconProps = {
  icon: any; // Replace `any` with the correct type if available
  color: any; // Replace `any` with the correct type
  name: any;
  focused: boolean; // Assuming `focused` is a boolean
};

type TabIconBarIconProps =  {color:any, focused:boolean, size:any}

const TabIcon = ({icon, color, name, focused}:TabIconProps)=>{
  return <View className='items-center justify-center gap-2'>
    <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6' />
    <Text className={`${focused ?'font-psemibold':'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
  </View>
}

const TabsLayout = () => {
  return (
   <>
   <Tabs
   screenOptions={{tabBarShowLabel:false,
    tabBarActiveTintColor:"#ffA001",
    tabBarInactiveTintColor:"#cdcde0",
    tabBarStyle:{
      backgroundColor:"#161622",
      borderTopWidth:1,
      borderTopColor:"#232533",
      height:84
    },
    tabBarLabelPosition:"beside-icon"
   }}>
  <Tabs.Screen
    name="home"
    options={{
      title: 'Home',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }: TabIconBarIconProps) => (
        <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
      ),
    }}
  />
  <Tabs.Screen
    name="profile"
    options={{
      title: 'Profile',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }: TabIconBarIconProps) => (
        <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
      ),
    }}
  />
  <Tabs.Screen
    name="create"
    options={{
      title: 'Create',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }: TabIconBarIconProps) => (
        <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
      ),
    }}
  />
    <Tabs.Screen
      name="bookmark"
      options={{
        title: 'Bookmark',
        headerShown: false,
        tabBarIcon: ({ color, size, focused }: TabIconBarIconProps) => (
          <TabIcon icon={icons.bookmark} color={color} name="Saved" focused={focused} />
        ),
      }}
    />
  
</Tabs>
   </>
  )
}

export default TabsLayout;