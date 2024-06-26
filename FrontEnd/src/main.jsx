import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Privew from "./components/Preview/Privew.jsx";
import BCards1 from "./components/cards/BCards1.jsx";
import Cake from "./components/cakes/Cake.jsx";
import WCards2 from "./components/cards/WCards2.jsx";
import CakeEdits from "./components/Edits/CakeEdits.jsx";
import FontPicker from "./components/Test/FontPicker.jsx";
import CakeLink from "./components/Link/CakeLink.jsx";
import CakeDisplay from "./components/cakes/CakeDisplay.jsx";
import LogInSine from "./components/Login-SignUp/Login.jsx";
import Otp2 from "./components/Test/Otp2.jsx";
import WishEdits from "./components/Edits/WishEdits.jsx";
import WishEdits2 from "./components/Edits/WishEdits2.jsx";
import WishLink from "./components/Link/WishLink.jsx";
// import ImageTest from "./components/Test/ImageTest.jsx";
import Test from "./components/Test/Test.jsx";
import WeddingEdits from "./components/Edits/WeddingEdits.jsx";
import Test2 from "./components/Test/Test2.jsx";
import { ThemeProvider } from "@material-tailwind/react";
// import './input.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{
    path:'/test',
    element:<Test/>
  },
  {
    path: "/preview",

    children: [
      {
        path: "",
        element: <Privew />,
      },
      {
        path: "FormalCard",
        element: <BCards1 />,
      },
      {
        path: "Birthday",
        element: <Cake />,
      },
      {
        path: "Wedding",
        element: <WCards2 />,
      },
    ],
  },
  {
    path: "/editWishCard",
    element: <WishEdits />,
  },
  {
    path: "/editWishCard2",
    element: <WishEdits2 />,
  },
  {
    path:"/editWedding",
    element:<WeddingEdits/>
  },
{
  path:'/test2',
  element:<Test2/>
},
  {
    path: "editCake",
    element: <CakeEdits />,
  },
  {
    path: "/Wish",
    children: [
      {
        path: ":id",
        element: <WishLink />,
      },
    ],
  },
  {
    path: "/Cake",
    children: [
      {
        path: "",
        element: <CakeDisplay />,
      },
      {
        path: ":id",
        element: <CakeLink />,
      },
    ],
  },
  {
    path: "fpicker",
    element: <FontPicker />,
  },
  {
    path: "laa",
    element: <LogInSine />,
  },
  {
    path: "otp",
    element: <Otp2 />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <ThemeProvider/>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
    
  </React.StrictMode>
);
