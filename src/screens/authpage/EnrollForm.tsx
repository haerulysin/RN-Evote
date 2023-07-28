import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APIResponseType, EnrollFormTypes } from "../../types";
import { CButton } from "../../components/Button";
import { useForm, Controller } from 'react-hook-form'
import { TextInput, View, Text, Alert } from "react-native";
import Input from "../../components/Input";
import { enrollIdentities } from "../../utils/RESTApi";
import * as LocalStorage from '../../utils/LocalStorage';
import { AuthContext } from "../../context/AuthContext";
import * as SecureStore from 'expo-secure-store';

type EnrollFormProp = {
    setPage: Dispatch<SetStateAction<number>>;
}
export const EnrollForm = ({
    setPage
}: EnrollFormProp) => {
    const [submitButtonState, setSubmitButtonState] = useState<boolean>(true);
    const { register, handleSubmit, control, reset, setValue, formState: { errors, isValid } } = useForm<EnrollFormTypes>({
        defaultValues: {
            voterID: '',
            voterRegisterID: '',
            voterName: '',
        },
        mode: 'onChange'
    });
    const authContext = React.useContext(AuthContext) as any;
    const onSubmit = async (data: EnrollFormTypes) => {
        const enroll: APIResponseType = await enrollIdentities(JSON.stringify(data));
        const apiData: any = enroll.data;
        if (enroll.status !== 200) {
            Alert.alert("Enroll Failed", JSON.stringify(enroll.data));
        } else {
            await LocalStorage.store("cert", JSON.stringify(apiData));
            await SecureStore.setItemAsync("cert", JSON.stringify(apiData))
            setPage(prev => prev + 1);
        }
    };

    const onSetValue = () => {
        setValue("voterID","8575159495",{shouldValidate:true});
        setValue("voterName","Magdalena",{shouldValidate:true});
        setValue("voterRegisterID","5291768107",{shouldValidate:true});
    }
    return (
        <View>
            <View className='items-center mb-4'>
                <Text className='text-lg font-bold'>
                    Enroll Identity
                </Text>

                <Text className='text-center text-sm mt-2'>
                    Checking and enrolling identity
                </Text>
            </View>

            <Controller
                control={control}
                name="voterID"
                rules={{
                    required: "ID required"
                }}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="ID"
                        value={value}
                        setValue={value => onChange(value)}
                        keyType="numeric"
                        errors={errors.voterID?.message}
                    />
                )}
            />

            <Controller
                name="voterName"
                rules={{ required: "Fullname required" }}
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="Full Name"
                        value={value}
                        setValue={value => onChange(value)}
                        errors={errors.voterName?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="voterRegisterID"
                rules={{ required: "Register ID required" }}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="Register ID"
                        value={value}
                        setValue={value => onChange(value)}
                        keyType="numeric"
                        errors={errors.voterRegisterID?.message}
                    />
                )}
            />
            <View className="mt-5">

                <CButton
                    title="Fill"
                    onPress={onSetValue}
                />
                <CButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                />
            </View>
        </View>
    );
}