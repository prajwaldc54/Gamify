import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  Text,
  Image,
  Spacer,
  Button,
} from '@chakra-ui/react';
import PasswordInput from 'components/Forms/PasswordInput';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from 'api/auth';

export const ResetPassword = () => {
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(window.location.search);
  const uniqueId = query.get('uniqueId');
  let navigate = useNavigate();
  const email = query.get('email');
  const formik = useFormik({
    initialValues: {
      uniqueId: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, a capital letter, a symbol and a number.'
        ),
      confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      let newPassword = {
        uniqueId: uniqueId,
        email: email,
        newPassword: values.password,
        confirmPassword: values.confirm_password,
      };
      setLoading(true);
      resetPassword(newPassword)
        .then((res) => {
          setReset(true);
        })
        .catch(() => {
          setLoading(false);
        });
    },
  });
  return (
    <Box fontFamily="Poppins, sans-serif" maxW={['full']}>
      <Box p={7} position={['absolute', 'absolute', 'absolute', 'relative']}>
        <Image src={logo} alt="icon" />
      </Box>
      <Flex
        maxW={['', '', '', 'full']}
        ml={['', '', '', 44]}
        pb={['4', '4', '4', '0']}
        flexDir={['column-reverse', 'column-reverse', 'column-reverse', 'row']}
        placeItems="center">
        <Box>
          <Box mb={8}>
            {reset ? (
              <Text fontSize="3xl"> Your Password is Reset!</Text>
            ) : (
              <div>
                <Text fontSize="3xl">Create New Password</Text>
                <Text>Set your new password here.</Text>
              </div>
            )}
          </Box>
          <Box w="350px">
            <form onSubmit={formik.handleSubmit}>
              {reset ? (
                <Text>Login with your new password to continue</Text>
              ) : (
                <div>
                  <FormControl mt={9}>
                    <PasswordInput
                      id="password"
                      formik={formik}
                      placeholder="********"
                      label="Password"
                    />
                  </FormControl>
                  <FormControl mt={9}>
                    <PasswordInput
                      id="confirm_password"
                      formik={formik}
                      placeholder="********"
                      label="Confirm Password"
                    />
                  </FormControl>
                </div>
              )}
              {reset ? (
                <Button
                  type="submit"
                  variant="secondary"
                  w="full"
                  mt={4}
                  onClick={() => {
                    navigate('/login');
                  }}>
                  Login
                </Button>
              ) : (
                <Button
                  isLoading={loading}
                  loadingText="Submitting"
                  type="submit"
                  variant="secondary"
                  w="full"
                  mt={4}>
                  Reset Password
                </Button>
              )}
            </form>
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
export default ResetPassword;
