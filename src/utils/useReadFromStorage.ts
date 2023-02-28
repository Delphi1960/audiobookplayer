import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

// export type ReadResult = {
//   result: string;
//   isLoading: boolean;
//   error: Error | null;
// };

export function useReadFromStorage(key: string): string {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const readData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          try {
            setResult(JSON.parse(value));
          } catch {
            setResult(value);
          }
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // return {result, isLoading, error};
  return result;
}
