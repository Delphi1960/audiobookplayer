import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../player/Header';
import TrackProgress from './TrackProgress';
import PlayerButtons from './PlayerButtons';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {storage} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';

export default function PlayerScreen() {
  const [info, setInfo] = useState<Track>({url: ''});
  // const {position, duration} = useProgress(0);

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const inf = await TrackPlayer.getTrack(track!);
    setInfo(inf!);
    // Сохраним номер трека
    storage.set('@currentTrack', track!);
  }
  if (info.title === null) {
    info.title = 'Не выбрана книга!';
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      setTrackInfo();
    }
  });

  // Когда экран в фокусе
  useFocusEffect(
    React.useCallback(() => {
      setTrackInfo();
    }, []),
  );

  useEffect(() => {}, []);
  // console.log(position);
  return (
    <View style={styles.container}>
      <Header headerInfo={info} />
      <TrackProgress
        headerInfo={info}
        totalDurations={storage.getNumber('@bookDurations')!}
        // totalListened={storage.getNumber('@totalListened')!}
        trackCount={storage.getNumber('@trackCount')!}
      />
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
