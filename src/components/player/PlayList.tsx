import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';

// type Props = {};

export default function PlayList() {
  const [queue, setQueue] = useState<any>([]); //очередь
  const [currentTrack, setCurrentTrack] = useState(0);

  // console.log(trackList);

  async function loadPlaylist() {
    setQueue(await TrackPlayer.getQueue());
  }

  useEffect(() => {
    loadPlaylist();
  }, [queue]);

  const events = [Event.PlaybackState, Event.PlaybackError];
  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state === State.nextTrack) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
    }
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  function PlaylistItem({index, title, isCurrent}: any) {
    //
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

  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack === index}
            />
          )}
        />
      </View>
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
