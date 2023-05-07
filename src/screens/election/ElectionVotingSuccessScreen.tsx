import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native';

type ElectionVotingSuccessScreenProps = {
    navigation: NavigationProp<any, any>;
}

const ElectionVotingSuccessScreen = (props: ElectionVotingSuccessScreenProps) => {


    return (
        <SafeAreaView className='bg-bluechain h-screen w-screen flex flex-col justify-between'>
            <View className='flex flex-col justify-center items-center'>
                <Text className='text-5xl font-bold text-white mt-24'>You Voted !</Text>
                <View className='mt-14'>
                    <Feather name="check-circle" size={124} color="white" />
                </View>
                <View className='mt-5'>
                    <Text className='text-white text-lg font-bold'>Block Address</Text>
                </View>
                <Text className='text-white w-11/12 px-4 text-center'>bef57ec7f53a6d40beb640a780a639c83bc29ac8a9816f1fc6c5c6dcd93c4721</Text>
            </View>

            <View className='flex flex-col px-4 mb-20'>
                <TouchableOpacity activeOpacity={0.7} className='flex items-center bg-gray-900 rounded-lg' onPress={() => { props.navigation.navigate('Election') }}>
                    <Text className='text-white p-3 text-lg'>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ElectionVotingSuccessScreen;
