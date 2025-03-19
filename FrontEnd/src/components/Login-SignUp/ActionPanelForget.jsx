import style from "./Login.module.css";

const ActionPanelForget = ({ verifyEmail, slide,verifyOTP }) => {
  const heading = verifyOTP?"Verify OTP":verifyEmail ? "Hello Dear User!" : "Get OTP!";
  const paragraph = verifyOTP?"Enter Your New Passowrd and Submit for Login with us":verifyEmail
    ? "Enter your email to verify with us"
    : "Enter your OTP to verify with us";
  const button = verifyEmail ? "Sign up!" : "Sign in!";

  return (
    
    <div className={`${style['Panel']} ${style['ActionPanel']}`} style={{ background: '#2da99b' }}>
      <h2 className="text-[#ffffff]">{heading}</h2>
      <p className="text-[#ffffff]">{paragraph}</p>
      {!verifyOTP&&<button className="text-[#ffffff] border-[#ffff]" onClick={slide}>{button}</button>}   </div>
  );
};

export default ActionPanelForget;
