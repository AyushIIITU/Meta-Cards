import style from "./WCardBack.module.css"

function WCardBack() {
  return (
    <div className={style["container"]}>
    <img
      src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png"
      className="w-[25vh]"
    />
    <img
      src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png"
      className="w-[25vh] transform -scale-x-100 absolute top-0 right-0"
      alt="decorative corner"
    />

    <div className={style.invite}>
      <h1 className={style.h1}>Invitation</h1>
      <p className="text-[#c18435] font-lobster text-center font-size-14">
        We would be delighted with your attendance <br />
        at the wedding of{" "}
      </p>
      <h1 className={style.h1}>Rishvant</h1>
      <p className="text-[#c18435] font-lobster text-center font-size-14">
        D/O rotodina & rotodile
      </p>
      <h1 className={style.h1}>Nuunu</h1>
      <p className="text-[#c18435] font-lobster text-center font-size-14">
        S/O panda & pandoria
      </p>
      <hr className="mt-[0.5vh] w-[200px] border-none border-t-[0.5px] border-t-[#b57729] mx-auto" />

      <p className="text-[#c18435] font-lobster text-center font-size-14">
        Second day of Eid, 7:30 to Midnight, <br />
        The Levi Palace, karachi, Pakistan
      </p>
    </div>
    <img
      src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png"
      className="w-[25vh] transform -scale-y-100 absolute bottom-0 left-0"
    />
    <img
      src="https://res.cloudinary.com/areeba/image/upload/v1650490204/free-golden-deco-corner-clipart-photo-background-gold-corner-border-lace-pattern-text-graphics-transparent-png-1536307.png"
      className="w-[25vh] transform -scale-y-100 -scale-x-100 absolute bottom-0 right-0"
    />
  </div>
  )
}

export default WCardBack