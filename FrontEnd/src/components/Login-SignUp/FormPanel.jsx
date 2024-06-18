import { Form, Link } from "react-router-dom";
import "./FormPanel.css";
import { useState } from "react";
// import Otp from "../../../../BackEnd/models/Otp";
import Otp2 from "../Test/Otp2";
const FormPanel = ({ signIn }) => {
    let heading = signIn ? "Sign in" : "Create account";
    const [verifyOTP,setVerifyOTP]=useState(true);
    heading=verifyOTP?"Varify OTP":heading;
    const inputs = [
      {
        type: "text",
        placeholder: "Email",
        name:"Email"
      },
      {
        type: "password",
        placeholder: "Password",
        name:"Password"
      },
    ];
  
    if (!signIn) {
      inputs.unshift({
        type: "text",
        placeholder: "Name",
        name:"Name"
      });
    }
    
    const button = signIn ? "Sign in" : "Sign up";
    const handleOnClick=async ()=>{
      if(signIn){
        //sign in logic
        console.log(signIn);
      }
      else{
        //sign up logic

      }
    }
    return (
      <div className="Panel FormPanel">
        <h2>{heading}</h2>
    
        {/* <p>{paragraph}</p> */}
        {
  verifyOTP ? (
    <><Otp2/>
    <div className="w-full flex flex-row items-center justify-between "><button style={{margin:'auto'}}  className="cursor-pointer transition-all bg-blue-500 m-auto  text-white px-6 py-2 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
      Resend
    </button>
    <button style={{margin:'auto'}} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
      Verify
    </button>
    </div></>
  ) : (
    <>
      <Form>
        {inputs.map(({ type, placeholder, name }) => (
          <input type={type} key={placeholder} name={name} placeholder={placeholder} />
        ))}
      </Form>
      <Link to="#">Forgot your password?</Link>
      <button onClick={handleOnClick}>{button}</button>
    </>
  )
}

        
      </div>
    );
  };
  export default FormPanel;