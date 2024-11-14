import React, { Component, ReactNode } from 'react';
import { Box, Button, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react';
import ErrorImage from '../assets/icons/error.svg';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundaries extends Component<Props, State> {
  refresh = () => {
    this.setState({});
  };
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  submit() {
    window.location.reload();
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <Flex direction="column" align="center" h="100vh" justify="center">
            <Flex>
              <Image src={ErrorImage} alt="Logo" />
            </Flex>

            <Text
              mt="5px"
              fontFamily="Times New Roman"
              fontSize="28px"
              fontWeight="bold">
              Something went wrong....
            </Text>

            <Text color="icon.400" fontSize="12px">
              Sorry for the inconvenience our team has been notified...
            </Text>

            <Box mt="20px">
              <ButtonGroup gap="2">
                <Button
                  type="submit"
                  bg="primary.400"
                  color="white"
                  onClick={() => {
                    this.submit();
                  }}
                  _hover={{ bg: 'blue.100' }}>
                  Reload
                </Button>
                <a href="/">
                  <Button
                    type="submit"
                    bg="gray.400"
                    color="white"
                    _hover={{ bg: 'blue.400' }}>
                    Home
                  </Button>
                </a>
              </ButtonGroup>
            </Box>
          </Flex>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;
