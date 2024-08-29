
import { API } from "../../Utils/Apis";
import style from "../cards/BCards1.module.css";

function WishDisplay({data,height}) {
  return (
    <div
    style={{
      backgroundImage: `url(${API}/${data.WishBackGroundIMG.replace(
        /\\/g,
        "/"
      )})`,
      height: height ? height : "100vh",
    }}
    className="bg-cover flex justify-center items-center w-full bg-center bg-no-repeat object-contain overflow-auto"
  >
    <div
      style={{
        color: `${data?.l1}`,
        backgroundColor: `${data?.l2}`,
      }}
      className={style.card}
    >
      <div className={style.imgBox}>
        <div className={style.bark}></div>
        <img
          style={{ minWidth: "300px" }}
          className=" w-full h-full object-cover"
          src={`${API}/${data.WishFrontIMG.replace(/\\/g, "/")}`}
          alt="Card"
        />
      </div>
      <div className={style.details}>
        {data.Wish?.Header?.map((he, index) => (
          <h4 key={index} className={`${style.color1} h4`}>
            {he}
          </h4>
        ))}
        {data.Wish?.Body?.map((B, index) => (
          <p key={index}>{B}</p>
        ))}
        {data.Wish?.Footer?.map((F, index) => (
          <p key={index} className="text-right">
            {F}
          </p>
        ))}
      </div>
    
    </div>
    
  </div>
  )
}

export default WishDisplay