import { Outlet } from "react-router-dom";
import Header from "./components/Common/Header";

function App() {
  return (
    <>
    {/* // <div className="w-full h-full bg-gradient-to-r from-black via-black to-gray-500"> */}
      <Header />
      <Outlet />
    {/* // </div> */}
    </>
  );
}

export default App;
