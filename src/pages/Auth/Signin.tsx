import React, { useState } from 'react';
import {
  FormControl,
  Image,
  Text,
  Flex,
  Button,
  Box,
  Checkbox,
  FormLabel,
  Grid,
  useToast,
  CloseButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from 'components/Forms/TextInput';
import PasswordInput from 'components/Forms/PasswordInput';
import logo from '../../assets/images/logo.svg';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, loggedInUser } from 'api/auth';
import { getTeams, getTeamsOfLoggedInUser } from 'api/team';
import AlertBox from 'components/Common/AlertBox';
import {
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from 'themes/toastThemes';

const Signin: React.FC<{}> = () => {
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });

  const [check, setCheck] = useState<Boolean>(false);
  const [showError, setShowError] = useState<Boolean>(false);
  const [wrongData, setWrongData] = useState({
    alertTitle: '',
    alertDescription: '',
  });
  const [verified, setVerified] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email required').email('Email is invalid'),
      password: Yup.string().required('password required'),
    }),
    onSubmit: async (values) => {
      let userData = {
        email: values.email,
        password: values.password,
      };
      setLoading(true);
      login(userData)
        .then((loginData) => {
          localStorage.setItem(
            'access_token',
            loginData.data?.data?.access_token
          );
          if (check) {
            localStorage.setItem(
              'refresh_token',
              loginData.data?.data?.refresh_token
            );
          }
          getTeamsOfLoggedInUser()
            .then((teamData) => {
              if (teamData.data?.data?.length > 0) {
                navigate('/');
              } else {
                navigate('/create-team');
              }
            })
            .catch((error) => {
              toast({
                containerStyle: errorToastContainerStyle,
                render: ({ onClose }) => {
                  return (
                    <Flex style={toastRenderContainerStyle} color="white">
                      <Text>{error.response?.data.message}</Text>
                      <CloseButton onClick={onClose} />
                    </Flex>
                  );
                },
              });
            });
        })
        .catch((res) => {
          if (res?.response.status == 403) {
            setVerified(false);
            setUserData(res.response.data.data);
          }
          if (res.response?.status === 400) {
            setWrongData({
              alertTitle: `Incorrect Password!`,
              alertDescription: 'Please enter correct password for login.',
            });
            setShowError(true);
            setLoading(false);
          }
          if (res.response?.status === 404) {
            setWrongData({
              alertTitle: `User with that email doesn't exists!`,
              alertDescription:
                'Please try with different email or proceed to signup',
            });
            setShowError(true);
            setLoading(false);
          }
        });
    },
  });

  return (
    <Box fontFamily="Poppins">
      <Box
        padding="1em"
        position={['absolute', 'absolute', 'absolute', 'relative']}>
        <Image src={logo} />
      </Box>
      <Flex
        flexDirection={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
        justifyContent={'space-between'}>
        {verified ? (
          <Grid placeItems={'center'}>
            <Box
              w={['350px', '350px', '350px', '400px']}
              ml={['0', '0em', '0em', '10em']}>
              <form id="form" onSubmit={formik.handleSubmit}>
                <Text
                  color="Heading.400"
                  fontSize="3xl"
                  fontFamily="Times New Roman"
                  fontWeight="bold">
                  Sign in
                </Text>
                <Text fontSize="16px/19px" color="subHeading.400">
                  Login to manage your account.
                </Text>
                {showError && (
                  <AlertBox
                    alertStatus="warning"
                    alertTitle={wrongData.alertTitle}
                    alertDescription={wrongData.alertDescription}
                  />
                )}
                <FormControl marginTop={25}>
                  <TextInput
                    formik={formik}
                    inputType="email"
                    id="email"
                    placeholder="example@domainname.com"
                    label="Email Address"
                  />
                </FormControl>
                <FormControl marginTop={35}>
                  <PasswordInput
                    formik={formik}
                    label="Password"
                    placeholder="Enter your password"
                    id="password"
                  />
                </FormControl>
                <FormControl>
                  <Flex justifyContent="space-between" marginTop={30}>
                    <Flex>
                      <Checkbox
                        paddingBottom={2}
                        colorScheme="teal"
                        id="check"
                        onChange={(e) => {
                          setCheck(e.target.checked);
                        }}></Checkbox>
                      <FormLabel htmlFor="check" paddingLeft={1}>
                        <Text color="secondary.500">Remember me</Text>
                      </FormLabel>
                    </Flex>
                    <NavLink to="/forgot-password">
                      <Text color="secondary.500">Forgot password?</Text>
                    </NavLink>
                  </Flex>
                </FormControl>
                <Button
                  isLoading={loading}
                  loadingText="Submitting"
                  w={'full'}
                  data-testid="loginBtn"
                  marginTop="26px"
                  type="submit"
                  variant="secondary">
                  Sign In
                </Button>
                <Flex marginTop={3} justifyContent="center">
                  <Text color="secondary.500">Not register yet?</Text>
                  <NavLink to="/signup">
                    <Text marginLeft={1} color="secondary.600">
                      Create a new account
                    </Text>
                  </NavLink>
                </Flex>
              </form>
            </Box>
          </Grid>
        ) : (
          <Box
            w={['350px', '350px', '350px', '400px']}
            ml={['0', '0em', '0em', '10em']}
            mt={['0', '0em', '0em', '4em']}>
            <Text
              color="Heading.400"
              fontSize="3xl"
              fontFamily="Times New Roman"
              fontWeight="bold">
              User Is not Verified
            </Text>
            <Text fontSize="16px/19px" color="subHeading.400">
              Check your email for verification code and goto verification page
              below.
            </Text>
            <Button
              w={'full'}
              marginTop="26px"
              type="submit"
              variant="secondary"
              onClick={() => {
                navigate(`/verify-user/${userData.id}?email=${userData.email}`);
              }}>
              Verify User
            </Button>
          </Box>
        )}
        <Box>
          <Image width={'full'} src={signup_image} alt="image in right" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Signin;
