import React from 'react'
import style from "./WCards2.module.css"
function WCards2() {
  return (
    <>
    <div className={style["wedding-card"]}>
	<div className={style["cover"]}>
		<img src="https://res.cloudinary.com/areeba/image/upload/v1650491336/Pngtree_golden_line_mandala_pattern_decorative_5960487.png" className={style["cover-style"]} />
		{/* <h1 className="cover-heading">Noor & Osama</h1> */}
	</div>
	<div className={style["container"]}>
		<img src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png" className={style["border-1"]} />
		<img src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png" className={style["border-2"]} />
		<div className={style["invite"]}>
			<h1 className={style.h1}>Invitation</h1>
			<p className={style.p}>We would be delighted with your attendance <br/>at the wedding of </p>
			<h1 className={style.h1}>Noor</h1>
			<p className={style.p}>D/O rotodina & rotodile</p>
			<h1 className={style.h1}>Osama</h1>
			<p className={style.p}>S/O panda & pandoria</p>
			<hr/>
			<p className={style.p}>Second day of Eid, 7:30 to Midnight, <br/>The Levi Palace, karachi, Pakistan</p>
		</div>
		<img src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png" className={style["border-3"]}/>
		<img src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png" className={style["border-4"]} />
	</div>
</div></>
  )
}

export default WCards2