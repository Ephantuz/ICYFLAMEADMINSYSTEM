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
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';


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
            <Home />
          ,
        },
        {
          path: "/clients",
          element:
            <Clients />
          ,
        },
        {
          path: "/coupons",
          element:
            <Coupons />
          ,
        },
        {
          path: "/salesincome",
          element:
            <Orders />
          ,
        },
        {
          path: "/products",
          element:
            <Products />
          ,
        },
        {
          path: "/Orders",
          element:
            <Products />
          ,
        },
        {
          path: "/dispach",
          element:
            <Dispach />
          ,
        },
        {
          path: "/employees",
          element:
            <Employees />
          ,
        },
        {
          path: "/departments",
          element:
            <Products />
          ,
        },
        {
          path: "/bonuses",
          element:
            <Products />
          ,
        },
        {
          path: "/Notes",
          element:
            <Products />
          ,
        },
        {
          path: "/logout",
          element:
            <Products />
          ,
        },
        {
          path: "/brands",
          element:
            <Users />
          ,
        },
        {
          path: "/partners",
          element:
            <Users />
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
        <Login />
      ,
    },
    {
      path: "/register",
      element:
        <Register />
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
    <RouterProvider router={router} />
  );
}

export default App;
