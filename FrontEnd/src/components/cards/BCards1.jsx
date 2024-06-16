import React from 'react'
import style from "./BCards1.module.css"
function BCards1() {
  return (
    <>	<div className={style["card"]}>
    <div className={style["imgBox"]}>
        <div className={style["bark"]}></div>
        <img src="https://image.ibb.co/fYzTrb/lastofus.jpg"/>
    </div>
    <div className={style["details"]}>
        <h4 className={`text-[26px] leading-[1px] font-amatic-sc ${style["color1"]}`}>You're not a Fossil! (YET)</h4>
        <h4 className={style["color2 margin h4"]}>(HAPPY BIRTHDAY)</h4>
        <p>Dear Dad,</p>
        <p>Let's see.. .</p>
        <p>You’re never around, you</p>
        <p>hate the music I’m into, you</p>
        <p>practically despise the movies I</p>
        <p>like, and yet somehow you still</p>
        <p>manage to be the best dad every year.</p>
        <p>How do you do that? :)</p>
        <p className={style["text-right"]}>Happy Birthday, papa!</p>
        <p className={style["text-right"]}>♥Sarah</p>
    </div>
</div></>
  )
}

export default BCards1