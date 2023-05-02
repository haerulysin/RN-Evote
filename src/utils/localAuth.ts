import {
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync
} from 'expo-local-authentication';



const biometricsAuth = async() => {
    const compatible = hasHardwareAsync();
    if(!compatible) throw 'This device is not compatible for biometric authentication';

    const enrolled = await isEnrolledAsync();
    if(!enrolled) throw `Not Enrolled`;

    const result = await authenticateAsync();
    if(!result.success) throw `Failed`;

    return
}

export default biometricsAuth;