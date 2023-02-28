import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

// type Props = {}

export default function TrackProgress() {
  const {position, duration} = useProgress(0);
  const [sound, setSound] = useState(1);

  // function convertTime(sec) {
  //   var hours = Math.floor(sec / 3600);
  //   hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
  //   var min = Math.floor(sec / 60);
  //   min >= 1 ? (sec = sec - min * 60) : (min = '00');
  //   sec < 1 ? (sec = '00') : void 0;

  //   min.toString().length == 1 ? (min = '0' + min) : void 0;
  //   sec.toString().length == 1 ? (sec = '0' + sec) : void 0;

  //   return hours + ':' + min + ':' + sec;
  // }

  function format(seconds: number) {
    let min = String(seconds / 60);
    let mins = parseInt(min, 10).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  TrackPlayer.setVolume(sound);
  return (
    <View style={styles.mainSpace}>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
        {/* {convertTime(position)} / {convertTime(duration)} */}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="green"
        maximumTrackTintColor="red"
        thumbTintColor="green"
        value={position}
      />
      <View style={styles.soundView}>
        <Icon.Button
          name="volume-off"
          // size={28}
          color={'blue'}
          backgroundColor="transparent"
          // onPress={() => TrackPlayer.skipToPrevious()}
        />
        <Slider
          style={styles.slider1}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="red"
          thumbTintColor="blue"
          value={1}
          onValueChange={value => setSound(value)}
        />
        <Icon.Button
          name="volume-up"
          // size={28}
          color={'blue'}
          backgroundColor="transparent"
          // onPress={() => TrackPlayer.skipToPrevious()}
        />
      </View>
      <View style={styles.txtView}>
        <Text style={styles.txtSound}>{(sound * 100).toFixed(0)}%</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainSpace: {flex: 1},
  trackProgress: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  soundView: {flexDirection: 'row', justifyContent: 'space-around'},
  slider: {width: 'auto', height: 40},
  slider1: {width: '90%', height: 40},
  txtView: {flexDirection: 'row', justifyContent: 'center'},
  txtSound: {marginTop: -10, fontSize: 14, color: 'black'},
});
