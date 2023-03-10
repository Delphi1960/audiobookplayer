import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import {scanDir} from '../../utils/scanDir';
import {storage} from '../../utils/storage';
import {PlayList} from '../../types/playList.type';

type ItemData = {
  id: string;
  dir: string;
  name: string;
  nameRoot: string;
  path: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  textColor1: string;
};

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  textColor1,
}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <View style={styles.containerItem}>
      <Image
        style={styles.imageStyle}
        source={
          item.dir === 'd'
            ? require('../../assets/images/book.png')
            : require('../../assets/images/file.png')
        }
      />
      <View style={styles.containerText}>
        <Text style={[styles.descriptionStyle, {color: textColor1}]}>
          {item.id}
        </Text>
        <Text style={[styles.titleStyle, {color: textColor}]}>{item.name}</Text>
        <Text style={[styles.descriptionStyle, {color: textColor1}]}>
          {item.nameRoot}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

type Props = {navigation: any; rootDir: string};

export default function LibraryGetList({rootDir}: Props) {
  const [booksList, setBooksList] = useState<ItemData[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [libRootDir, setLibRootDir] = useState<string | undefined>('');
  const [, setTrackList] = useState<PlayList[]>([]);
  // const [sizeTrack, setSizeTrack] = useState(0);

  async function loadTrack(trc: PlayList[]) {
    await TrackPlayer.reset();
    await TrackPlayer.add(trc);
  }

  async function scanTracs(items: ItemData) {
    let trackFileList = [];
    if (items.dir === 'f') {
      trackFileList = [
        {
          id: items.id,
          url: 'file://' + items.path,
          title: items.name,
          artist: '',
        },
      ];
    } else {
      const resultTrackList = await scanDir(items.path!);
      resultTrackList.files.sort((a, b) => {
        return a > b ? 1 : -1;
      });
      for (let i = 0; i < resultTrackList.files.length; i++) {
        let bookName = resultTrackList.files[i].slice(libRootDir!.length + 1);
        let title = bookName.slice(0, bookName.indexOf('/'));
        if (title !== items.name) {
          title = title + '\n' + items.name;
        }
        let track = {
          id: resultTrackList.files[i],
          url: 'file://' + resultTrackList.files[i],
          title: title,
          artist: '',
          file: bookName.slice(bookName.lastIndexOf('/') + 1),
        };
        trackFileList.push(track);
      }
    }
    loadTrack(trackFileList);

    // ???????????? ????????????????
    storage.set('@trackList', JSON.stringify(trackFileList));
    // ?????????? ???????????? ?? ??????????????????
    storage.set('@trackCount', trackFileList.length);
    // ?????????? ???????????????????? ??????
    storage.set('@totalListened', 0);

    setTrackList(trackFileList);
    getBookDurations(trackFileList.length);
  }

  // ?????????? ?????????? ?????????????????????????????? ??????????
  const getBookDurations = (trackCount: number) => {
    let allSize = 0;

    // console.log('??-???? ???????????? ?? ??????????????', trackCount);
    // ?????????????? ???? ???????????? ?? ?????????????????? ?????????? ?????????????????????????????? ??????????????
    const getDurationSec = async () => {
      TrackPlayer.skip(0);

      for (let i = 0; i < trackCount; i++) {
        // ?????????????????? ?? i-???? ??????????
        TrackPlayer.skip(i);
        // ?????????? ?????????????????????????????? ?????????? ?? ??????
        let size = await TrackPlayer.getDuration();
        // ?????????? ?? ?????????????? ???????? ???? ???????????? ?????????????? ???????????????? duration ?????????????? ?????????????????? ??????????????
        // ?????????? ???????????????????? ?????????? ??????????????, ?????????? ???????????????? ????????????????????????. ???????? ?? ?????????? duration=0(???????????? ??????????)
        let count = 0;
        while (size === 0 && count < 10) {
          size = await TrackPlayer.getDuration();
          count++;
        }

        allSize = allSize + size;
        // console.log({i, size, count});
      }
      // setSizeTrack(allSize);
      storage.set('@bookDurations', allSize);
      // console.log({allSize});
      // console.log('=========================');
      TrackPlayer.skip(0);
    };
    getDurationSec();
  };

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#d3bdde';
    const color = item.id === selectedId ? 'white' : 'navy';
    const color1 = item.id === selectedId ? 'white' : 'blue';
    // let trackList = [{}];
    return (
      <Item
        item={item}
        // ?????????? ??????????=======================================
        onPress={() => {
          setSelectedId(item.id);
          storage.set('@selectedBook', item.id);
          scanTracs(item);
        }}
        // ?????????? ??????????=======================================
        backgroundColor={backgroundColor}
        textColor={color}
        textColor1={color1}
      />
    );
  };

  useEffect(() => {
    setLibRootDir(rootDir);
    setSelectedId(storage.getString('@selectedBook'));
    scanLibrary(rootDir);
  }, [rootDir]);

  async function scanLibrary(path: string | undefined) {
    const data = await scanDir(path!);
    const d: string[] = data.files.map(item => item);
    for (let i = 0; i < d.length; i++) {
      let pos = 0;
      let nPos = 0;
      while (true) {
        let foundPos = d[i].indexOf('/', pos);
        if (foundPos === -1) {
          break;
        }
        pos = foundPos + 1;
        nPos = nPos + 1;
      }

      if (d[i].indexOf('/') >= 0 && d[i].indexOf('.') < path!.length) {
        d[i] = d[i].slice(0, 12);
      }
      if (pos > path!.length + 1) {
        d[i] = d[i].slice(0, pos - 1);
      }
    }

    const resultList: string[] = [...new Set(d)];
    const bookList: ItemData[] = resultList.map(function (val, ind) {
      let valName = val.slice(path!.length + 1);
      if (valName.indexOf('/') >= 0) {
        valName = valName.slice(valName.indexOf('/') + 1);
      }
      if (valName.indexOf('.mp3') > 0) {
        valName = valName.slice(0, valName.indexOf('.'));
      }
      let root = val.slice(path!.length + 1);
      if (root.indexOf('/') >= 0) {
        root = root.slice(0, root.indexOf('/'));
      }
      return {
        id: ind.toFixed(),
        name: valName,
        nameRoot: root,
        dir: val.indexOf('.mp3') >= 0 ? 'f' : 'd',
        path: val,
      };
    });

    bookList.sort((a, b) => {
      if (a.dir === b.dir) {
        return a.name > b.name ? 1 : -1;
      }
      return a.dir > b.dir ? 1 : -1;
    });
    setBooksList(bookList);
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={booksList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  item: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 14,
  },
  imageStyle: {width: 70, height: 80, marginLeft: -5, marginRight: 5},
  containerText: {flexDirection: 'column'},
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  descriptionStyle: {
    fontSize: 14,
    marginBottom: 0,
  },
});
