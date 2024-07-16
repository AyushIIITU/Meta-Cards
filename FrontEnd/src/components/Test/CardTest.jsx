import React from "react";
import "./CardTest.css";
// import WeddingEdits from '../Edits/WeddingEdits'
// import Cake from "../cakes/Cake";
import CakeDemo from "../Demo/CakeDemo";
function CardTest() {
  return (
    <>
      <article className="card flex flex-col text-black h-full card--checkbox group false false">
        <div className="card-content grow  ">
          <div className="absolute z-20 flex items-center left-1.5 top-[6px] gap-0.5"></div>
          <div className="clickable-wrapper">
            <div
              id="container"
              className="card__button-container relative z-[1]"
            >
              <style></style>
              <CakeDemo/>
            </div>
            <a className="fake-link" href="/milegelu/grumpy-wombat-18">
              Link to post
            </a>
          </div>
        </div>
        <div className="card__footer h-[28px]">
          <div className="">
           
          </div>
          <div className="flex items-center gap-1 card__views">
            <span>2.4K views</span>
            <form method="post" action="/favorites">
              <input
                type="hidden"
                name="postId"
                value="c4868176-ec31-43bb-aa2e-7406353cefa1"
              />
            </form>
          </div>
        </div>
      </article>
    </>
  );
}

export default CardTest;
