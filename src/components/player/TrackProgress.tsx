import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {secondToHMS} from '../../utils/secondToHMS';
import {storage} from '../../utils/storage';

type Props = {
  headerInfo: Track;
  totalDurations: number;
  // totalListened: number;
  trackCount: number;
};

export default function TrackProgress({
  headerInfo, //заголовок, информация
  totalDurations, //общая продолжительность книги в сек
  // totalListened, //всего прочитано в сек
  trackCount, //кол-во треков (файлов) в книге
}: Props) {
  const {position, duration} = useProgress(0);
  const [sound, setSound] = useState(1);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [total, setTotal] = useState(storage.getNumber('@totalListened')!);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      let index = await TrackPlayer.getCurrentTrack();
      if (total < totalDurations) {
        setCurrentTrack(index!);
        setTotal(total + position);
        storage.set('@totalListened', total);
        console.log({index, trackCount, total, position});
      }
      // totalListened = total;
    }
  });

  useEffect(() => {
    setTotal(storage.getNumber('@totalListened')!);
    console.log(total);
  }, []);

  TrackPlayer.setVolume(sound);
  return (
    <View style={styles.mainSpace}>
      <Text style={styles.textTrackProgress}>
        Прослушано {secondToHMS(total + position)} из{' '}
        {secondToHMS(totalDurations)}
      </Text>

      {/* <ProgressBar
        progress={(totaListened + position) / totalDurations}
        color="blue"
        style={styles.progressBarAll}
      /> */}

      <Slider
        style={styles.sliderTrack}
        minimumValue={0}
        maximumValue={totalDurations}
        minimumTrackTintColor="green"
        maximumTrackTintColor="black"
        thumbTintColor="green"
        value={total + position}
        // onValueChange={value => TrackPlayer.seekTo(value)}
      />

      <Text style={styles.trackProgressCurrent}>
        Осталось {secondToHMS(totalDurations - (total + position))}
      </Text>

      {/* Второй */}
      <Text style={styles.textTrackProgress}>
        {headerInfo.file} ({currentTrack + 1}
        {'/'}
        {trackCount})
      </Text>
      <Slider
        style={styles.sliderTrack}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="green"
        maximumTrackTintColor="black"
        thumbTintColor="green"
        value={position}
        onValueChange={value => TrackPlayer.seekTo(value)}
      />
      <Text style={styles.trackProgressCurrent}>
        {secondToHMS(position)} / {secondToHMS(duration)}
      </Text>

      {/* ЗВУК */}
      <View style={styles.soundView}>
        <Icon.Button
          name="volume-off"
          // size={28}
          color={'blue'}
          backgroundColor="transparent"
        />
        <Slider
          style={styles.sliderSound}
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
  progressBarAll: {
    width: '95%',
    height: 5,
    marginTop: 2,
    marginLeft: '2%',
  },
  textTrackProgress: {
    marginBottom: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
  trackProgressCurrent: {
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
  soundView: {flexDirection: 'row', justifyContent: 'space-around'},
  sliderTrack: {width: '100%', height: 10},
  sliderSound: {width: '90%', height: 40},
  txtView: {flexDirection: 'row', justifyContent: 'center'},
  txtSound: {marginTop: -15, fontSize: 12, color: 'black'},
});
