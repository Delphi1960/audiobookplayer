import {useEffect, useState} from 'react';
import * as RNFS from 'react-native-fs';

export function useReadDirectory(path: string): RNFS.ReadDirItem[] {
  const [fileList, setFileList] = useState<RNFS.ReadDirItem[]>([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const getFileContent = async () => {
      try {
        const reader = await RNFS.readDir(path);
        setFileList(reader);
      } catch (e) {
        // setError(e);
      } finally {
        // setIsLoading(false);
      }
    };
    getFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // return {result, isLoading, error};
  return fileList;
}

// const getFileContent = async (path: string) => {
//   try {
//     const reader = await RNFS.readDir(path);
//     setFileList(reader);
//   } catch {}
// };
