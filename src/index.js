import React from "react";
import ReactDOM from "react-dom";
import Login from './components/Account/Login';
import Task from './components/Tasks/App';
import Register from './components/Account/Register'
import Home from './components/home/home'
import { ValidUserContextProvider } from "./components/Account/authCheck";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children:[
      {index:true,element:<Home/>}
      ,
      {path:"login",
      element:<Login/>,
    },
    {
      path:"register",
      element:<Register/>
    }


    ]
  },
]);

ReactDOM.render(
  <React.StrictMode>
  <ValidUserContextProvider>
    <RouterProvider router={router} />
  </ValidUserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
