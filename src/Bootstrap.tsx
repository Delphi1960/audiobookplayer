import React, {useEffect, useState} from 'react';

import {storage} from './utils/storage';
import {currentBookId, playList, rootDirPath} from './recoil/playList.state';
import {useSetRecoilState} from 'recoil';
import {addTracks, setupPlayer} from './utils/trackPlayerServices';
import TrackPlayer from 'react-native-track-player';
import {PlayList} from './types/playList.type';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({children}: Props) {
  // корневой каталог библиотеки
  const rootPath = storage.getString('@rootPath');
  const setLibRootDir = useSetRecoilState(rootDirPath);

  // текущий id выбранной книги
  const currentBook = storage.getString('@selectedBook');
  const setCurrentBook = useSetRecoilState(currentBookId);

  // плей лист. Список файлов выбранной книги
  const track = storage.getString('@trackLict');
  const playTrackList = JSON.parse(track!);
  const setPlayList = useSetRecoilState<PlayList>(playList);

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function loadPlaylist(trackList: any) {
    // Если загружены новые треки
    //пробую обновить треки
    await TrackPlayer.reset();
    addTracks(trackList);
    //пробую обновить треки
  }

  async function setup() {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      loadPlaylist(playTrackList);
    }
    setIsPlayerReady(isSetup);
  }

  setup();

  useEffect(() => {
    setLibRootDir(rootPath);
  }, [rootPath, setLibRootDir]);

  useEffect(() => {
    setCurrentBook(currentBook);
    setPlayList(playTrackList);
  }, [currentBook, playTrackList, setCurrentBook, setPlayList]);

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
