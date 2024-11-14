import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Image,
  Spacer,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import PasswordInput from 'components/Forms/PasswordInput';
import TextInput from 'components/Forms/TextInput';
import logo from '../../assets/images/logo.svg';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const JoinTeamSignup = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOnboardingFinished, setIsOnboardingFinished] =
    useState<boolean>(false);
  const [isInviteLinkValid, setIsInviteLinkValid] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUserAlreadyLoggedIn, setIsUserAlreadyLoggedIn] =
    useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);
  const link = searchParams.get('link');
  const emailToken = searchParams.get('emailToken');

  const token = localStorage.getItem('access_token');

  let showOnboardingForm =
    !isOnboardingFinished && isInviteLinkValid && !isLoading;

  let showInvitationLinkInvalidError =
    !isInviteLinkValid && !isLoading && !isOnboardingFinished;

  const navigate = useNavigate();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, a capital letter, a symbol and a number.'
        ),
      confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup.bool().oneOf(
        [true],
        'Please accept terms and conditions to register.'
      ),
    }),
    onSubmit: (values) => {
      let newOnboardingUser = {
        mailToken: emailToken,
        name: values.name,
        password: values.password,
      };
      setIsSubmitting(true);
      axios
        .post(
          'https://api.gamify.dev.diagonal.solutions/team/onboarding',
          newOnboardingUser
        )
        .then((res) => {
          setIsSubmitting(false);
          setIsOnboardingFinished(true);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setIsOnboardingFinished(false);
          toast({
            title: 'Error Occured',
            description:
              'There was some error on the server, please try again later!',
            status: 'error',
          });
        });
    },
  });
  useEffect(() => {
    const getTeamAndEmail = async () => {
      try {
        const url = `https://api.gamify.dev.diagonal.solutions/team/join/${link}/${emailToken}`;
        const response = await axios.get(url);
        setIsLoading(false);
        setTeamName(response.data.data.team.teamName);
        if (response.data.data.mailToken) {
          setEmail(response.data.data.email);
          formik.values.email = email;
        } else {
          setIsOnboardingFinished(true);
        }
      } catch (error) {
        setIsLoading(false);
        setIsInviteLinkValid(false);
      }
    };
    getTeamAndEmail();
    if (token) setIsUserAlreadyLoggedIn(true);
  }, [email, emailToken, formik.values, link, token]);

  return (
    <Box fontFamily="Poppins, sans-serif" w="full">
      <Box p={7} position={['absolute', 'absolute', 'absolute', 'relative']}>
        <Image src={logo} alt="icon" />
      </Box>

      <Flex
        maxW={['350px', 'xl', 'xl', 'full']}
        ml={['34px', 16, 40, 44]}
        pb={['4', '4', '4', '0']}
        flexDir={['column-reverse', 'column-reverse', 'column-reverse', 'row']}
        placeItems="center">
        {showInvitationLinkInvalidError && (
          <Box width="350px">
            <Text fontSize="xl">
              Link is either invalid or has expired. Please contact your team
              manager if you would like to receive another link.
            </Text>
          </Box>
        )}

        {isLoading && (
          <Flex gap={8} minW="350px">
            <Spinner size="xl" />
            <Text>Getting invitation information...</Text>
          </Flex>
        )}

        {isOnboardingFinished && !isUserAlreadyLoggedIn && (
          <Box boxSize="sm">
            <Text fontSize="4xl">Your profile has been created!</Text>
            <Text>
              Your profile has been created and you have joined {teamName}. You
              can now proceed to login!
            </Text>
            <Button
              type="submit"
              variant="secondary"
              w="full"
              mt={4}
              onClick={() => navigate('/login')}>
              Proceed to login
            </Button>
          </Box>
        )}

        {isOnboardingFinished && isUserAlreadyLoggedIn && (
          <Box boxSize="sm">
            <Text fontSize="4xl">You have joined team {teamName}.</Text>
            <Text>
              You can now view {teamName} {"'s"} dashboard, posts and
              activities.
            </Text>
            <Button
              type="submit"
              variant="secondary"
              w="full"
              mt={4}
              onClick={() => navigate('/')}>
              Goto team dashboard
            </Button>
          </Box>
        )}

        {showOnboardingForm && (
          <Box>
            <Box mb={8}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                fontFamily="serif"
                color="heading.400">
                Sign up to accept the invitation and join {teamName}
              </Text>
              <Text color="subHeading.400">
                Please complete your profile to setup your account.
              </Text>
            </Box>
            <Box w="350px">
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <TextInput
                    formik={formik}
                    inputType="email"
                    id="email"
                    label="Email address"
                    placeholder="example@domainname.com"
                    isReadOnly={true}
                    value={email}
                  />
                </FormControl>

                <FormControl mt={9}>
                  <TextInput
                    formik={formik}
                    inputType="text"
                    id="name"
                    label="Full Name"
                    placeholder="Barly Vallendito"
                  />
                </FormControl>

                <FormControl mt={9}>
                  <PasswordInput
                    id="password"
                    formik={formik}
                    placeholder="Enter your password"
                    label="Password"
                  />
                </FormControl>

                <FormControl mt={9}>
                  <PasswordInput
                    id="confirm_password"
                    formik={formik}
                    placeholder="Enter your password"
                    label="Confirm Password"
                  />
                </FormControl>

                <FormControl mt={9}>
                  <Checkbox
                    colorScheme="teal"
                    id="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <Text color="secondary.500">
                      I accept the Terms and Conditions.
                    </Text>
                  </Checkbox>
                  {formik.touched.terms && formik.errors.terms && (
                    <Text color="danger.500" fontSize="xs">
                      {formik.errors.terms}
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  variant="secondary"
                  w="full"
                  mt={4}
                  isLoading={isSubmitting}>
                  Finish Setup
                </Button>
              </form>
            </Box>
          </Box>
        )}
        <Spacer />
        <Box pt={[0, 0, 0, 14]}>
          <Image
            src={signup_image}
            alt="signup-cover-image"
            h={['290px', '290px', '290px', '515px']}
            minW={['387px', '387px', '387px', '687px']}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default JoinTeamSignup;
