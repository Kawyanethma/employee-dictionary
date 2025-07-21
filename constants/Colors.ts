/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    buttonColor: '#000',
    buttonText: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    mainColor: '#e5e1d2',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    buttonColor: '#ccccccff',
    buttonText: '#000',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    mainColor: '#96907bff',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
