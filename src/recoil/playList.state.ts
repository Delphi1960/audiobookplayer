import {atom} from 'recoil';
import {PlayList} from '../types/playList.type';

export const bookTrackPlayList = atom<PlayList[]>({
  key: 'bookTrackPlayList',
  default: [
    {
      id: '1',
      url: '',
      title: 'Книга не выбрана',
      artist: '',
    },
  ],
});

export const rootDirPath = atom<string | undefined>({
  key: 'rootDirPath',
  default: '/storage/emulated/0',
});

export const selectedBookId = atom<string | undefined>({
  key: 'selectedBookId',
  default: '',
});
