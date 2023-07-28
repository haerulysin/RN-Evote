import { View, Pressable, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'
import { Candidate } from '../types';


type CandidatesProp = {
    pickedOption: string | null;
    setPickedOption: Dispatch<SetStateAction<string | null>>;
    candidateList:Candidate[];
}

// const candidateDataExample = [
//     {
//         "candidatesName": "Katelyn Eaton",
//         "candidatesDescription": "Unfortunately, the candidate has not answered at this time.",
//         "docType": "Candidate",
//         'photoUri': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg'
//     },
//     {
//         "candidatesName": "Ashwin Shepard",
//         "candidatesDescription": "Unfortunately, the candidate has not answered at this time.",
//         "docType": "Candidate",
//         'photoUri': 'https://cdn.britannica.com/33/198133-050-CDC2D757/Joko-Widodo.jpg'
//     }
// ]

const CandidatesRadioButton = ({pickedOption, setPickedOption, candidateList}: CandidatesProp) => {
    return (
        <View>
            {candidateList.map((item:Candidate) => {
                return (
                    <CandidatesCard
                        candidatesName={item.candidateName}
                        candidatesDescription={item.candidateDescription}
                        candidatesPhoto={item.candidatePhotoURL as string}
                        // isSelected={items.candidatesName===pickedOption?true:false}
                        pickedOption={pickedOption}
                        setPickedOption={setPickedOption}
                        key={item.candidateID}

                    />
                )
            })}
        </View>

    )
}

type CandidatesCardProp = {
    candidatesName: string;
    candidatesDescription: string;
    candidatesPhoto: string;
    pickedOption?: string | null;
    setPickedOption?: Dispatch<SetStateAction<string | null>>;
    confirmationCard?:boolean;
}

export const CandidatesCard = (props: CandidatesCardProp) => {
    const { pickedOption, setPickedOption } = props;
    return (
        <View className={`flex rounded-md h-20 mb-2 ${props.confirmationCard ? 'bg-gray-200' : 'bg-white'}`}>
            <TouchableOpacity className='flex flex-row' onPress={() => setPickedOption!(props.candidatesName)}>
                <View className='flex flex-row w-10/12 '>
                    <View className='h-20 w-20 p-2 '>
                        <Image source={{ uri: props.candidatesPhoto }} className='h-full w-full rounded-full' />
                    </View>
                    <View className='flex justify-center w-full'>
                        <Text className='text-lg font-semibold'>{props.candidatesName}</Text>
                        <Text className='text-xs w-9/12 opacity-50' numberOfLines={2}>{props.candidatesDescription}</Text>
                    </View>
                </View>

                <View className='flex justify-center items-end pr-2 w-2/12'>
                    {props.pickedOption === props.candidatesName || props.confirmationCard ? <FontAwesome5 name="vote-yea" size={22} color="#25AAE1" /> : null}
                </View>
            </TouchableOpacity>
        </View>
    )

}



export default CandidatesRadioButton;