import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterPorvider, Route, RouterProvider, Outlet, } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Single from './pages/Single';
import Home from './pages/Home';
import Write from './pages/Write';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles.scss';

const Layout = () => {
  return <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter ([
  
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      // {
      //   path: "/home",
      //   element: <Home />
      // },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },

    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  
])

function App() {
  return (
    <div className='app'>
      <div className='container' >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}




export default App;
