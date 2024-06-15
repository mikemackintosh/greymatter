import React from 'react';
import ReactDOM from 'react-dom/client';
import { useRoutes } from 'react-router-dom';
import App from './App.tsx';
import './index.css';


const BuildProviderTree = (providers) => {
  if (providers.length === 1) {
    return providers[0];
  }
  
  const A = providers.shift();
  const B = providers.shift();
  return BuildProviderTree([
    ({ children }) => (
      <A>
        <B>
          {children}
        </B>
      </A>
    ),
    ...providers,
  ]);
};

const Providers = BuildProviderTree(moduleProviders);

const RouteProvider = () => {
  const router = useRoutes(routeConfig);
  return (
    <Providers>
      {router}
    </Providers>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
