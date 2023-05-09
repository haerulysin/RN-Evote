import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  supportedAuthenticationTypesAsync,
  getEnrolledLevelAsync,
} from "expo-local-authentication";

type biometricReturn = {
  status: number | string;
  message?: string | unknown;
};
export default class BiometricAuth {
  constructor() {}

  async compatibleCheck(): Promise<any> {
    let result: biometricReturn = {
      status: 200,
    };
    try {
      const isCompatible = await this.isCompatible();
      const isEnrolled = await this._isEnrolled();
      const auth = await this.authenticate();
      result = { status: auth };
      return result;
    } catch (e) {
      return (result = {
        status: 400,
        message: e,
      });
    }
  }

  async isCompatible(): Promise<boolean> {
    const result = await hasHardwareAsync();
    if (!result) {
      throw "Not Supported";
    }
    return result;
  }

  async isEnrolled():Promise<boolean>{
    return await isEnrolledAsync();
  }

  async _isEnrolled(): Promise<boolean> {
    const result = await isEnrolledAsync();
    if (!result) {
      throw "Your device doesnt have biometric authentication";
    }

    return result;
  }

  async authenticate(): Promise<string | number> {
    const auth = await authenticateAsync();
    if (!auth.success) throw auth.error;
    return 200;
  }

  async getSupportedAuthType(): Promise<any> {
    return await getEnrolledLevelAsync();
  }
}
