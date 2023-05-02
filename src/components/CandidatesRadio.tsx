import { View, Pressable, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'


type CandidatesProp = {
    pickedOption: string | null;
    setPickedOption: Dispatch<SetStateAction<string | null>>;
}

const candidateDataExample = [
    {
        "candidatesName": "Katelyn Eaton",
        "candidatesDescription": "Unfortunately, the candidate has not answered at this time.",
        "docType": "Candidate",
        'photoUri': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/1200px-Joe_Biden_presidential_portrait.jpg'
    },
    {
        "candidatesName": "Ashwin Shepard",
        "candidatesDescription": "Unfortunately, the candidate has not answered at this time.",
        "docType": "Candidate",
        'photoUri': 'https://cdn.britannica.com/33/198133-050-CDC2D757/Joko-Widodo.jpg'
    }
]

const CandidatesRadioButton = (props: CandidatesProp) => {
    const { pickedOption, setPickedOption } = props;
    return (
        <View>
            {candidateDataExample.map((items) => {
                return (
                    <CandidatesCard
                        candidatesName={items.candidatesName}
                        candidatesDescription={items.candidatesDescription}
                        candidatesPhoto={items.photoUri}
                        // isSelected={items.candidatesName===pickedOption?true:false}
                        pickedOption={pickedOption}
                        setPickedOption={setPickedOption}
                        key={items.candidatesName}

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
                    <View className='flex justify-center'>
                        <Text className='text-lg font-semibold'>{props.candidatesName}</Text>
                        <Text className='text-xs w-8/12 opacity-50'>{props.candidatesDescription}</Text>
                    </View>
                </View>

                <View className='flex items-center justify-center w-2/12'>
                    {props.pickedOption === props.candidatesName || props.confirmationCard ? <FontAwesome5 name="vote-yea" size={24} color="#4086FF" /> : null}
                </View>
            </TouchableOpacity>
        </View>
    )

}



export default CandidatesRadioButton;