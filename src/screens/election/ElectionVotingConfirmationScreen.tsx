import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import biometricsAuth from '../../utils/localAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ElectionStackParamList } from '../../types';
import { CandidateCard, CandidatesCardWrapper } from '../../components/CandidateCard';

type ElectionVotingConfirmationScreenProps = NativeStackScreenProps<ElectionStackParamList, 'ElectionVotingConfirmation'>;

const ElectionVotingConfirmationScreen = ({ navigation, route }: ElectionVotingConfirmationScreenProps) => {
    const { selectedCandidateID, selectedCandidateObject, electionName, electionID } = route.params;

    // useEffect(() => {
    //     const parentNav = navigation.getParent();
    //     parentNav?.setOptions({
    //         tabBarStyle: { display: 'none' },
    //     })

    //     return () => {
    //         parentNav?.setOptions({
    //             tabBarStyle: { display: 'flex' },
    //         })
    //     }
    // }, [])
    const onSubmit = () => {
        const passedParams = {
            selectedCandidateID,
            electionID
        };
        navigation.navigate('ElectionVotingFinalize', { ...passedParams })
    }

    return (
        <View className='h-full w-full bg-white px-4'>
            <View className='flex'>
                <Text className='text-3xl font-bold'>Confirmation</Text>
                <Text className='text-sm opacity-40'>Please enter passcode to confirm your choice</Text>
            </View>

            {/* <View className='flex justify-center items-center h-32 mt-10'>
                <Text>FACEID LOGO HERE</Text>
            </View> */}

            <View className='flex flex-col justify-center items-center w-full mt-24 '>
                <Text className='font-medium opacity-50'>Voting for</Text>
                <Text className='font-bold pb-4'>{electionName}</Text>
                <CandidatesCardWrapper confirmationCard>
                    <CandidateCard
                        candidateName={selectedCandidateObject.candidateName}
                        candidateDescription={selectedCandidateObject.candidateDescription}
                        candidatePhotoURL={selectedCandidateObject.candidatePhotoURL}
                        isPicked
                    />
                </CandidatesCardWrapper>
            </View>

            <View className='mt-5'>
                <TouchableOpacity className='bg-bluechain p-3 rounded-lg flex justify-center items-center' onPress={onSubmit} >
                    <Text className='font-medium text-white text-lg'>Continue</Text>
                </TouchableOpacity>
            </View>



        </View>
    );
};

export default ElectionVotingConfirmationScreen;
