import React, { Dispatch, FC, useState, SetStateAction, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Switch, Keyboard, Alert } from 'react-native';
import Input from '../../components/Input';
import MultiStep from '../../components/MultiStep';
import { CButton } from '../../components/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationProp } from '@react-navigation/native';
import * as LocalStorage from '../../utils/LocalStorage'
import { InAppPasswordTypes, WalletEnrollTypes } from '../../types';
import BiometricAuth from '../../utils/localAuth';

type RegisterScreenProps = {
    navigation: NavigationProp<any, any>;
}



const ProgressLabels = ["Identities", "Password", "Enrolling"];
const RegisterScreen = ({
    navigation
}: RegisterScreenProps) => {
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        // if (page > 0) navigation.setOptions({ headerBackVisible: false })
        console.log(page);
    })

    return (
        <View className='h-full bg-white px-4'>
            <View>
                <MultiStep
                    labels={ProgressLabels}
                    currentPosition={page}
                />
            </View>
            <View className='mt-5 w-full px-2'>
                {handleMultiStep({ page, setPage, navigation })}
            </View>
        </View >
    );
};

export default RegisterScreen;

type handleMultiStepProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    navigation: NavigationProp<any, any>;
}
function handleMultiStep(props: handleMultiStepProps) {
    switch (props.page) {
        case 0:
            return <EnrollIdentities {...props} />;
        case 1:
            return <CreatePassword {...props} />;
        default:
            return <EnrollIdentities {...props} />;
    }
}


type EnrollIdentitiesProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

function EnrollIdentities({
    page,
    setPage

}: EnrollIdentitiesProps) {

    const enrollFormData = {
        fullName: '',
        identificationNumber: '',
        registerId: ''
    }
    const [isValid, setIsValid] = useState<boolean>(false);
    const [error, setError] = useState({});
    const [form, setForm] = useState<WalletEnrollTypes>(enrollFormData)

    const validate = () => {
        if (form.fullName!.length > 0 && form.identificationNumber!.length > 0 && form.registerId!.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const handleOnInputChange = async (value: string | any, key: string | any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }
    useEffect(() => {
        validate()
    })

    const handleOnSubmit = () => {
        setPage(prev => prev + 1);

    }

    return (
        <>
            <View className='items-center mb-4'>
                <Text className='text-lg font-bold'>
                    Enroll Identity
                </Text>

                <Text className='text-center text-sm mt-2'>
                    Checking and enrolling identity
                </Text>
            </View>
            <View className=''>
                <Input
                    label='Identification Number'
                    setValue={val => handleOnInputChange(val, 'identificationNumber')}
                    value={form.identificationNumber}
                    keyType='numeric'
                />

                <Input
                    label='Fullname'
                    setValue={val => handleOnInputChange(val, 'fullName')}
                    value={form.fullName}
                />

                <Input
                    label='Register ID'
                    setValue={val => handleOnInputChange(val, 'registerId')}
                    value={form.registerId}
                    keyType='numeric'
                />
            </View>

            <View className='mt-5'>
                <CButton
                    title='Enroll Account'
                    onPress={handleOnSubmit}
                    disabled={!isValid}
                />
            </View>
        </>
    )
}





type CreatePasswordProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    navigation: NavigationProp<any, any>;
}
function CreatePassword({
    page,
    setPage,
    navigation
}: CreatePasswordProps) {
    const initialState: InAppPasswordTypes = {
        password: '',
        passwordConfirmation: ''
    }
    const biometric = new BiometricAuth();
    const [form, setForm] = useState<InAppPasswordTypes>(initialState);
    const [showTextEntry, setShowTextEntry] = useState<boolean>(true);
    const [biometricIsEnabled, setBiometricIsEnabled] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [error, setError] = useState({});

    const validate = () => {
        const passwordValid = (form.password === form.passwordConfirmation) && form.password.length >= 8;
        // const passwordValid = true;
        if (passwordValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    }

    const handleOnInputChange = async (value: string | any, key: string | any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    const handleOnBiometricOptionChange = async () => {
        const isenrolled = await biometric.isEnrolled();
        if (!isenrolled) {
            Alert.alert("Biometric not support", "Your device doesnt have biometric authentication");
        } else {
            setBiometricIsEnabled(!biometricIsEnabled)
        }
    }

    useEffect(() => {
        validate();
    });

    const nextPage = () => {
        // setPage(prev => prev + 1);
        navigation.navigate('Home');
    }
    const handleOnSubmit = async () => {
        if (biometricIsEnabled) {
            const auth = await biometric.compatibleCheck();
            if (auth.status != 200) {
                Alert.alert("Biometric not support", "Your device doesnt have biometric authentication");
                setBiometricIsEnabled(!biometricIsEnabled);
            }

            if (auth.status == 200) {
                nextPage();
            }
        } else {
            nextPage();
        }

    }

    return (
        <View className=''>

            <View className='items-center mb-4'>
                <Text className='text-lg font-bold'>
                    Create Password
                </Text>

                <Text className='text-center text-sm mt-2'>
                    This password will unlock the Apps only on this device
                </Text>
            </View>

            <View className='mt-5'>
                <Input
                    label='Password'
                    value={form.password}
                    setValue={val => handleOnInputChange(val, 'password')}
                    secureTextEntry={showTextEntry}
                    setShowTextEntry={setShowTextEntry}
                />

                <Input
                    label='Confirm Password'
                    value={form.passwordConfirmation}
                    setValue={val => handleOnInputChange(val, 'passwordConfirmation')}
                    secureTextEntry={showTextEntry}
                // setShowTextEntry={setShowTextEntry}
                />

                <View className='flex flex-row justify-between items-center mt-3'>
                    <Text className='text-md font-medium'>Sign in with Biometric?</Text>
                    <Switch
                        thumbColor={biometricIsEnabled ? '#f9f9f9' : '#25AAE1'}
                        trackColor={{ false: '#f9f9f9', true: '#25AAE1' }}
                        onValueChange={handleOnBiometricOptionChange}
                        value={biometricIsEnabled}
                    />
                </View>

            </View>

            <View className='mt-2'>
                <CButton
                    title='Set Password'
                    disabled={!isValid}
                    onPress={handleOnSubmit}
                />
            </View>

        </View>
    )
}