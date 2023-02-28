import {Text} from '@react-native-material/core';
import React, {useEffect} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Menu} from 'react-native-paper';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LibraryGetList from './LibraryGetList';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {rootDirPath} from '../../recoil/playList.state';
import {storage} from '../../utils/storage';

const SecondRoute = () => (
  <View>
    <Text>111111111111111111</Text>
  </View>
);

function Divider() {
  return <View style={styles.divider} />;
}

const FirstRoute = () => <LibraryGetList />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Library({navigation}: any) {
  // корневой каталог библиотеки
  const rootPath = storage.getString('@rootPath');
  const setLibRootDir = useSetRecoilState(rootDirPath);
  const libRootDir = useRecoilValue(rootDirPath);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Все книги'},
    {key: 'second', title: 'Новые'},
  ]);

  useEffect(() => {
    setLibRootDir(rootPath);
  }, [rootPath, setLibRootDir]);

  // TabBar - стилизация
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.barstyle}
      labelStyle={styles.labelStyle}
      inactiveColor="gray"
      scrollEnabled={true}
    />
  );
  console.log(libRootDir);
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.txt}>
            <Menu.Item
              leadingIcon="folder"
              onPress={() => navigation.navigate('Корневая папка')}
              title="Корневая папка"
            />
          </Text>
        </View>
        <View style={styles.text}>
          <Text variant="subtitle2" color="blue">
            {libRootDir}
          </Text>
        </View>
      </View>
      <Divider />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: -10,
  },
  txt: {
    fontSize: 18,
    color: 'blue',
  },
  divider: {
    alignItems: 'center',
    marginTop: 15,
    // marginLeft: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'navy',
  },
  indicatorStyle: {backgroundColor: 'navy'},
  labelStyle: {color: 'navy', fontWeight: 'bold'},
  barstyle: {backgroundColor: 'white'},
});
