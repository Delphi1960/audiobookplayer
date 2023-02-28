import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

export default function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state === State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 20,
    color: 'black',
  },
  artistName: {
    fontSize: 16,
    color: 'black',
  },
});
