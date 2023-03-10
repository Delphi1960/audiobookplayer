import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import * as RNFS from 'react-native-fs';
import {Button, Menu} from 'react-native-paper';
import {storage} from '../utils/storage';
import {useSetRecoilState} from 'recoil';
import {rootDirPath} from '../recoil/playList.state';

// type Props = {}
function Divider() {
  return <View style={styles.divider} />;
}

export default function GetRootDirLib({navigation}: any) {
  const [dirPath, setDirPath] = useState(RNFS.ExternalStorageDirectoryPath);
  const [fileList, setFileList] = useState<RNFS.ReadDirItem[]>([]);
  const setLibRootDir = useSetRecoilState(rootDirPath);

  const getFileContent = async (path: string) => {
    try {
      const reader = await RNFS.readDir(path);
      setFileList(reader);
    } catch {}
  };

  useEffect(() => {
    getFileContent(dirPath);
  }, [dirPath]);

  const fileListSort = fileList.map(function (val) {
    return {
      name: val.name,
      dir: val.isDirectory() ? 'd' : 'f',
      path: val.path,
    };
  });

  fileListSort.sort((a, b) => {
    if (a.dir === b.dir) {
      return a.name > b.name ? 1 : -1;
    }
    return a.dir > b.dir ? 1 : -1;
  });

  function handlePress(ind: number) {
    setDirPath(fileListSort[ind].path);
    getFileContent(dirPath);
  }

  function handlePressBack() {
    setDirPath(dirPath.slice(0, dirPath.lastIndexOf('/')));
  }

  const onOkPress = () => {
    storage.set('@rootPath', dirPath);
    storage.set('@selectedBook', '');
    setLibRootDir(dirPath);
    navigation.navigate('Библиотека');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.btn}>
          <View>
            <Button
              // buttonColor="gray"
              compact
              // icon="backburger"
              icon="clipboard-arrow-left"
              mode="text"
              onPress={() => {
                handlePressBack();
              }}>
              <Text style={styles.txtBtn}>Назад</Text>
            </Button>
          </View>
          <View style={styles.text}>
            <Text variant="subtitle1">{dirPath}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.scroll}>
          <ScrollView>
            {fileListSort.map((val, ind) => (
              <Menu.Item
                key={ind}
                leadingIcon={val.dir === 'd' ? 'folder' : 'file'}
                onPress={() => {
                  handlePress(ind);
                }}
                title={val.name}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.okBtn}>
        <Button icon="folder" mode="contained" onPress={onOkPress}>
          Ok
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  btn: {
    flexDirection: 'row',
  },
  txtBtn: {
    fontSize: 18,
    color: 'blue',
  },
  list: {
    fontSize: 18,
  },
  divider: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    height: 1,
    width: '90%',
    backgroundColor: 'black',
  },
  text: {
    justifyContent: 'center',
  },
  scroll: {height: '92%'},
  okBtn: {
    fflexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    height: '8%',
  },
});
