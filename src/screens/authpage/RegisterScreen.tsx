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
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        const verifyIsLoggedIn = async () => {
            const login = await Login(await LocalStorage.get("cert"));
            if (login.status === 200) {
                await LocalStorage.store("uid", (login.data as any).uid)
                navigation.navigate('Home');
            }
        }
        verifyIsLoggedIn();
    }, [])

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
        case 1:
            return <EnrollForm {...props} />
            break;
        case 2:
            return <InAppPasswordForm {...props} />
        default:
            return <EnrollForm {...props} />;
            break;
    }
}

export default RegisterScreen;