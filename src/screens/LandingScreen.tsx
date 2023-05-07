import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CButton } from '../components/Button';
import { NavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


type LandingScreenProps = {
    navigation: NavigationProp<any, any>
}

const LandingScreen = (props: LandingScreenProps) => {


    return (
        <SafeAreaView className='px-4 bg-white h-full'>
            <StatusBar style='dark'/>
            <View className='flex justify-between h-full'>
                <View className='mt-5 mb-2'>
                    <View className='h-fit items-center'>
                        <Image
                            source={require('../../assets/img/icon.png')}
                            style={{ width: 120, height: 120 }}
                        />
                        <Text className='text-center opacity-50 mt-5'>
                            Use a fair evoting application to ensure correct election result with Hyperledger Fabric™.
                        </Text>
                    </View>
                </View>

                <View className='mx-10 mb-5'>
                    <CButton
                        title="Get Start"
                        bgcolor='bluechain'
                        onPress={() => props.navigation.navigate('LoginLanding')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LandingScreen;
