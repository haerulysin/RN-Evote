import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GetJobData, PostCastVote } from '../../utils/RESTApi';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ElectionStackParamList, JobsType, APIResponseType } from '../../types';
import { StorageKey } from '../../types/enum';

type Props = NativeStackScreenProps<ElectionStackParamList, 'ElectionVotingFinalize'>;
const ElectionVotingSuccessScreen: FC<Props> = ({ route, navigation }: Props) => {
    const { selectedCandidateID, electionID } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobsID, setJobsID] = useState<string | null>(null);
    const [castData, setCastData] = useState<JobsType>();

    useEffect(() => {
        PostCastVote(selectedCandidateID, electionID).then((r: APIResponseType) => {
            if (r.status === 202) {
                setJobsID((r.data as any).jobId);
            }
        })
            .catch(e => Alert.alert("ERROR", e));
        return setJobsID(null);
    }, []);

    const storeTxID = async (newTx: string) => {
        let getTx = await AsyncStorage.getItem(StorageKey.TXList);
        if (getTx === null) {
            await AsyncStorage.setItem(StorageKey.TXList, JSON.stringify([newTx]));
        } else {
            let txObject = JSON.parse(getTx);
            txObject.push(newTx);
            txObject = txObject.filter((v: any, i: any) => txObject.indexOf(v) === i);
            await AsyncStorage.setItem(StorageKey.TXList, JSON.stringify(txObject));
        }
    }

    useEffect(() => {
        if (jobsID !== null) {
            const fetchJobs = setInterval(() => {
                GetJobData(jobsID)
                    .then((r: APIResponseType) => {
                        const data = r.data as JobsType;
                        if (data.transactionError) {
                            Alert.alert("Transaction Error", data.transactionError, [{ text: "Continue", onPress: () => navigation.navigate('ElectionVoting', { electionID }) }]);
                            clearInterval(fetchJobs);
                        } else if (data.transactionPayload && !data.transactionError) {
                            setCastData(data);
                            storeTxID(data.transactionIds[0]);
                            setIsLoading(false);
                            clearInterval(fetchJobs);
                        }
                    })
                    .catch(e => Alert.alert("ERROR", e))
            }, 3000)
            return () => { clearInterval(fetchJobs) }
        }

    }, [jobsID])

    const onContinue = () => {
        navigation.navigate('Election');
    }

    const onPressTxID = () => {
        if (!isLoading) {
            Clipboard.setStringAsync(castData?.transactionIds[0] as string);
            Toast.show("TX ID copied to clipboard");
        }
    }

    return (
        <SafeAreaView className='bg-bluechain h-screen w-screen flex flex-col justify-between'>

            <View className='flex flex-col justify-center items-center'>
                <Text className='text-5xl font-bold text-white mt-24'>
                    {isLoading ? 'Please Wait' : 'You Voted !'}
                </Text>

                <View className='mt-14'>
                    {!isLoading && <Feather name="check-circle" size={124} color="white" />}
                </View>
                {/* <Text className='font-bold text-white text-4xl'>{nm}</Text> */}
                <View className='mt-5'>
                    <Text className='text-white text-lg font-bold'>
                        {isLoading ? 'Invoking Transaction...' : 'Transaction ID'}
                    </Text>
                </View>
                <Text className='text-white w-11/12 px-4 text-center' onPress={onPressTxID} >
                    {isLoading ? 'Invoking your trransaction to the ledger' : castData?.transactionIds[0]}
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
