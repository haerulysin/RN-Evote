import React, { FC } from 'react';
import { View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { StepIndicatorStyles } from 'react-native-step-indicator/lib/typescript/src/types';

type MultiStepProps = {
    labels: string[];
    currentPosition: number;
}

const customStyles: StepIndicatorStyles = {
    stepStrokeWidth: 1,
    currentStepStrokeWidth: 1,
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 1.5,
    labelSize: 9,
    stepStrokeFinishedColor: '#25AAE1',
    stepStrokeCurrentColor: '#25AAE1',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#25AAE1',
    stepIndicatorFinishedColor: '#25AAE1',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: '#25AAE1',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    currentStepLabelColor: '#25AAE1',
    

}


const MultiStep: React.FC<MultiStepProps> = ({
    labels,
    currentPosition
}: MultiStepProps) => {

    return (
        <StepIndicator
            labels={labels}
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={3}

        />
    )
}

export default MultiStep;