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

  // // Путь к библиотеке
  // const setRootDirPath = useSetRecoilState(rootDirPath);
  // // TrackList список файлов для воспроизведения
  // const setBookTrackList = useSetRecoilState(bookTrackPlayList);
  // //id выбранной книги/рассказа
  // const setSelectedBookId = useSetRecoilState(selectedBookId);

  //==========================================================================================
  // Путь к библиотеке
  let rootPath = storage.getString('@rootPath');
  if (rootPath === undefined) {
    rootPath = '/storage/emulated/0/';
    storage.set('@rootPath', rootPath);
  }
  // setRootDirPath(rootPath);

  //==========================================================================================
  // TrackList список файлов для воспроизведения
  let trackListStr: string | undefined = storage.getString('@trackList');
  let trackList: PlayList[];
  if (trackListStr === undefined) {
    trackList = [
      {
        id: 'nothing',
        url: '',
        title: 'Книга не выбрана!',
        artist: '',
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
      },
    ];
  }
  storage.set('@trackList', JSON.stringify(trackList));
  // setBookTrackList(trackList);
  // console.log({rootPath, trackListStr, trackList});

  //==========================================================================================
  //id выбранной книги/рассказа
  // let selectedBook = storage.getString('@selectedBook');
  // setSelectedBookId(selectedBook);
  //==========================================================================================
  async function loadPlaylist(tracks: PlayList[]) {
    await TrackPlayer.reset();
    addTracks(tracks);
  }

  async function setup() {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();
    if (isSetup && queue.length <= 0) {
      loadPlaylist(trackList);

      // Восстановим номер трека и позицию
      const currentTrack = storage.getNumber('@currentTrack');
      if (currentTrack === undefined) {
        TrackPlayer.skip(0);
      } else {
        TrackPlayer.skip(currentTrack);
      }
      const currentTrackPos = storage.getNumber('@currentTrackPos');
      if (currentTrackPos === undefined) {
        TrackPlayer.seekTo(0!);
      } else {
        TrackPlayer.seekTo(currentTrackPos!);
      }
    }
    setIsPlayerReady(isSetup);
  }

  const totalListened = storage.getNumber('@totalListened');
  if (totalListened === undefined) {
    storage.set('@totalListened', 0);
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
