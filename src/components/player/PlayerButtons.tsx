import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storage} from '../../utils/storage';

type Props = {};

export default function PlayerButtons({}: Props) {
  const {position, duration} = useProgress(0);
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) === State.Playing) {
      TrackPlayer.pause();
      //Сохраним текущую позицию в треке
      storage.set('@currentTrackPos', position);
      console.log(position);
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View style={styles.buttonBox}>
      <View style={styles.mainBox}>
        <Icon.Button
          name="fast-backward"
          size={40}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(0);
          }}
        />
        <Icon.Button
          name={playerState === State.Playing ? 'pause' : 'play'}
          size={40}
          color={'navy'}
          backgroundColor="transparent"
          onPress={handlePlayPress}
        />
        <Icon.Button
          name="fast-forward"
          size={40}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(duration);
          }}
        />
      </View>
      {/* ////////////////// */}
      <View style={styles.mainBox}>
        <Icon.Button
          name="step-backward"
          size={28}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(position - 300);
          }}
        />

        <Icon.Button
          name="backward"
          size={28}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(position - 60);
          }}
        />
        {/* ================ */}
        <Icon.Button
          name="arrows-h"
          size={28}
          color={'black'}
          backgroundColor="transparent"
        />
        {/* ================= */}
        <Icon.Button
          name="forward"
          size={28}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(position + 60);
          }}
        />
        <Icon.Button
          name="step-forward"
          size={28}
          color={'navy'}
          backgroundColor="transparent"
          onPress={() => {
            TrackPlayer.seekTo(position + 300);
          }}
        />
      </View>
      <View style={styles.mainBox}>
        <Text style={styles.textBt0}>5 мин</Text>
        <Text style={styles.textBt}>1 мин</Text>
        <Text style={styles.textBt}> </Text>
        <Text style={styles.textBt}>1 мин</Text>
        <Text style={styles.textBt}>5 мин</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainBox: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'},

  textBt0: {color: 'navy', marginLeft: 0},
  textBt: {color: 'navy', marginLeft: 20},
});
