import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { CButton, OutlineButton } from '../../components/Button';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


type LoginLandingScreenProps = {
    navigation: NavigationProp<any, any>
}

const LoginLandingScreen = ({ navigation }: LoginLandingScreenProps) => {


    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='flex h-full w-full justify-between items-center '>
                <View className='mt-5'>
                    <Text className='text-center font-medium text-lg'>Account Setup</Text>
                    <Text className='opacity-50'>Import an existing account or enroll a new one</Text>
                </View>

                <View className='w-full px-12 mb-5'>

                    <OutlineButton
                        title="Impor Existing Certificate"
                        onPress={() => navigation.navigate('Login')}
                    />

                    <CButton
                        title='Enroll new Account'
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginLandingScreen;
