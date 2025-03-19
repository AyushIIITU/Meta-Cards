import { useState } from "react";
import style from "./Login.module.css";
import ActionPanelForget from "./ActionPanelForget";
import FormPanelForget from "./FormPanelForget";

const ForgetPassword = () => {
  const [verifyEmail, setVerifyEmail] = useState(true);
  
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [transition, setTransition] = useState(false);

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

    if (verifyEmail) {
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });

      formPanel.style.borderRadius = "0 20px 20px 0";
      actionPanel.style.borderRadius = "20px 0 0 20px";
    } else {
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });

      formPanel.style.borderRadius = "20px 0 0 20px";
      actionPanel.style.borderRadius = "0 20px 20px 0";
    }

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = "none";
        child.style.transform = `translateX(${verifyEmail ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3}%)`;
      });

      setVerifyEmail(!verifyEmail);
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
      actionPanel.style.order = verifyEmail ? -1 : 1;

      setTransition(false);
    }, 700);
  };

  return (
    <div className={`w-[100vw] h-[100vh] ${style['container']} flex items-center`}>
      <div className={style["App"]}>
        <FormPanelForget verifyEmail={verifyEmail} setVerifyEmail={setVerifyEmail} verifyOTP={verifyOTP} setVerifyOTP={
          setVerifyOTP} />
        <ActionPanelForget verifyEmail={verifyEmail} slide={slide} verifyOTP={verifyOTP} />
      </div>
    </div>
  );
};

export default ForgetPassword;
