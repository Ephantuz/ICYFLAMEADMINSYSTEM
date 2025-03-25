import React from 'react';
import './App.css';
import Home from './Pages/Home/Home.jsx';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './Pages/Users/Users.jsx';
import Products from './Pages/Products/Products.jsx';
import Clients from './Pages/Clients/Clients.jsx';
import Orders from './Pages/Orders/Orders.jsx';
import Coupons from './Pages/Coupons/Coupons.jsx';
import Employees from './Pages/Employees/Employees.jsx';
import Dispach from './Pages/Dispach/Dispach.jsx';
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Menu from './Components/Menu/Menu.jsx'
// import Login from './Pages/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import VerifyWorker from './components/Auth/VerifyWorker.jsx';
import ProtectedLoginRoute from './Private/ProtectedLoginRoute.jsx';
import ProtectedRegiterRoute from './Private/ProtectedRegiterRoute.jsx';
import ProtectRoute from './Private/ProtectRoute.jsx';

import LoginComponent from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import VerifyVendor from './components/VerifyVendor/Verify.jsx';
import ProfileSettings from './components/ProfileSettings/ProfileSettings.jsx';
function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="main-container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element:
            <ProtectRoute><Home /></ProtectRoute>
          ,
        },
        {
          path: "/clients",
          element:
            <ProtectRoute><Clients /></ProtectRoute>
          ,
        },
        {
          path: "/coupons",
          element:
            <ProtectRoute><Coupons /></ProtectRoute>
          ,
        },
        {
          path: "/salesincome",
          element:
            <ProtectRoute><Orders /></ProtectRoute>
          ,
        },
        {
          path: "/products",
          element:
            <ProtectRoute><Products /></ProtectRoute>
          ,
        },
        // {
        //   path: "/Orders",
        //   element:
        //     <ProtectRoute><Products /></ProtectRoute>
        //   ,
        // },
        {
          path: "/dispach",
          element:
            <ProtectRoute><Dispach /></ProtectRoute>
          ,
        },
        {
          path: "/employees",
          element:
            <ProtectRoute><Employees /></ProtectRoute>
          ,
        },
        {
          path: "/departments",
          element:
            <ProtectRoute><Products /></ProtectRoute>
          ,
        },
        {
          path: "/bonuses",
          element:
            <ProtectRoute><Products /></ProtectRoute>
          ,
        },
        {
          path: "/settings",
          element:
            <ProtectRoute><ProfileSettings /></ProtectRoute>
          ,
        },
        {
          path: "/logout",
          element:
            <ProtectRoute><Products /></ProtectRoute>
          ,
        },
        {
          path: "/brands",
          element:
            <ProtectRoute><Users /></ProtectRoute>
          ,
        },
        {
          path: "/partners",
          element:
            <ProtectRoute><Users /></ProtectRoute>
          ,
        },
        {
          path: "/*",
          element:
            <div className="err">Error</div>
          ,
        }
      ]
    },
    {
      path: "/login",
      element:
        <ProtectedLoginRoute><LoginComponent /></ProtectedLoginRoute>
      ,
    },
    {
      path: "/register",
      element:
        <ProtectedRegiterRoute><Register /></ProtectedRegiterRoute>
      ,
    },
    {
      path: "/*",
      element:
        <div className="err">Error</div>
      ,
    },
  ])



  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        draggable
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        className={'toast-show'}
      />
    </>
  );
}

export default App;
