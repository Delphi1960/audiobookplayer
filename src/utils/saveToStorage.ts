import AsyncStorage from '@react-native-async-storage/async-storage';

export function saveToStorage(key: string, value: any) {
  if (typeof value === 'string') {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    };
    saveData();
  } else {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
      }
    };
    saveData();
  }
}
