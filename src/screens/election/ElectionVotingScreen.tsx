import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import CandidatesRadioButton from '../../components/CandidatesRadio';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Candidate, Election, ElectionStackParamList } from '../../types';
import { GetCandidateByElectionID, GetElectionByID, GetElectionList } from '../../utils/RESTApi';
import { FragmentCardHeaderBar } from '../../components/HeaderBar';

type Props = NativeStackScreenProps<ElectionStackParamList, 'ElectionVoting'>;
const StyledView = styled(View, 'flex flex-row justify-center items-center opacity-50');
const ElectionVotingScreen: React.FC<Props> = (props: Props) => {
    const [pickedOption, setPickedOption] = useState<string | null>(null);
    const [electionData, setElectionData] = useState<Election>();
    const [candidateList, setCandidateList] = useState<Candidate[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { electionID } = props.route.params;

    const getElectionData = () => {
        GetElectionByID(electionID)
            .then(r => {
                if (r.status === 200) {
                    setElectionData(r.data as Election);
                    setCandidateList((r.data as any).candidateList);
                }
            })
            .catch(e => console.log(e))
            .finally(() => setRefreshing(false));
    }


    useEffect(() => {
        getElectionData();
    }, []);

    //Set Header While electionData available;
    useEffect(() => {
        const setHeader = () => {
            props.navigation.setOptions({
                header: (props) => <FragmentCardHeaderBar
                    title={electionData?.electionName}
                    location={electionData?.electionLocation}
                    {...props}
                />
            });
        }

        setHeader();
    }, [electionData]);

    return (
        <View className='flex items-center h-full pt-2 bg-gray-200'>
            <ScrollView
                className='pt-2 w-full'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            getElectionData();
                        }}

                    />
                }
            >
                <View>
                    <StyledView>
                        <MaterialIcons name="how-to-vote" size={16} color="black" />
                        <Text className='px-1 text-sm'>Total Votes</Text>
                    </StyledView>

                    <Text className='text-center text-3xl text-bluechain font-bold'>
                        {/* {(electionData?.totalVotes!).toLocaleString('de-DE')} */}
                        {electionData?.totalVotes}
                    </Text>

                    <StyledView className=''>
                        <AntDesign name="clockcircleo" size={14} color="black" />
                        <Text className='px-1 text-sm font-medium text-center'>Voting Closed at {new Date(electionData?.electionDate.to!).toLocaleString()}</Text>
                    </StyledView>
                </View>

                <View className='w-full mt-14 px-4'>
                    <CandidatesRadioButton
                        pickedOption={pickedOption}
                        setPickedOption={setPickedOption}
                        candidateList={candidateList}
                    />
                </View>


                <View className='flex mb-2 px-4'>
                    <TouchableOpacity
                        disabled={pickedOption === null ? true : false}
                        className={` p-2 h-12 rounded-lg items-center ${pickedOption ? 'bg-bluechain' : 'bg-blue-300'}`}
                        onPress={() => { props.navigation.navigate('ElectionVotingConfirmation') }}
                    >
                        <Text className='text-white font-bold text-lg'>Confirm your Vote</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
};



export default ElectionVotingScreen;
