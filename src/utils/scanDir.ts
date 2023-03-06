import * as RNFS from 'react-native-fs';

// export async function scanDir(pathDir: string) {
//   const filePath: string[] = [];

//   function Scan(path: string) {
//     const getFileContent = async () => {
//       try {
//         const result = await RNFS.readDir(path);
//         for (let i = 0; result.length; i++) {
//           if (result[i].isDirectory()) {
//             Scan(result[i].path);
//           } else {
//             filePath.push(result[i].path);
//           }
//         }
//       } catch {}
//     };
//     getFileContent();
//     console.log(filePath);
//   }

//   Scan(pathDir);
// }

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
        // console.log(pathOfDirToScan, readedFilesAndDir[i].name);
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
  // console.log(data.files);
  return data;
}
