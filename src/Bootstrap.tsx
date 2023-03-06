import React, {useState} from 'react';

import {storage} from './utils/storage';
import {addTracks, setupPlayer} from './utils/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {PlayList} from './types/playList.type';

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({children}: Props) {
  // storage.clearAll();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  let rootPath = storage.getString('@rootPath');
  if (rootPath === undefined) {
    rootPath = '/storage/emulated/0/';
    storage.set('@rootPath', rootPath);
  }

  let trackListStr: string | undefined = storage.getString('@trackList');
  let trackList: PlayList[];
  if (trackListStr === undefined) {
    trackList = [
      {
        id: 'nothing',
        url: '',
        title: 'Книга не выбрана!',
        artist: '',
        duration: 0,
      },
    ];
  } else {
    trackList = JSON.parse(trackListStr);
  }
  if (trackList.length === 0) {
    trackList = [
      {
        id: 'nothing',
        url: '',
        title: 'Книга не выбрана!',
        artist: '',
        duration: 0,
      },
    ];
  }
  storage.set('@trackList', JSON.stringify(trackList));
  // console.log({rootPath, trackListStr, trackList});

  //==========================================================================================
  async function loadPlaylist(tracks: any) {
    await TrackPlayer.reset();
    addTracks(tracks);
  }

  async function setup() {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      loadPlaylist(trackList);
    }
    setIsPlayerReady(isSetup);
  }

  // useEffect(() => {
  //   //
  // }, []);

  setup();

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </SafeAreaView>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
