
import style from "./Error404.module.css"
function Error404() {
  return (
    /* From Uiverse.io by eslam-hany */ 
    <div className="flex flex-col ">
    
 <div className={style["book"]}>
 <p className="font-bold text-[20px] ">404 NOT FOUND</p>
 <div className={style["cover"]}>
 <p className="font-bold text-[20px] ">There is No Card Avilable try to create</p>
 </div>
</div>
<div className="text-center text-wrap font-sans text-8xl">404 - NOT FOUND😵</div>
</div>

  )
}

export default Error404