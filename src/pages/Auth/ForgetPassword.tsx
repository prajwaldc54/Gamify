import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Image,
  Text,
  Flex,
  useDisclosure,
  Button,
  Box,
  ModalHeader,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from 'components/Forms/TextInput';
import logo from '../../assets/images/logo.svg';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import { NavLink } from 'react-router-dom';
import { forgotPassword } from 'api/auth';
import AlertBox from 'components/Common/AlertBox';

interface RecivedData {
  success?: boolean;
  message?: string;
}
const ForgetPassword: React.FC<{}> = () => {
  const [successData, setSuccessData] = useState<RecivedData>({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sent, setSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email required').email('Email is invalid'),
    }),
    onSubmit: (values) => {
      let userData = {
        email: values.email,
      };
      setLoading(true);
      forgotPassword({
        email: userData.email,
        resend: sent,
      })
        .then((res: any) => {
          setSuccessData({
            message: res?.data?.message,
            success: res?.data?.success,
          });
          onOpen();
          setShowError(false);
          setLoading(false);
          setSent(false);
        })
        .catch((res: any) => {
          if (res.response?.status === 409) {
            setSuccessData({
              message: res?.response?.data?.message,
            });
            onOpen();
            setShowError(false);
            setLoading(false);
          } else if (res.response?.status === 404) {
            setSuccessData({
              message: res?.response?.data?.message,
            });
            setShowError(true);
            setLoading(false);
          }
        });
    },
  });

  const handleclick = () => {
    setSent(true);
    formik.handleSubmit();
    onClose();
  };

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
        <Box
          w={'400px'}
          ml={['0', '0em', '0em', '10em']}
          mt={['0', '0em', '0em', '4em']}>
          <form id="form" onSubmit={formik.handleSubmit}>
            <Text
              color="Heading.400"
              fontSize="3xl"
              fontFamily="Times New Roman"
              fontWeight="bold">
              Forgot Password
            </Text>
            <Text fontSize="16px/19px" color="subHeading.400">
              Enter the email associated with your account and well send you
              instructions to reset your password.
            </Text>
            {showError && (
              <AlertBox
                alertStatus="warning"
                alertTitle={`User with that email doesn't exists!`}
                alertDescription="Please enter correct email address."
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
            <Box marginTop={2}>
              {successData?.success === true ? (
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton
                      color={'gray.600'}
                      mt={1}
                      border="1px"
                      size="sm"
                      fontSize="medium"
                    />
                    <ModalBody mt={7} mr={3}>
                      Instructions has been sent to your email.Please check your
                      email for further verification process.
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              ) : (
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton
                      color={'gray.600'}
                      mt={4}
                      mr={3}
                      border="1px"
                      size="sm"
                      fontSize="medium"
                    />
                    <Box ml={4} w={'400px'}>
                      <ModalHeader>
                        Are you sure you want to resend the instructions ?
                      </ModalHeader>
                      <ModalBody color="subHeading.400" mt={-3}>
                        Previously sent instructions already exist in your
                        email.If you still want to resend the instructions then
                        click on resend button.
                      </ModalBody>
                    </Box>
                    <ModalFooter>
                      <Button
                        isLoading={loading}
                        variant="secondary"
                        marginRight={'3em'}
                        onClick={handleclick}>
                        Resend
                      </Button>
                      <Button colorScheme="blue" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              )}
            </Box>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              w={'full'}
              marginTop="26px"
              type="submit"
              variant="secondary">
              Send Instructions
            </Button>
            <Flex marginTop={3} justifyContent="center">
              <Text color="secondary.500">Return to</Text>
              <NavLink to="/login">
                <Text marginLeft={2} color="secondary.600">
                  Login here
                </Text>
              </NavLink>
            </Flex>
          </form>
        </Box>
        <Box>
          <Image width={'full'} src={signup_image} alt="image in right" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgetPassword;
