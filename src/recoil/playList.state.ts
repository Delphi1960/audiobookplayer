import {atom} from 'recoil';
import {PlayList} from '../types/playList.type';

export const playList = atom<PlayList>({
  key: 'playList',
  default: {
    id: '1',
    url: require('../assets/books/1-01.mp3'),
    title: '(1-01) Стивен Кинг - Тёмная Башня 3 Бесплодн...',
    artist: 'Роман Волков',
    duration: 1672,
  },
});

export const rootDirPath = atom<string | undefined>({
  key: 'rootDirPath',
  default: '/storage/emulated/0',
});

export const currentBookId = atom<string | undefined>({
  key: 'currentBookId',
  default: '',
});
