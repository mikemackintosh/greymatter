import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from 'react-router-dom';

import './App.css';
import { startLoginFlow } from './api/api';

const Layout = () => {
  return (
    <>
      <div>NAV VBAR</div>
      <Link to={'/contact'}>Contact</Link>
      <Outlet />
    </>
  );
};

const Contact = () => {
  return (
    <>
      <h1>Contact Us</h1>
    </>
  );
};

const Dashboard = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Dashboard</h1>

      <h1 className="text-2xl text-violet-300">Vite + React</h1>
      <div className="bg-slate-300">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const AuthLayout = () => {
  useEffect(() => {
    startLoginFlow().then((d) => {
      console.log(d);
    })
  })
  return (
    <>
      <h1>Accounts Stuff</h1>
      <Outlet />
    </>
  );
};

const logoutUser = () => {
  return true;
};

function redirectIfUser({ request }: { request: any }) {
  console.log("Checking if you're logged in, ", request);
}

const Login = () => {
  return (
    <>
      <form>
        <label htmlFor={'username'}>Username</label>
        <input id="username" />
        <label htmlFor={'password'}>Password</label>
        <input id="password" type="password" />
      </form>
    </>
  );
};

// Or use plain objects
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        loader: ({ request }) =>
          fetch('/api/dashboard.json', {
            signal: request.signal,
          }),
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
            // loader: redirectIfUser,
          },
          {
            path: 'logout',
            action: logoutUser,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
