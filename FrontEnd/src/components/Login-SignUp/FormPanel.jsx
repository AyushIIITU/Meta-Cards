import { Form, useNavigate } from "react-router-dom";
import "./FormPanel.css";
import { useRef, useState } from "react";
import axios from 'axios';
import stylee from "../Test/Otp2.module.css";
import { API } from "../../Utils/Apis";
import style from "./Login.module.css";

const FormPanel = ({ signIn, setSignIn,verifyOTP,setVerifyOTP }) => {
  const navigate = useNavigate();
  let heading = signIn ? "Sign in" : "Create account";
  const [verifyEmail,setVerifyEmail]=useState(false);
  const refName = useRef('');
  const refEmail = useRef('');
  const refPassword = useRef('');
  const [registerData, setRegisterData] = useState({});
  const refOTP = useRef('');
  // const [verifyOTP, setVerifyOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  heading = verifyOTP ? "Verify OTP" : heading;

  const inputs = [
    { type: "text", placeholder: "Email", ref: refEmail },
    { type: "password", placeholder: "Password", ref: refPassword }
  ];

  if (!signIn) {
    inputs.unshift({
      type: "text",
      placeholder: "Name",
      ref: refName
    });
  }

  const sendApiOtp = async () => {
    try {
      const response = await axios.get(`${API}/api/sendOTP?email=${refEmail.current.value}`);
      if (response.status === 200) {
        setRegisterData({ name: refName.current.value, email: refEmail.current.value, password: refPassword.current.value });
        setVerifyOTP(true);
      }
    } catch (err) {
      console.error("Error in sending OTP", err);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleOnClick = async () => {
    if (signIn) {
      try {
        const response = await axios.post(`${API}/api/user/login`, {
          email: refEmail.current.value,
          password: refPassword.current.value
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('UserID', response.data.id);
        localStorage.setItem('UserName', response.data.user);
        navigate('/');
      } catch (err) {
        console.error("Error in sign in", err);
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } else {
      await sendApiOtp();
    }
  };

  const handleOTPV = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/api/register`, { data: registerData, otp: refOTP.current.value });
      if (response.status === 200) {
        setVerifyOTP(false);
        setSignIn(true);
        setErrorMessage('');
      }
    } catch (err) {
      console.error("Error in OTP verification", err);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    await sendApiOtp();
  };

  const handleOnForget = () => {
    setVerifyOTP(true);
  };

  return (
    <div className={`${style['Panel']} ${style['FormPanel']}`}>
      <h2>{heading}</h2>
      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {verifyOTP ? (verifyEmail?
        <form style={{ backgroundColor: 'transparent' }} onSubmit={handleOTPV} className={stylee["form-card"]}>


          <p className={stylee["form-card-title"]}>Please check your email for the confirmation code.</p>
          <p className={stylee["form-card-prompt"]}>Enter 6 digits of OTP</p>
          <div className={stylee["form-card-input-wrapper"]}>
            <input 
              type="tel" 
              ref={refOTP} 
              maxLength="6" 
              placeholder="______" 
              style={{ width: '17rem', padding: '0' }} 
              className={stylee["form-card-input"]}
            />
            <div className={stylee["form-card-input-bg"]}></div>
          </div>
          <div className="w-full flex mt-[4vh] flex-row items-center justify-between ">
            <button type="button" style={{ margin: 'auto' }} onClick={handleResend} className="cursor-pointer transition-all bg-blue-500 m-auto text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Resend
            </button>
            <button type="submit" style={{ margin: 'auto' }} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Verify
            </button>
          </div>
        </form>:<form>
          <div className="flex flex-col gap-4">
            <input type="text" ref={refEmail} placeholder="Email" className={stylee["form-card-input"]} />

            <button onClick={() => setVerifyEmail(true)} className="cursor-pointer">Verify</button>
          </div>
        </form>
      ) : (
        <>
          <Form>
            {inputs.map(({ type, placeholder, ref }) => (
              <input type={type} key={placeholder} ref={ref} placeholder={placeholder} />
            ))}
          </Form>
          <p onClick={handleOnForget} className="cursor-pointer">Forgot your password?</p>
          <button onClick={handleOnClick}>{signIn ? "Sign in" : "Sign up"}</button>
        </>
      )}
    </div>
  );
};

export default FormPanel;
