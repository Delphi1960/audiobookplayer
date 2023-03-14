import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}
// const trackList = [
//   {
//     id: '1',
//     url: 'file:///storage/emulated/0/DCIM/assets/1-01.mp3',
//     title: '(1-01) Стивен Кинг - Тёмная Башня 3 Бесплодн...',
//     artist: 'Роман Волков',
//     // duration: 1672,
//   },
//   {
//     id: '2',
//     url: require('../assets/1-02.mp3'),
//     title: '(1-02) Стивен Кинг - Тёмная Башня 3 Бесплодн...',
//     artist: 'Роман Волков',
//     // duration: 381,
//   },
//   {
//     id: '3',
//     url: require('../assets/Бабуля.mp3'),
//     title: 'Стивен Кинг - Бабуля',
//     artist: 'Роман Волков',
//     // duration: 381,
//   },
// ];

export async function addTracks(trackList) {
  await TrackPlayer.add(trackList);
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
}
