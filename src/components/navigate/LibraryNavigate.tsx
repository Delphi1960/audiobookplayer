import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Library from '../library/Library';
import GetRootDirLib from '../GetRootDirLib';

// type Props = {};
const Stack = createNativeStackNavigator();

export default function LibraryNavigate() {
  // const rootDirPathPlayer = useRecoilValue(rootDirPath);

  return (
    <Stack.Navigator initialRouteName="Настройки">
      <Stack.Screen name="Библиотека" component={Library} />
      <Stack.Screen name="Корневая папка" component={GetRootDirLib} />
    </Stack.Navigator>
  );
}
