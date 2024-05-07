import AsyncStorage from "@react-native-async-storage/async-storage/";

type storeReturn = {
  status: number;
  message?: string | unknown;
};

export async function store(
  key: string | any,
  value: string | any
): Promise<any> {
  try {
    await AsyncStorage.setItem(key, value);
    let result = { status: 200 };
    return result;
  } catch (e) {
    const result = { status: 400, message: e };
    return result;
  }
}

export async function get(key: string | any):Promise<any> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
  }
}

export async function remove(key:string):Promise<any>{
  try{
    const remove = await AsyncStorage.removeItem("uid");
  }catch(e){console.log(e)}
}