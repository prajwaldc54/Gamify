export const ButtonTheme = {
  baseStyle: {
    padding: '6px',
    fontSize: '16px',
  },
  sizes: {},
  variants: {
    primary: {
      bg: 'primary.400',
      color: '#ffffff',
      _hover: {
        bg: '#4a7cfe',
      },
    },
    secondary: {
      bg: 'secondary.700',
      color: '#ffffff',
      _hover: {
        bg: '#3e3e3e',
        _disabled: {
          bg: '#3e3e3e',
          opacity: 1,
        },
      },
      _loading: { bg: '#3e3e3e', opacity: 1 },
    },
    secondaryOutline: {
      bg: '#ffffff',
      color: 'text.400',
      outline: '1px solid #707070',
    },
    secondaryRounded: {
      bg: 'subHeading.200',
      color: 'secondary.650',
      borderRadius: '45px',
      fontWeight: 'medium',
    },
    trinary: {
      backgroundColor: '#D5D5D8',
      color: 'secondary.700',
      p: '10px',
      _hover: {
        backgroundColor: '#c6c6c9',
      },
    },
  },
};
