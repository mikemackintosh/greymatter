import axios, { AxiosResponse } from 'axios';
import { config } from '../config';

const v1 = axios.create({
  baseURL: `${config.backend}/api/v1`,
});

const kratos = axios.create({
    baseURL: `${config.backend}/self-service`,
  });

const req = async (): Promise<AxiosResponse> => {
  return v1({
    method: 'GET',
    url: '/',
  });
};


const startLoginFlow = async (): Promise<AxiosResponse> => {
    return kratos({
        method: 'GET',
        url: '/self-service/login/browser',
    })
}

export {
    startLoginFlow,
}