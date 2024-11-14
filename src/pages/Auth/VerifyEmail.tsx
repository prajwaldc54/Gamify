import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Image,
  Text,
  Flex,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react';
import logo from '../../assets/images/logo.svg';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import signup_image from '../../assets/images/Technology Flat Illustration/Technology Flat Illustration.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInputWithValue from 'components/Forms/TextInputWithValue';

export const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resend, setResend] = useState(true);
  const [code, setCode] = useState('');
  const [time, setTime] = useState(60);
  const query = new URLSearchParams(window.location.search);
  const email = query.get('email');
  const toast = useToast();
  const { id } = useParams();
  let navigate = useNavigate();
  const handleChange = (e: any) => {
    let val = e.target.value;
    formik.values.verify = val;
    if (val.length <= 6) {
      setCode(`${val}`);
    }
  };
  const sendRequest = async () => {
    axios
      .patch(
        `https://api.gamify.dev.diagonal.solutions/auth/verify-user/${id}`,
        {
          code: code,
        }
      )
      .then((res: any) => {
        setLoading(false);
        setVerified(true);
      })
      .catch((res: any) => {
        setLoading(false);
        formik.errors['verify'] = 'Enter the valid code sent in your email.';
      });
  };
  const sendCode = async () => {
    if (resend) {
      axios
        .post(`https://api.gamify.dev.diagonal.solutions/auth/resend-code`, {
          email: email,
        })
        .then((res: any) => {
          setResend(false);
          toast({
            title: 'Code Sent',
            description:
              "We've sent a code to your email please check your mail.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          timing();
        });
    }
  };
  const timing = () => {
    let interval = setInterval(() => {
      setTime((time: number) => time - 1);
    }, 1000);
    setTimeout(() => {
      setResend(true);
      clearInterval(interval);
      setTime(60);
    }, 60000);
  };

  const formik = useFormik({
    initialValues: {
      verify: '',
    },
    validationSchema: Yup.object({
      verify: Yup.string()
        .required('Enter Code')
        .min(6, 'Enter valid code of atleast 6 digits sent in your email '),
    }),
    onSubmit: (values) => {
      setLoading(true);
      sendRequest();
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
        <Box
          w={['350px', '350px', '350px', '400px']}
          mt={['0', '0em', '0em', '4em']}
          ml={['0', '0em', '0em', '10em']}>
          {verified ? (
            <Box>
              <Text
                color="Heading.400"
                fontSize="3xl"
                fontFamily="Times New Roman"
                fontWeight="bold">
                Verified Succesfully
              </Text>
              <Text fontSize="16px" color="subHeading.400">
                Click the button below to go to login page
              </Text>
            </Box>
          ) : (
            <Box>
              <Text
                color="Heading.400"
                fontSize="3xl"
                fontFamily="Times New Roman"
                fontWeight="bold">
                Verify your email address
              </Text>
              <Text fontSize="16px" color="subHeading.400">
                We emailed a six-digit code to<br></br>
                <Text as="span" fontWeight="bold">
                  {email}
                </Text>
              </Text>
            </Box>
          )}
          {verified ? (
            <Button
              w={'full'}
              marginTop="26px"
              type="submit"
              variant="secondary"
              onClick={() => {
                navigate('/login');
              }}>
              Login
            </Button>
          ) : (
            <form id="form" onSubmit={formik.handleSubmit}>
              <FormControl marginTop={25}>
                <TextInputWithValue
                  formik={formik}
                  inputType="number"
                  id="verify"
                  placeholder="--- ---"
                  label="Verification Code"
                  change={handleChange}
                  value={code}
                />
              </FormControl>
              <Button
                isLoading={loading}
                w={'full'}
                marginTop="26px"
                type="submit"
                variant="secondary">
                Submit
              </Button>
              <Flex marginTop={3} justifyContent="center">
                <Text color="secondary.500">Didn&#39;t get code?</Text>
                <Text
                  marginLeft={2}
                  color="secondary.600"
                  cursor="pointer"
                  onClick={sendCode}>
                  Resend Code
                </Text>
                {!resend && (
                  <Text paddingLeft="0.5em">
                    {time < 10 ? '0' + time : time}s
                  </Text>
                )}
              </Flex>
            </form>
          )}
        </Box>
        <Box>
          <Image width={'full'} src={signup_image} alt="image in right" />
        </Box>
      </Flex>
    </Box>
  );
};
