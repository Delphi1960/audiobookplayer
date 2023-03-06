import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import TrackPlayer, {
  Event,
  State,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

export default function PlayList() {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [first, setFirst] = useState(0);

  const loadPlaylist = async () => {
    setQueue(await TrackPlayer.getQueue());
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.state === State.nextTrack) {
      let index = await TrackPlayer.getCurrentTrack();
      setCurrentTrack(index);
    }
  });

  type PlayItem = {
    index: number;
    title: string | undefined | number;
    isCurrent: boolean;
  };
  // eslint-disable-next-line react/no-unstable-nested-components
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
  const getDuration = async () => console.log(await TrackPlayer.getDuration());
  const onPress = () => {
    setFirst(first + 1);
    getDuration();
    TrackPlayer.skipToNext();
  };
  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.url}
              isCurrent={currentTrack === index}
            />
          )}
        />
      </View>
      <Button icon="camera" mode="contained" onPress={onPress}>
        test
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
});
