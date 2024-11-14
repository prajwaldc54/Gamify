import { createStandaloneToast } from '@chakra-ui/react';
import { AxiosStatic } from 'axios';
import { logoutUser } from './logoutUtil';
const axios: AxiosStatic = require('axios');
const { toast } = createStandaloneToast();

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use((config: any) => {
  let access_token = localStorage.getItem('access_token');
  if (access_token) {
    config.headers.Authorization = 'Bearer ' + access_token;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser();
    }
    if (error.response.status >= 500) {
      toast({
        title: 'Error Occured',
        description:
          'There was some some on the server, please try again later!',
        status: 'error',
        isClosable: true,
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
