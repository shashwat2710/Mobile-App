import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from './components/CustomButton/CustomButton';

export const LogoComponent = ({ height = 110, width = 110, bgColor = 'black' }) => {
  return (
    <View className={`w-[${width}px] h-[${height}px] bg-${bgColor} rounded-full items-center justify-center`}>
      <Image source={images.logo} className={`w-[${width - 20}px] h-[${height - 20}px] rounded-full`} resizeMode="contain" />
     </View>
  );
};

export default function RootLayout() {

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: "100%"}}>
    <View className='w-full container items-center min-h-[85vh] px-4'>
      <LogoComponent />
      <Image source={images.cards} className='max-w-[380px] w-full max-h-[300px]' resizeMode='contain' />
      <View className='relative mt-7'>
      <Text className="text-4xl text-white">
        Discover Endless Possibilities with React Native
      </Text>
      <Text className='text-secondary-200'>Shashwat App</Text>
      <Text className='text-sm mt-2 font-pregular text-gray-400'>Where Creativity Meets Innovation: Embark on a journey of Limitless Exploration with React Native</Text>

    </View>
      <CustomButton label={"Continue with Email"} handlePress={()=>router.push('/sign-in') } containerStyles="w-full mt-7 mb-2" isLoading={false} />
    </View>
      </ScrollView>
    <StatusBar backgroundColor='#161622' style="light" />
     </SafeAreaView>
  );
}