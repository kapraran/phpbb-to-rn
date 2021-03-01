// https://stackoverflow.com/a/57117291

import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;

  if (Platform.OS === 'ios')
    return Math.round(PixelRatio.roundToNearestPixel(newSize));

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
