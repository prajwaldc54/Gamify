import { extendTheme } from '@chakra-ui/react';
import { ButtonTheme as Button } from './components/ButtonTheme';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
  },
  colors: {
    blue: {
      100: '#7EC8E3',
    },
    gray: {
      100: '#F7F7F8',
      300: '#EAEAEB',
      400: '#DEDEDE',
    },
    primary: {
      300: '#02A4FF', //focus input field border
      400: '#3069FE', //button color
      600: '#3069FE',
      700: '#007BFF',
    },
    success: {
      400: '#4F9C1F',
      500: '#F5891D',
    },
    secondary: {
      100: '#F1F3F4', //readonly input
      150: '#F6F6F6',
      200: '#6A6A9F67',
      300: '#ACACAC',
      400: '#979797', //input field border, label
      450: '#9A9A9A',
      460: '#808080',
      500: '#707070', //label
      550: '#4F4F55', //label
      560: '#1F272E',
      600: '#191932',
      650: '#1A1919',
      700: '#171717',
      800: '#48A868',
      900: '#E27A31', //doughnut chart color
    },
    danger: {
      300: '#FEF4F4', //error bg
      400: '#F24545', //error input field border
      500: '#DB0000', //error message
    },
    heading: {
      400: '#373737',
    },
    subHeading: {
      200: '#D5D5D8',
      400: '#646464',
      600: '#808080',
    },
    icon: {
      400: '#A3A3A3',
    },

    black: {
      500: '#707070',
      670: '#4F4F55',
      800: '#1A1919',
    },
  },
  shadows: {
    light: '0px 1px 15px #00000029',
  },
  components: {
    Button,
  },
});
