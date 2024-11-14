import React, { useState } from 'react';
import {
  Box,
  Text,
  Divider,
  FormControl,
  Button,
  useToast,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PasswordInput from '../../components/Forms/PasswordInput';
import { useNavigate } from 'react-router-dom';
import { changePassword } from 'api/auth';
import {
  successToastContainerStyle,
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';
import AlertBox from 'components/Common/AlertBox';

type errorMessageSchema = {
  title: string;
  description: string;
};
const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<errorMessageSchema>();
  let navigate = useNavigate();
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('Password is required and must be of 8 characters')
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, a capital letter, a symbol and a number.'
        ),
      newPassword: Yup.string()
        .required('Must be at least 8 characters.')
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, a capital letter, a symbol and a number.'
        ),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      changePassword(values)
        .then((res) => {
          if (res.data.success == true) {
            toast({
              containerStyle: successToastContainerStyle,
              render: ({ onClose }) => {
                return (
                  <Flex style={toastRenderContainerStyle}>
                    <Text> {res.data.message}</Text>
                    <CloseButton onClick={onClose} />
                  </Flex>
                );
              },
            });
          }
          setIsSubmitting(false);
          navigate('/');
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (error.response.status === 400) {
            let newErrorMessage: errorMessageSchema = {
              title: 'Current password does not match!',
              description: 'Please try using your valid current password',
            };

            setErrorMessage(newErrorMessage);
          } else {
            let newErrorMessage: errorMessageSchema = {
              title: 'Server error',
              description:
                'There was some some on the server, please try again later!',
            };

            setErrorMessage(newErrorMessage);
          }
        });
    },
  });

  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="gray.100"
        fontFamily="Poppins, sans-serif"
        zIndex={-12}>
        <Box p={['1rem', '1rem', '1rem', '1rem']}>
          <Text
            fontSize="28px"
            fontWeight={'bold'}
            fontFamily="Times New Roman, sans-serif">
            Change Password
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={'5'}>
              <Divider orientation="horizontal" color="gray.300"></Divider>
            </Box>
            <Box mt={'4'}>
              <Text fontSize="18px" fontWeight={'normal'} color="secondary.650">
                Change your password
              </Text>
            </Box>
            {errorMessage && (
              <Box mt={3} w="350px">
                <AlertBox
                  alertStatus="warning"
                  alertTitle={errorMessage?.title!}
                  alertDescription={errorMessage?.description!}
                />
              </Box>
            )}
            <Box>
              <Box mt="4" w={['300px', '300px', '400px', '400px']}>
                <FormControl>
                  <PasswordInput
                    id="currentPassword"
                    formik={formik}
                    placeholder="***********"
                    label="Current password"
                  />
                </FormControl>
              </Box>
              <Box mt="8" w={['300px', '300px', '400px', '400px']}>
                <FormControl>
                  <PasswordInput
                    id="newPassword"
                    formik={formik}
                    placeholder="***********"
                    label="New password"
                  />
                </FormControl>
              </Box>
              <Box mt="8" w={['300px', '300px', '400px', '400px']}>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    formik={formik}
                    placeholder="***********"
                    label="Confirm password"
                  />
                </FormControl>
              </Box>
            </Box>
            <Button
              type="submit"
              bg="primary.400"
              color="white"
              mt={'7'}
              isLoading={isSubmitting}
              _hover={{ bg: 'blue.100' }}>
              Update
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
