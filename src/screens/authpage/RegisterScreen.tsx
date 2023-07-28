import React, { Dispatch, FC, useState, SetStateAction, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Switch, Keyboard, Alert, ActivityIndicator } from 'react-native';
import MultiStep from '../../components/MultiStep';
import { NavigationProp } from '@react-navigation/native';
import { EnrollForm } from './EnrollForm';
import InAppPasswordForm from './InAppPasswordForm';
import LandingScreen from '../LandingScreen';
import { Login } from '../../utils/RESTApi';
import * as LocalStorage from '../../utils/LocalStorage';

type RegisterScreenProps = {
    navigation: NavigationProp<any, any>;
}

const ProgressLabels = ["Identities", "Password", "Enrolling"];
const RegisterScreen = ({
    navigation
}: RegisterScreenProps) => {
    const [page, setPage] = useState<number>(0);
    return (
        <View className='h-full bg-white px-4'>
            <View>
                <MultiStep
                    labels={ProgressLabels}
                    currentPosition={page}
                />
            </View>
            <View className='mt-5 w-full px-2'>
                {MultiStepPageSwitch({ setPage, page, navigation })}
            </View>
        </View >
    );
};

type MultiStepPageSwitchProps = {
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    navigation: NavigationProp<any, any>;
}
const MultiStepPageSwitch = (props: MultiStepPageSwitchProps) => {

    switch (props.page) {
        case 0:
            return <EnrollForm {...props} />
            break;
        case 1:
            return <InAppPasswordForm {...props} />
        default:
            return <EnrollForm {...props} />;
            break;
    }
}

export default RegisterScreen;