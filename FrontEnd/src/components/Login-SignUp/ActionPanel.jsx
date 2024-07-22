import style from "./Login.module.css";

const ActionPanel = ({ signIn, slide }) => {
  const heading = signIn ? "Hello friend!" : "Welcome back!";
  const paragraph = signIn
    ? "Enter your personal details and start your journey with us"
    : "To keep connected with us please login with your personal info";
  const button = signIn ? "Sign up!" : "Sign in!";

  return (
    <div className={`${style['Panel']} ${style['ActionPanel']}`} style={{ background: '#2da99b' }}>
      <h2 className="text-[#ffffff]">{heading}</h2>
      <p className="text-[#ffffff]">{paragraph}</p>
      <button className="text-[#ffffff] border-[#ffff]" onClick={slide}>{button}</button>
    </div>
  );
};

export default ActionPanel;
