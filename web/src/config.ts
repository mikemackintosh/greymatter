/// <reference types="node" />

interface AppEnvironment {
  [environment: string]: Config;
}

interface Config {
  backend: string;
  authnUrl: string;
  authzUrl?: string;
}

const env: string = import.meta.env.REACT_APP_ENV ? import.meta.env.REACT_APP_ENV : 'dev';

const prod_url: string = import.meta.env.PROD_URL ? import.meta.env.PROD_URL : '';

const defaultConfig: AppEnvironment = {
  dev: {
    backend: 'http://localhost:8080',
    authnUrl: 'http://localhost:8000',
  },
  docker: {
    backend: 'http://localhost:8000',
    authnUrl: 'http://localhost:8000',
  },
  production: {
    backend: 'https://' + prod_url,
    authnUrl: 'http://' + prod_url,
  },
};
export const config: Config = Object.assign(
  defaultConfig[env],
);
