import React from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../player/Header';
import TrackProgress from './TrackProgress';
import PlayerButtons from './PlayerButtons';

export default function PlayerScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <TrackProgress />
      {/* <PlayList /> */}
      <PlayerButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: 'gray',
  },
});
