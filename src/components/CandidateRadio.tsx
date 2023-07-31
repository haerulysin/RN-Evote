import { View, Pressable, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'
import { Candidate } from '../types';
import { CandidateCard, CandidatesCardWrapper } from './CandidateCard';


type CandidatesProp = {
    pickedOption: string | null;
    setPickedOption: Dispatch<SetStateAction<string | null>>;
    candidateList: Candidate[];
}

const CandidatesRadioButton = ({ pickedOption, setPickedOption, candidateList }: CandidatesProp) => {
    return (
        <View>
            {candidateList.map((item: Candidate) => {
                return (
                    <CandidatesCardWrapper key={item.candidateID}>
                        <TouchableOpacity onPress={() => setPickedOption!(item.candidateID as string)}>
                            <CandidateCard
                                candidateID={item.candidateID}
                                candidateName={item.candidateName}
                                candidateDescription={item.candidateDescription}
                                candidatePhotoURL={item.candidatePhotoURL}
                                isPicked={pickedOption === item.candidateID}
                            />
                        </TouchableOpacity>
                    </CandidatesCardWrapper>
                )
            })}
        </View>

    )
}

export default CandidatesRadioButton;