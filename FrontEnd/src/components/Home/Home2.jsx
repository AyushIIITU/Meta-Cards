// import React from 'react'
// import LottieAnimation from "../Common/LottieAnimation"
import { Link } from "react-router-dom"
import TestCarousel from "../Test/TestCrousal"
import style from "./Home.module.css"
// import Home2 from "./Home2";
// import animation1 from "../../Content/Lottie/Animation - 1725210958916.json"
function Home2() {
  return (<>
  
     <div className={`${style["content"]} bg-primary`}>
    <div className={style["container"]}>
      <div className={style["info"]}>
      <h1 className="text-blue-700 text-7xl">A virtual Cards</h1>
      <p className="text-dark text-lg">
            In this website you can create a virtual card which can be sent on
            ocassions
          </p>
          
          <h1 className="text-blue-400 text-4xl">Welcome to Meta Cards</h1>
          <h4 className="text-2xl">Here You can Cretae your own custom cards for occasions</h4>

    {/* <Home2/> */}           <Link to="/editcake"  className={style["button2"]}>   Get Started</Link>
      </div>
      <div className={style["image"]}>
        <TestCarousel/>
        {/* <LottieAnimation path={animation1}/> */}
        {/* <img className={style["main-image"]} src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp"/> */}
      </div>
    </div>
  </div>
  {/* <Home2/> */}
  </>
  )
}

export default Home2