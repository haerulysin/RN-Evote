import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Switch, Button } from 'react-native';
import BiometricAuth from '../../utils/localAuth';
import Input from '../../components/Input';
import { NavigationProp } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as LocalStorage from '../../utils/LocalStorage';
import { Login } from '../../utils/RESTApi';
import { AuthContext } from '../../context/AuthContext';

type LoginScreenProps = {
    navigation: NavigationProp<any, any>;
}

type LoginFormTypes = {
    password: string;
    passwordConfirmation: string;
    certificate: string;
    privateKey: string;
}
const LoginScreen = ({
    navigation
}: LoginScreenProps) => {
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
        const passwordValid = (form.password === form.passwordConfirmation) && form.password.length >= 1;
        const certValid = (form.certificate.length > 1) && form.privateKey.length > 1;

        if (passwordValid && certValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    }
    useEffect(() => { validate() })
    const handleOnInputChange = (value: string | any, key: string | any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }
    const authContext = React.useContext(AuthContext) as any;

    const handleOnImport = async () => {
        // navigation.navigate('Home');
        const certString = JSON.stringify({ certificate: form.certificate, privateKey: form.privateKey });
        try {
            await LocalStorage.store("cert", certString);
            await SecureStore.setItemAsync("cert", certString);
            const passwordHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, form.password);
            await LocalStorage.store("inAppPassword", passwordHash);
            await SecureStore.setItemAsync("inAppPassword", passwordHash);
            const loginRequest = await Login(await SecureStore.getItemAsync("cert") as string) as any;
            if (loginRequest.status === 200) {
                const { uid } = loginRequest.data;
                authContext.signIn(uid);
            } else {
                Alert.alert("Error", loginRequest.data.message);
            }
        } catch (e) {
            Alert.alert("ERROR", e as any);
        }

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

                {/* <View className='flex flex-row justify-between items-center mt-3'>
                    <Text className='text-md font-medium'>Sign in with Biometric?</Text>
                    <Switch
                        thumbColor={biometricIsEnabled ? '#f9f9f9' : '#25AAE1'}
                        trackColor={{ false: '#f9f9f9', true: '#25AAE1' }}
                        onValueChange={handleOnBiometricOptionChange}
                        value={biometricIsEnabled}
                    />
                </View> */}

                <View className='mt-4 mb-4'>
                    <Button
                        title='Import'
                        disabled={!isValid}
                        onPress={handleOnImport}
                    />
                </View>

            </View>





        </ScrollView>
    );
};

export default LoginScreen;
