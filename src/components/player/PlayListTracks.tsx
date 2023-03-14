import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';

import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {secondToHMS} from '../../utils/secondToHMS';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storage} from '../../utils/storage';

function Divider() {
  return <View style={styles.divider} />;
}

type PlayItem = {
  index: number;
  title: string | undefined | number;
  isCurrent: boolean;
};

function PlaylistItem({index, title, isCurrent}: PlayItem) {
  function handleItemPress() {
    TrackPlayer.skip(index);
  }

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <Text
        style={{
          ...styles.playlistItem,
          ...{backgroundColor: isCurrent ? '#d3bdde' : 'transparent'},
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function PlayListTracks() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [sizeTrack, setSizeTrack] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const [title, setTitle] = useState('');

  const loadPlaylist = async () => {
    const que = await TrackPlayer.getQueue();
    setQueue(que);
    setTitle(que[0].title!);
  };
  // Когда экран в фокусе
  useFocusEffect(
    React.useCallback(() => {
      loadPlaylist();
      setSizeTrack(storage.getNumber('@bookDurations')!);
    }, []),
  );

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      let index = await TrackPlayer.getCurrentTrack();
      setCurrentTrack(index!);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.url
                .toString()
                .slice(item.url.toString().lastIndexOf('/'))}
              isCurrent={currentTrack === index}
            />
          )}
        />
      </View>

      <Divider />
      <Text>
        {sizeTrack.toFixed(4)} секунд или {secondToHMS(sizeTrack)}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  playlist: {
    marginTop: 5,
    marginBottom: 50,
    height: '90%',
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  divider: {
    alignItems: 'center',
    marginTop: -50,
    // marginLeft: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'navy',
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
});
