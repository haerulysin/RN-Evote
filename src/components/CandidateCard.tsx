import { FontAwesome5 } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

type CandidatesCardProp = {
    candidateID?: string | undefined;
    candidateName: string;
    candidateDescription: string;
    candidatePhotoURL: string | undefined;
    isPicked?: boolean;
}

export const CandidateCard: React.FC<CandidatesCardProp> = (props: CandidatesCardProp) => {
    return (
        <View className="flex flex-row">
            <View className='flex flex-row w-10/12 '>
                <View className='h-[100%] w-[25%] p-2 '>
                    <Image source={{ uri: props.candidatePhotoURL }} className='h-full w-full rounded-full' />
                </View>
                <View className='flex justify-center w-full'>
                    <Text className='text-lg font-semibold'>{props.candidateName}</Text>
                    <Text className='text-xs w-9/12 opacity-50' numberOfLines={2}>{props.candidateDescription}</Text>
                </View>
            </View>
            {props.isPicked &&
                <View className='flex justify-center items-end pr-2 w-2/12'>
                    <FontAwesome5 name="vote-yea" size={22} color="#25AAE1" />
                </View>
            }
        </View>
    )

}

export const CandidatesCardWrapper = ({ children, confirmationCard }: { children: React.ReactNode, confirmationCard?: boolean }) => {

    return (
        <View className={`flex rounded-md h-20 mb-2 ${confirmationCard ? 'bg-gray-200' : 'bg-white'}`}>
            {children}
        </View>

    )

}