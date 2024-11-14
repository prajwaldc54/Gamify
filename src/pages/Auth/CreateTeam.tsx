import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useCheckUser from 'hooks/useCheckUser';
import TextInput from 'components/Forms/TextInput';
import logo from '../../assets/images/logo.svg';
import { Navigate, useNavigate } from 'react-router-dom';
import { registerTeam } from 'api/team';

const CreateTeam = () => {
  let navigate = useNavigate();
  let token = useCheckUser();
  let toast = useToast();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      TeamName: '',
    },
    validationSchema: Yup.object({
      TeamName: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(15, 'Name is too long'),
    }),
    onSubmit: (values: { TeamName: string }) => {
      setLoading(true);
      registerTeam({ teamName: values.TeamName })
        .then((res) => {
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: `${error.response?.data.message}`,
            position: 'top',
            isClosable: true,
            duration: 3000,
            status: 'error',
          });
        });
    },
  });

  return (
    <>
      <Grid gridTemplateRows={'5em 1fr'} minH="100vh">
        <Flex pl="1em" mt="20px">
          <Image src={logo} boxSize="2.56vw" />
        </Flex>
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center" pt="10px">
            <Flex
              mt="20px"
              direction="column"
              align="flex-start"
              minW="300px"
              width="40vw">
              <Text
                fontSize="3xl"
                fontWeight="bold"
                fontFamily="Times new roman">
                Setup your team
              </Text>
              <Text fontSize="md" fontWeight="medium" color="secondary.500">
                First things first: choose a name and domain
              </Text>
              <Flex mt="1.5em" direction="column" gap="30px" w="100%">
                <Box w="100%">
                  <TextInput
                    formik={formik}
                    inputType="text"
                    id="TeamName"
                    label="Team Name"
                    placeholder="Use your company, department, or own name for inspiration"
                  />
                </Box>
                <Button type="submit" variant="secondary" isLoading={loading}>
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Grid>
    </>
  );
};

export default CreateTeam;
