import { useState } from "react";
import ActionPanel from "./ActionPanel";
import FormPanel from "./FormPanel";
import style from "./Login.module.css";

const LogInSine = () => {
  const [signIn, setSignIn] = useState(true);
  
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [transition, setTransition] = useState(false);
  console.log(window.innerWidth)
  const slide = () => {
    if (transition) return;

    const formPanel = document.querySelector(`.${style['FormPanel']}`);
    const actionPanel = document.querySelector(`.${style['ActionPanel']}`);
    const actionPanelChildren = actionPanel.children;

    const formBoundingRect = formPanel.getBoundingClientRect();
    const actionBoundingRect = actionPanel.getBoundingClientRect();

    formPanel.style.transition = "all 0.7s cubic-bezier(.63,.39,.54,.91)";
    actionPanel.style.transition = "all 0.7s cubic-bezier(.63,.39,.54,.91)";
    [...actionPanelChildren].forEach(
      (child) => (child.style.transition = "all 0.35s cubic-bezier(.63,.39,.54,.91)")
    );

    setTransition(true);

    if (signIn) {
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });
      console.log(window.innerWidth)
      if(window.innerWidth < 640){
        formPanel.style.borderRadius = "0px 0 20px 20px";
        actionPanel.style.borderRadius = "0 0px 20px 20px";
      } else {
        formPanel.style.borderRadius = "20px 0 0 20px";
        actionPanel.style.borderRadius = "20px 0px 0px 20px";}
    } else {
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });
      if(window.innerWidth < 640){
        formPanel.style.borderRadius = "0px 0 20px 20px";
        actionPanel.style.borderRadius = "0 0px 20px 20px";
      } else {
        formPanel.style.borderRadius = "20px 0 0 20px";
        actionPanel.style.borderRadius = "0 20px 20px 0";}
      
    }

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = "none";
        child.style.transform = `translateX(${signIn ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3}%)`;
      });

      setSignIn(!signIn);
    }, 350);

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = "all 0.35s cubic-bezier(.63,.39,.54,.91)";
        child.style.transform = `translateX(0)`;
        child.style.opacity = 1;
        child.style.visibility = "visible";
      });
    }, 400);

    setTimeout(() => {
      formPanel.style.transition = "none";
      actionPanel.style.transition = "none";
      formPanel.style.transform = "translate(0)";
      actionPanel.style.transform = "translate(0)";
      actionPanel.style.order = signIn ? -1 : 1;

      setTransition(false);
    }, 700);
  };

  return (
    <div className={`w-[100vw] h-[100vh] ${style['container']} flex items-center`}>
      <div className={style["App"]}>
        <FormPanel signIn={signIn} setSignIn={setSignIn} verifyOTP={verifyOTP} setVerifyOTP={
          setVerifyOTP} />
        <ActionPanel signIn={signIn} slide={slide} verifyOTP={verifyOTP} />
      </div>
    </div>
  );
};

export default LogInSine;
