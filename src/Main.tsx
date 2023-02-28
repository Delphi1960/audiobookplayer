import React from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {RecoilRoot} from 'recoil';

import LibraryNavigate from './components/navigate/LibraryNavigate';
import PlayerScreen from './components/player/PlayerScreen';
import PlayList from './components/player/PlayList';

const Tab = createMaterialBottomTabNavigator();

const PlayerScreenRoute = () => <PlayerScreen />;
const LibraryRoute = () => <LibraryNavigate />;
const PlayListRoute = () => <PlayList />;

export default function Main() {
  async function RequestGetLocation() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Доступ к файлам',
          message: 'AudioPlayer запрашивает доступ к файлам',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   Alert.alert('Доступ разрешен!');
      // } else {
      //   setStart(false);
      // }
    } catch (err) {
      console.warn(err);
    }
  }

  RequestGetLocation();

  return (
    <SafeAreaView style={styles.container}>
      <RecoilRoot>
        <Tab.Navigator
          initialRouteName="PlayerScreenRoute"
          activeColor="blue"
          inactiveColor="gray"
          barStyle={styles.buttonPanel}>
          <Tab.Screen
            name="PlayerScreenRoute"
            component={PlayerScreenRoute}
            options={{
              tabBarLabel: 'Player',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="disc-player"
                  color={color}
                  size={26}
                />
              ),
            }}
          />

          <Tab.Screen
            name="LibraryRoute"
            component={LibraryRoute}
            options={{
              tabBarLabel: 'Library',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="music-box-multiple-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="PlayListRoute"
            component={PlayListRoute}
            options={{
              tabBarLabel: 'PlayList',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="file-tree-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </RecoilRoot>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
    backgroundColor: 'blue',
  },
  buttonPanel: {backgroundColor: 'white'},
});
