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
  const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);

  for (let i = 0; i < readedFilesAndDir.length; i++) {
    if (readedFilesAndDir[i].isDirectory()) {
      const directoryPath = pathOfDirToScan + '/' + readedFilesAndDir[i].name;
      // console.log(pathOfDirToScan, readedFilesAndDir[i].name);
      data.directory.push(directoryPath);
      data = await scanDir(directoryPath, data);
    } else {
      data.files.push(pathOfDirToScan + '/' + readedFilesAndDir[i].name);
      // console.log(pathOfDirToScan, readedFilesAndDir[i].name);
    }
  }

  return data;
}

[
  '/storage/emulated/0/DCIM/assets/Мясорубка.mp3',
  '/storage/emulated/0/DCIM/assets/Бабуля.mp3',
  '/storage/emulated/0/DCIM/assets/Четвертак, приносящий удачу/03.mp3',
  '/storage/emulated/0/DCIM/assets/Четвертак, приносящий удачу/02.mp3',
  '/storage/emulated/0/DCIM/assets/Четвертак, приносящий удачу/01.mp3',
  '/storage/emulated/0/DCIM/assets/Ярость (Piston)/04.mp3',
  '/storage/emulated/0/DCIM/assets/Ярость (Piston)/03.mp3',
  '/storage/emulated/0/DCIM/assets/Ярость (Piston)/02.mp3',
  '/storage/emulated/0/DCIM/assets/Ярость (Piston)/01.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/1 Стрелок/01 Глава 1.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/1 Стрелок/02 Глава 2.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/1 Стрелок/03 Глава 3.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/2 Extraction of three/02.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/2 Extraction of three/03-1.mp3',
  '/storage/emulated/0/DCIM/assets/Темная башня/2 Extraction of three/03-2.mp3',
];
