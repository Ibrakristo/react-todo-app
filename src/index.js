import React from "react";
import ReactDOM from "react-dom";
import Login from './components/Account/App';
import Task from './components/Tasks/App';
import { ValidUserContextProvider } from "./components/Account/authCheck";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children:[
      {index:true,element:<Login/>},
      {path:"/login",
      element:<Login/>,
      
    
    
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
