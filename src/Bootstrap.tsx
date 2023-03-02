import React, {useEffect, useState} from 'react';

import {storage} from './utils/storage';
import {addTracks, setupPlayer} from './utils/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const trackListLocal = [
  {
    id: 'nothing',
    url: '',
    title: 'Книга не выбрана!',
    artist: '',
    // duration: 1672,
  },
  // {
  //   id: '1',
  //   url: 'file:///storage/emulated/0/DCIM/assets/book/1-01.mp3',
  //   title: '(1-01) Стивен Кинг - Тёмная Башня 3 Бесплодн...',
  //   artist: 'Роман Волков',
  //   // duration: 1672,
  // },
  // {
  //   id: '2',
  //   url: 'file:///storage/emulated/0/DCIM/assets/book/1-02.mp3',
  //   title: '(1-02) Стивен Кинг - Тёмная Башня 3 Бесплодн...',
  //   artist: 'Роман Волков',
  //   // duration: 381,
  // },
  // {
  //   id: '3',
  //   url: 'file:///storage/emulated/0/DCIM/assets/book/Ярость (Piston)',
  //   title: 'Стивен Кинг - Бабуля',
  //   artist: 'Роман Волков',
  //   // duration: 381,
  // },
];

export default function Bootstrap({children}: Props) {
  storage.clearAll();
  // rootPath = storage.getString('@rootPath');
  const rootPath = '/storage/emulated/0/';
  storage.set('@rootPath', rootPath);

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function loadPlaylist(trackList: any) {
    await TrackPlayer.reset();
    addTracks(trackList);
  }

  async function setup() {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      loadPlaylist(trackListLocal);
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

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
