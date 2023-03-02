import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  Track,
} from 'react-native-track-player';

export default function Header() {
  const [info, setInfo] = useState<Track>({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state === State.nextTrack) {
      setTrackInfo();
    }
    setTrackInfo();
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track!);
    setInfo(info);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
      <Text style={styles.artistName}>{info.url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
  },
  artistName: {
    fontSize: 16,
    color: 'black',
  },
});
