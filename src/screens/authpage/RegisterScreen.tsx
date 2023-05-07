import React, { Dispatch, FC, useState, SetStateAction, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Switch } from 'react-native';
import Input from '../../components/Input';
import MultiStep from '../../components/MultiStep';
import { CButton } from '../../components/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationProp } from '@react-navigation/native';


type RegisterScreenProps = {
    navigation: NavigationProp<any, any>;
}

const ProgressLabels = ["Password", "Identities", "Enrolling"];
const RegisterScreen = ({
    navigation
}: RegisterScreenProps) => {
    const [page, setPage] = useState(0);
    const [formValid, setFormValid] = useState<boolean>(false);
    useEffect(() => {
        // if (page > 0) navigation.setOptions({ headerBackVisible: false });
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
                {handleMultiStep(page)}

                {page < 10 ?
                    < View className='mt-5'>
                        <CButton
                            title="Next"
                            onPress={() => {
                                setPage(page + 1);
                                setFormValid(false);
                            }}
                        />
                    </View> : null
                }
            </View>
        </View >
    );
};

export default RegisterScreen;


function handleMultiStep(page: number) {
    switch (page) {
        case 0:
            return <EnrollIdentities

            />;
        case 1:
            return <CreatePassword

            />;

        case 3:
            return <EnrolledScreen />;
        default:
            return <CreatePassword />;
    }
}

type CreatePasswordProps = {

}

function CreatePassword({

}: CreatePasswordProps) {
    const [password, setPassword] = useState<string | null>(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState<string | null>(null);
    const [showTextEntry, setShowTextEntry] = useState<Boolean>(true);
    const [biometricIsEnabled, setBiometricIsEnabled] = useState<boolean>(false);


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
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={showTextEntry}
                    setShowTextEntry={setShowTextEntry}
                />

                <Input
                    label='Confirm Password'
                    value={passwordConfirmation}
                    setValue={setPasswordConfirmation}
                    secureTextEntry={showTextEntry}
                    setShowTextEntry={setShowTextEntry}
                    passwordShowBtnVisible={false}
                />

                <View className='flex flex-row justify-between items-center mt-3'>
                    <Text className='text-md font-medium'>Sign in with Biometric?</Text>
                    <Switch
                        thumbColor={biometricIsEnabled ? '#f9f9f9' : '#25AAE1'}
                        trackColor={{ false: '#f9f9f9', true: '#25AAE1' }}
                        onValueChange={() => setBiometricIsEnabled(!biometricIsEnabled)}
                        value={biometricIsEnabled}
                    />
                </View>

            </View>

        </View>
    )
}

type EnrollIdentitiesProps = {

}

function EnrollIdentities({

}: EnrollIdentitiesProps) {
    const [identificationNumber, setIdentificationNumber] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [registerID, setRegisterID] = useState<string | null>(null);
    return (
        <View className=''>

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
                    value={identificationNumber}
                    setValue={setIdentificationNumber}
                    keyType='numeric'
                />

                <Input
                    label='Fullname'
                    value={fullName}
                    setValue={setFullName}
                />

                <Input
                    label='Register ID'
                    value={registerID}
                    setValue={setRegisterID}
                    keyType='numeric'
                />
            </View>

        </View>
    )
}



function EnrolledScreen() {
    return (
        <View>
            <Text>Enrolled</Text>
        </View>
    )
}