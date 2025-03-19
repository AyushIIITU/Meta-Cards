import { Form } from "react-router-dom";
import "./FormPanel.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import stylee from "../Test/Otp2.module.css";
import { API } from "../../Utils/Apis";
import style from "./Login.module.css";
import { LoaderIcon } from "react-hot-toast";

const FormPanelForget = ({ verifyEmail, setVerifyEmail, verifyOTP, setVerifyOTP }) => {
  // const navigate = useNavigate();
  let heading = verifyEmail ? "Find your recovery email" : "Enter OTP";

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer state for resend button
  const [emailToBeSent, setEmailToBeSent] = useState(""); // Track the email for OTP
  const [registerData, setRegisterData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const refName = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refOTP = useRef("");
  const refPassword2 = useRef("");
  heading = verifyOTP ? "Verify OTP" : heading;

  



  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000); // Decrement timer every second
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendApiOtp = async () => {
    try {
      setLoading(true);

      const email = emailToBeSent || refEmail.current.value; // Use email from state or input field
      setEmailToBeSent(email); // Save the email for future OTPs

      const response = await axios.get(`${API}/api/sendOTP?email=${email}`);
      if (response.status === 200) {
        setRegisterData({
          name: refName.current.value,
          email: refEmail.current.value,
          password: refPassword.current.value,
        });
        setVerifyOTP(true);
        setVerifyEmail(false);
        setResendTimer(60); // Start 1-minute timer after sending OTP
      }
    } catch (err) {
      console.error("Error in sending OTP:", err);
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = async () => {
    if (verifyEmail) {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/api/sendOTP?email=${refEmail.current.value}`);
        if (response.status === 200) {
          setEmailToBeSent(refEmail.current.value);
          setVerifyOTP(true);
          setVerifyEmail(false);
          setResendTimer(60);
          }
        setLoading(false);
        // return navigate("/");
      } catch (err) {
        console.error("Error in sign in:", err);
        setErrorMessage("Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    } else {
      await sendApiOtp();
    }
  };

  

  const handleResend = async () => {
    if (resendTimer === 0) {
      await sendApiOtp();
    }
  };

  return (
    <div className={`${style["Panel"]} ${style["FormPanel"]}`}>
      <h2>{heading}</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {verifyOTP ? (
        <form
          style={{ backgroundColor: "transparent" }}
          onSubmit={handleOnClick}
          className={stylee["form-card"]}
        >
          <p className={stylee["form-card-title"]}>
            Please check your email for the confirmation code.
          </p>
          <p className={stylee["form-card-prompt"]}>Enter 6 digits of OTP</p>
          <div className={stylee["form-card-input-wrapper"]}>
            <input
              type="tel"
              ref={refOTP}
              maxLength="6"
              placeholder="______"
              style={{ width: "17rem", padding: "0" }}
              className={stylee["form-card-input"]}
            />
            <div className={stylee["form-card-input-bg"]}></div>
          </div>
          <div className="w-full flex mt-[4vh] flex-row items-center justify-between ">
            <button
              style={{ margin: "auto" }}
              onClick={handleResend}
              className={`cursor-pointer p-0-!important transition-all bg-blue-500 m-auto text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ${
                resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={resendTimer > 0} // Disable button if timer is active
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </button>
            <button
              type="submit"
              style={{ margin: "auto" }}
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Verify
            </button>
          </div>
        </form>
      ) : (
        <>
          <Form>
            {verifyEmail ? (
              <input
                type="email"
                ref={refEmail}
                placeholder="Email"
              />
            ) : (
              <>
                <input
                  type="text"
                  ref={refPassword}
                  placeholder="Password"
                />
                <input
                  type="text"
                  ref={refPassword2}
                  placeholder="Confirm Password"
                />
              </>
            )}
          </Form>
          <button onClick={handleOnClick} disabled={loading}>
            {loading ? <LoaderIcon /> : verifyEmail ? "Submit Email" : "Submit Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default FormPanelForget;
