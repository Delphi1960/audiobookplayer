import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

// type Props = {}

export default function TrackProgress() {
  const {position, duration} = useProgress(0);
  const [sound, setSound] = useState(1);

  function secondFormat(seconds: number) {
    let sHours: string = '0';
    let fullHours = '0';
    let nMinutes = 0;
    let sMinutes = '0';
    let fullMinutes = '0';
    let nSeconds = 0;
    let sSeconds = '0';
    let result = '';

    sHours = String(seconds / 3600);
    if (sHours.indexOf('.') > 0) {
      fullHours = sHours.slice(0, sHours.indexOf('.'));
      nMinutes = Number('0.' + sHours.slice(sHours.indexOf('.') + 1)) * 60;
      // целое число часов
    } else if (Number(sHours) > 0) {
      fullHours = sHours;
      nMinutes = 0;
    } else {
      fullHours = '0';
      nMinutes = Number(sHours) * 60;
    }

    sMinutes = String(nMinutes);
    if (sMinutes.indexOf('.') > 0) {
      fullMinutes = sMinutes.slice(0, sMinutes.indexOf('.'));
      nSeconds = Number('0.' + sMinutes.slice(sMinutes.indexOf('.') + 1)) * 60;
      // целое число минут
    } else if (Number(sMinutes) > 0) {
      fullMinutes = sMinutes;
      nMinutes = 0;
    } else {
      fullMinutes = '0';
      nSeconds = Number(sMinutes) * 60;
    }
    sSeconds = nSeconds.toFixed(0);
    fullHours.length === 1 ? (fullHours = '0' + fullHours) : fullHours;
    fullMinutes.length === 1 ? (fullMinutes = '0' + fullMinutes) : fullMinutes;
    sSeconds.length === 1 ? (sSeconds = '0' + sSeconds) : sSeconds;
    result = fullHours + ':' + fullMinutes + ':' + sSeconds;
    // console.log(result);
    return result;
  }

  TrackPlayer.setVolume(sound);
  return (
    <View style={styles.mainSpace}>
      <Text style={styles.trackProgress}>
        {secondFormat(position)} / {secondFormat(duration)}
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
