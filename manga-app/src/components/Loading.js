import React from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

const {width, height} = Dimensions.get('window');
export default function Loading() {
  return (
    <View style={{height, width}} className="absolute bg-neutral-800 flex-row justify-center items-center">
      <Progress.CircleSnail thickness={8} size={80} color={theme.background}/>
    </View>
  )
}