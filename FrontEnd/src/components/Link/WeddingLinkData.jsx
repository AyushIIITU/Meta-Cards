import { useState } from "react";
import { SHARE } from "../../Utils/Share";
import QRCode from "qrcode.react";
import WeddingLinkFront from "./WeddingLinkFront";
import WeddingLinkBack from "./WeddingLinkBack";
function WeddingLinkData({ data, height,ind }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [qrVisible, setQrVisible] = useState(false);
  const url=`${SHARE}/wedding/${data._id}`;
  const handleShare=async()=>{
    
    setQrVisible(true);
  }
  return (
    <div key={ind} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`absolute z-20 text-base list-none mt-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          style={{
            display: isDropdownOpen ? "block" : "none",
            overflow: isDropdownOpen ? "visible" : "hidden",
          }}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <button
                onClick={handleShare}
                className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Share
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-5" >
      <div
            style={{
              backgroundImage: `url(${data.WeddingBackGroundIMG.replace(/\\/g, "/")}})`,
              height: height ?height: '100vh'  
            }}
            className="bg-cover flex items-center w-full bg-center bg-no-repeat object-contain overflow-hidden"
          >
             <div
    className="relative w-[500px] max-w-[90vw] h-[500px] max-h-[90vh] min-h-[250px] min-w-[250px] mx-auto"
    style={{ perspective: "1000px" }}
  >
              {/* <WCardFront/> */}
              {data.Front && <WeddingLinkFront FrontData={data.Front} />}
              

              {data.Back && <WeddingLinkBack BackData={data.Back} />}
            </div>
          </div>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              @{data.creater.name||"Deleted Account"}
            </h5>
      </div>
      {qrVisible && <QRCode value={url} />}
    </div>
  );
}

export default WeddingLinkData;
