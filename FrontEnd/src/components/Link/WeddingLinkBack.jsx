import React from 'react'
import style from "../cards/WCardBack.module.css"
import { API } from '../../Utils/Apis';
function WeddingLinkBack({BackData}) {
    console.log(BackData);
    const Desing = `${API}/${BackData.IMG.replace(/\\/g, "/")}`;
  return (
   <>
    <div
              className={style.container}
              style={{
                color: BackData.Color,
                backgroundImage: `url(${Desing})`,
                backgroundPosition: "center",
              }}
            >
    <img
      src={BackData.Desing}
      className="w-[50%]"
    />
    <img
      src={BackData.Desing}
      className="w-[50%] transform -scale-x-100 absolute top-0 right-0"
      alt="decorative corner"
    />

<div className="flex flex-col  items-center relative top-[-34%]">
<h1
                    style={{ fontFamily: BackData.Font1}}
                    className={`text-center text-[45px]`}
                  >
                    {BackData.Headings[0]}
                  </h1>
                  <pre
                    style={{ fontFamily: BackData.Font2 }}
                    className={` text-center font-size-14`}
                  >
                    {BackData.Para[0]}
                  </pre>
      <h1
                    style={{ fontFamily: BackData.Font1}}
                    className={`text-center text-[45px]`}
                  >
                    {BackData.Headings[1]}
                  </h1>
                  <p
                     style={{ fontFamily: BackData.Font2 }}
                     className={` text-center font-size-14`}
                  >
                    {BackData.Para[1]}
                  </p>
      <h1
                    style={{ fontFamily: BackData.Font1}}
                    className={`text-center text-[45px]`}
                  >
                    {BackData.Headings[2]}
                  </h1>
                  
      <hr className="mt-[0.5vh] w-[200px] border-none border-t-[0.5px] border-t-[#b57729] mx-auto" />

      <pre
                    style={{ fontFamily: BackData.Font2 }}
                    className={` text-center font-size-14`}
                  >
                    {BackData.Para[2]}
                  </pre>
    </div>
    <img
      src={BackData.Desing}
      className="w-[50%] transform -scale-y-100 absolute bottom-0 left-0"
    />
    <img
      src={BackData.Desing}
      className="w-[50%] transform -scale-y-100 -scale-x-100 absolute bottom-0 right-0"
    />
  </div>
   
   </>
  )
}

export default WeddingLinkBack;