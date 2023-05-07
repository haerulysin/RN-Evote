import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import biometricsAuth from '../../utils/localAuth';
import { CandidatesCard } from '../../components/CandidatesRadio';


type ElectionVotingConfirmationScreenProps = {
    navigation: NavigationProp<any, any>;
}

const ElectionVotingConfirmationScreen = (props: ElectionVotingConfirmationScreenProps) => {

    const { navigation } = props;

    return (
        <View className='h-full w-full bg-white px-4'>
            <View className='flex'>
                <Text className='text-3xl font-bold'>Confirmation</Text>
                <Text className='text-sm opacity-40'>Please enter passcode to confirm your choice</Text>
            </View>

            {/* <View>
                <TouchableOpacity onPress={biometricsAuth}>
                    <Text>Auth</Text>
                </TouchableOpacity>
            </View> */}


            <View className='flex justify-center items-center h-32 mt-10'>
                <Text>FACEID LOGO HERE</Text>
            </View>

            <View className='flex flex-col justify-center items-center w-full '>
                <Text className='font-medium opacity-50'>Voting for</Text>
                <Text className='font-bold pb-4'>Mayoral Election</Text>
                <CandidatesCard
                    candidatesName='Jookow'
                    candidatesDescription='AHHAY'
                    candidatesPhoto='https://upload.wikimedia.org/wikipedia/commons/b/be/Joko_Widodo_2019_official_portrait.jpg'
                    confirmationCard={true}
                />
            </View>

            <View className='mt-5'>
                <TouchableOpacity className='bg-bluechain p-3 rounded-lg flex justify-center items-center' onPress={() => navigation.navigate('ElectionVotingSuccess')}>
                    <Text className='font-medium text-white text-lg'>Continue</Text>
                </TouchableOpacity>
            </View>



        </View>
    );
};

export default ElectionVotingConfirmationScreen;
