import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import TextInput from 'components/Forms/TextInput';
import PasswordInput from 'components/Forms/PasswordInput';
import { register } from 'api/auth';
import logo from '../../assets/images/logo.svg';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from 'components/Common/AlertBox';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'stores';

const Signup = () => {
  const navigate = useNavigate();
  const [userExistsAlready, setUserExistsAlready] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { setUserData } = bindActionCreators(actionCreators, dispatch);

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
      let newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      setIsSubmitting(true);
      register(newUser)
        .then((res) => {
          setIsSubmitting(false);
          setUserData({
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
          });
          navigate(
            `/verify-user/${res.data.data.id}?email=${res.data.data.email}`
          );
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (error.response.status === 409) {
            setUserExistsAlready(true);
          } else {
            toast({
              title: 'Error Occured',
              description:
                'There was some some on the server, please try again later!',
              status: 'error',
              isClosable: true,
            });
          }
        });
    },
  });

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
        <Box>
          <Box mb={8}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              fontFamily="serif"
              color="heading.400">
              Sign up
            </Text>
            <Text color="subHeading.400">Create your account.</Text>
          </Box>

          {userExistsAlready && (
            <Box mb={4} mt={-5} w="350px">
              <AlertBox
                alertStatus="warning"
                alertTitle="User already exists!"
                alertDescription="Please try with different email or proceed to login"
              />
            </Box>
          )}

          <Box w="350px">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <TextInput
                  formik={formik}
                  inputType="email"
                  id="email"
                  label="Email address"
                  placeholder="example@domainname.com"
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
                isLoading={isSubmitting}
                loadingText="Submitting">
                Sign Up
              </Button>
            </form>
          </Box>
          <Box textAlign="center" mt="8px">
            <Text as="span" color="secondary.500">
              Already have an account?
            </Text>
            <Link to="/login">
              <Text as="span" color="secondary.600">
                {' '}
                Login Here
              </Text>
            </Link>
          </Box>
        </Box>
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

export default Signup;
