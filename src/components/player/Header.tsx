import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Track} from 'react-native-track-player';

type Props = {headerInfo: Track};
export default function Header({headerInfo}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>{headerInfo.title}</Text>
      <Text style={styles.artistName}>{headerInfo.artist}</Text>
      <Text style={styles.artistName}>{headerInfo.file}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 16,
    color: 'black',
  },
});
