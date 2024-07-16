import React from "react";
import WeddingLink from "../Link/WeddingLink";

function WeddingTest() {
  return (
    <div className="flex flex-col items-center">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full flex justify-center my-4 ">
          <div className="w-full max-w-[90vw] sm:max-w-[75vw] md:max-w-[60vw] lg:max-w-[50vw] h-full px-4">
            <WeddingLink id={"667dc05b527d5369b1e0d22c"} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeddingTest;
