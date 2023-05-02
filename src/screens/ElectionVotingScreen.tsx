import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import CandidatesRadioButton from '../components/CandidatesRadio';
import { NavigationProp } from '@react-navigation/native';

type ElectionVotingScreenProps = {
    navigation: NavigationProp<any, any>;
}

const StyledView = styled(View, 'flex flex-row justify-center items-center opacity-50');
const ElectionVotingScreen = (props: ElectionVotingScreenProps) => {
    const [pickedOption, setPickedOption] = useState<string | null>(null);
    const { navigation } = props;

    return (
        <View className='flex items-center h-full pt-2 bg-gray-200'>
            <ScrollView className='pt-2 w-full'>
                <View>
                    <StyledView>
                        <MaterialIcons name="how-to-vote" size={16} color="black" />
                        <Text className='px-1 text-sm'>Total Votes</Text>
                    </StyledView>

                    <Text className='text-center text-3xl text-bluechain font-bold'>
                        {(28392839).toLocaleString('de-DE')}
                    </Text>

                    <StyledView>
                        <AntDesign name="clockcircleo" size={14} color="black" />
                        <Text className='px-1 text-sm font-medium'>Voting Closed at 16:00 3 Nov, 2023</Text>
                    </StyledView>
                </View>

                <View className='w-full mt-14 px-4'>
                    <CandidatesRadioButton
                        pickedOption={pickedOption}
                        setPickedOption={setPickedOption}
                    />
                </View>


                <View className='flex mb-2 px-4'>
                    <TouchableOpacity
                        disabled={pickedOption === null ? true : false}
                        className={` p-2 h-12 rounded-lg items-center ${pickedOption ? 'bg-bluechain':'bg-blue-300' }`}
                        onPress={() => { navigation.navigate('ElectionVotingConfirmation') }}
                    >
                        <Text className='text-white font-bold text-lg'>Confirm your Vote</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    );
};



export default ElectionVotingScreen;
