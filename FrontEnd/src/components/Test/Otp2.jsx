import React from 'react'
import stylee from "./Otp2.module.css"
function Otp2() {
  return (
    <>
  {/* <div className="design-container"> */}
 
   
    
    <form style={{backgroundColor:'transparent'}} className={stylee["form-card"]}>
      <p className={stylee["form-card-title"]}>Please check your email for the confirmation code.</p>
      <p className={stylee["form-card-prompt"]}>Enter 6 digits of otp</p>
      <div className={stylee["form-card-input-wrapper"]}>
        <input type="tel" maxLength="6" placeholder="______" style={{width:'17rem',padding:'0'}} className={stylee["form-card-input"]}/>
        <div className={stylee["form-card-input-bg"]}></div>
      </div>
      
      {/* <button className="form-card-submit" type="submit">submit</button> */}

    </form>
  {/* </div> */}


  

</>
  )
}

export default Otp2