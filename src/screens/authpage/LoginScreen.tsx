import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Switch, Button } from 'react-native';
import BiometricAuth from '../../utils/localAuth';
import Input from '../../components/Input';
import { NavigationProp } from '@react-navigation/native';


type LoginScreenProps = {
    navigation: NavigationProp<any,any>;
}

type LoginFormTypes = {
    password: string;
    passwordConfirmation: string;
    certificate: string;
    privateKey: string;
}
const LoginScreen = ({
    navigation
}:LoginScreenProps) => {
    const initialForm: LoginFormTypes = {
        password: '',
        passwordConfirmation: '',
        certificate: '',
        privateKey: '',
    }
    const [biometricIsEnabled, setBiometricIsEnabled] = useState<boolean>(true);
    const [form, setForm] = useState<LoginFormTypes>(initialForm);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [showTextEntry, setShowTextEntry] = useState<boolean>(true);


    const biometric = new BiometricAuth();
    const handleOnBiometricOptionChange = async () => {
        const isenrolled = await biometric.isEnrolled();
        if (!isenrolled) {
            Alert.alert("Biometric not support", "Your device doesnt have biometric authentication");
        } else {
            setBiometricIsEnabled(!biometricIsEnabled)
        }
    }
    const validate = () => {
        const passwordValid = (form.password === form.passwordConfirmation) && form.password.length >= 8;
        const certValid = (form.certificate.length > 1) && form.privateKey.length > 1;

        // console.log("PASSVALID", passwordValid);
        // console.log("CERTVALID", certValid);
        if (passwordValid && certValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    }
    useEffect(()=>{validate()})
    const handleOnInputChange = (value: string | any, key: string | any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }
    const handleOnImport = () => {
        // Alert.alert("Error","Cert not valid");
        navigation.navigate('Home');
    }
    return (
        <ScrollView className='bg-white'>
            <Text className='text-lg font-medium w-full text-center mt-5'>Import existing Certificate</Text>


            <View className='px-4'>
                <Text className='opacity-80 py-2'>Certificate</Text>
                <View className='border border-gray-300 rounded-md p-1'>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={5}
                        value={form.certificate}
                        onChangeText={val => handleOnInputChange(val, 'certificate')}
                    />
                </View>
            </View>

            <View className='px-4'>
                <Text className='opacity-80 py-2'>Private Key</Text>
                <View className='border border-gray-300 rounded-md p-1'>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={5}
                        value={form.privateKey}
                        onChangeText={val => handleOnInputChange(val, 'privateKey')}
                    />
                </View>
            </View>


            <View className='px-4'>
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

                <Button
                    title='Import'
                    disabled={!isValid}
                    onPress={handleOnImport}
                />

            </View>





        </ScrollView>
    );
};

export default LoginScreen;
