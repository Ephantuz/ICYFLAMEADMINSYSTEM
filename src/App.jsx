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
import AdminPayments from './Components/AdminPayments/AdminPayments.jsx'
import TermsAndConditions from './Components/TermAndConditions/TermAndConditions.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedLoginRoute from './Private/ProtectedLoginRoute.jsx';
import ProtectedRegiterRoute from './Private/ProtectedRegiterRoute.jsx';
import ProtectRoute from './Private/ProtectRoute.jsx';
import OnboardingProtectRoute from './Private/ProtectOnboardingRoute.jsx';

import LoginComponent from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import VerifyVendor from './Components/VerifyVendor/Verify.jsx';
import ProfileSettings from './Components/ProfileSettings/ProfileSettings.jsx';
import HandlePayments from './Components/HandlePayments/HandlePayments.jsx';
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
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          {/* <OnboardingProtectRoute> */}
            <Layout />
          {/* </OnboardingProtectRoute> */}
        </ProtectRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/clients",
          element: <Clients />,
        },
        {
          path: "/coupons",
          element: <Coupons />,
        },
        {
          path: "/adminpayments",
          element: <AdminPayments />,
        },
        {
          path: "/processpayments",
          element: <HandlePayments />,
        },
        {
          path: "/salesincome",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/dispach",
          element: <Dispach />,
        },
        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/departments",
          element: <Products />,
        },
        {
          path: "/bonuses",
          element: <Products />,
        },
        {
          path: "/settings",
          element: <ProfileSettings />,
        },
        {
          path: "/logout",
          element: <Products />,
        },
        {
          path: "/brands",
          element: <Users />,
        },
        {
          path: "/partners",
          element: <Users />,
        },
        {
          path: "/*",
          element: <div className="err">Error</div>,
        },
      ],
    },
    {
      path: "/onboarding",
      element: <TermsAndConditions />,
    },
    {
      path: "/login",
      element: <ProtectedLoginRoute><LoginComponent /></ProtectedLoginRoute>,
    },
    {
      path: "/register",
      element: <ProtectedRegiterRoute><Register /></ProtectedRegiterRoute>,
    },
    {
      path: "/shop/activation/:token",
      element: <VerifyVendor />,
    },
    {
      path: "/*",
      element: <div className="err">Error</div>,
    },
  ]);




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
