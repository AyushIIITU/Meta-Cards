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
// import WishEdits from "./components/Edits/WishEdits.jsx";
import WishEdits2 from "./components/Edits/WishEdits2.jsx";

import Test from "./components/Test/Test.jsx";
import WeddingEdits from "./components/Edits/WeddingEdits.jsx";


import Create from "./components/Create/Create.jsx";

import CardTest2 from "./components/Test/CardTest2.jsx";

import CardTest3 from "./components/Test/CardTest3.jsx";
import WeddingTest from "./components/Test/WeddingTest.jsx";
import WeddingLinkProvider from "./components/Link/WeddingLinkProvider.jsx";
import BTest from "./components/Test/BTest.jsx";
import WishLinkProvider from "./components/Link/WishLinkProvider.jsx";
// import Test3dCrousal from "./components/Test/Test3dCrousal.jsx";

// import TestCarousel from "./components/Test/TestCrousal.jsx";
import Cardtest4 from "./components/Test/Cardtest4.jsx";
import CardClub from "./components/Test/CardClub.jsx";
import WeddingTestCard from "./components/Test/weddingTestCard.jsx";
import CakeDemo from "./components/Demo/CakeDemo.jsx";
import WishTest from "./components/Test/WishTest.jsx";
import Home1 from "./components/Home/Home1.jsx";
// import PublicCake from "./components/Public Cards/PublicWish.jsx";
import PublicWish from "./components/Public Cards/PublicWish.jsx";
import PublicWedding from "./components/Public Cards/PublicWedding.jsx";
import PublicCake from "./components/Public Cards/PublicCake.jsx";
// import './input.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home1/>,
      },
      {
        path: "Create",
        element: <Create />,
      },
      {
        path: "editCake",
        element: <CakeEdits />,
      },
      {
        path: "editWishCard",
        element: <WishEdits2 />,
      },
      {
        path: "editWedding",
        element: <WeddingEdits />,
      },
      
      {
path:'public/gt',
element:<PublicWish/>
      }
      ,{
        path: "public/greetingCard",
        element: <WishTest />,
      },
      {
        path:"public/wed",
        element:<PublicWedding/>
      },
      {
        path:"public/gc",
        element:<PublicCake/>
      }
    ],
  },
  {
    path: "auth",
    element: <LogInSine />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/Ctest",
    element: <CardTest3 />,
  },
  {
    path: "/cardTest",
    element: <Cardtest4 />,
  },
  {
    path: "/weddingTest",
    element: <WeddingTestCard />,
  },
  {
    path: "/test7",
    element: <CardClub />,
  },
  {
    path: "Wtest",
    element: <WeddingTest />,
  },
  {
    path: "Btest",
    element: <BTest />,
  },
  // {
  //   path: "CCTest",
  //   element: <TestCarousel />,
  // },
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
    path: "/test2",
    element: <CardTest2 />,
  },

  {
    path: "/Wish",
    children: [
      {
        path: ":id",
        element: <WishLinkProvider />,
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
    path: "/Wedding",
    children: [
      {
        path: ":id",
        element: <WeddingLinkProvider />,
      },
    ],
  },
  {
    path: "fpicker",
    element: <FontPicker />,
  },

  {
    path: "otp",
    element: <Otp2 />,
  },
  {
    path: "dcake",
    element: <CakeDemo />,
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider/> */}
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
