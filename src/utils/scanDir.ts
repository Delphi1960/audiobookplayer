import * as RNFS from 'react-native-fs';

type Data = {
  directory: string[];
  files: string[];
};

export async function scanDir(
  pathOfDirToScan: string,
  data: Data = {directory: [], files: []},
) {
  try {
    const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);

    for (let i = 0; i < readedFilesAndDir.length; i++) {
      if (readedFilesAndDir[i].isDirectory()) {
        const directoryPath = pathOfDirToScan + '/' + readedFilesAndDir[i].name;
        data.directory.push(directoryPath);
        data = await scanDir(directoryPath, data);
      } else {
        if (readedFilesAndDir[i].name.indexOf('.mp3') > 0) {
          data.files.push(pathOfDirToScan + '/' + readedFilesAndDir[i].name);
        }
      }
    }
  } catch (error) {
    console.warn;
  }
  return data;
}
