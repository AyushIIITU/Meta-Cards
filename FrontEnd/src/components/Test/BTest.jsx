import React from 'react';
import { useNavigate } from 'react-router-dom';
import WishLink from '../Link/WishLink';

function BTest() {

  return (
    <div className="flex flex-col items-center space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full flex  border-solid border-red-400 border-4 justify-center">
          <div className="w-full max-w-[100vw]  sm:max-w-[75vw] sm:p-4 md:max-w-[60vw] md:p-6 lg:max-w-[50vw] lg:p-10 h-auto px-0">
            <WishLink id={"66786d53127746cdacc0fda5"} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BTest;
