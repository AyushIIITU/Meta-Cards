// import React from "react";
import WCardBack from "./WCardBack";
import WCardFront from "./WCardFront";
import style from "./WCards2.module.css";
function WCards2() {
  return (
    <>
      <div className={style["wedding-card"]}>
        <WCardFront/>
        <WCardBack/>
      </div>
    </>
  );
}

export default WCards2;
