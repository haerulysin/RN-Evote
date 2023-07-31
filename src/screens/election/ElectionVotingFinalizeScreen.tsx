import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { APIResponseType, ElectionStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GetJobData, PostCastVote } from '../../utils/RESTApi';
type Props = NativeStackScreenProps<ElectionStackParamList, 'ElectionVotingFinalize'>;
const ElectionVotingSuccessScreen: React.FC<Props> = ({ route, navigation }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const onContinue = () => {
        navigation.navigate('Election');
    }

    useEffect(() => {

    },[])


    return (
        <SafeAreaView className='bg-bluechain h-screen w-screen flex flex-col justify-between'>
            <View className='flex flex-col justify-center items-center'>
                <Text className='text-5xl font-bold text-white mt-24'>{isLoading ? 'Please Wait' : 'You Voted !'}</Text>
                <View className='mt-14'>
                    {!isLoading && <Feather name="check-circle" size={124} color="white" />}
                </View>

                {/* <Text className='font-bold text-white text-4xl'>{nm}</Text> */}

                <View className='mt-5'>
                    <Text className='text-white text-lg font-bold'>
                        {isLoading ? 'Invoking Transaction...' : 'Block Address'}
                    </Text>
                </View>
                <Text className='text-white w-11/12 px-4 text-center'>
                    {isLoading ? 'Invoking your trransaction to the ledger' : ''}
                </Text>
            </View>

            <View className='flex flex-col px-4 mb-20'>
                <TouchableOpacity activeOpacity={0.7} className='flex items-center bg-gray-900 rounded-lg' onPress={onContinue} disabled={isLoading}>
                    {!isLoading && <Text className='text-white p-3 text-lg'>Continue</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default ElectionVotingSuccessScreen;
