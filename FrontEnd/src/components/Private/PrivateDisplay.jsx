// import Public from 'Public'
import { useEffect, useState } from "react";
// import CakeDemo from "../Demo/CakeDemo";
import { SHARE } from "../../Utils/Share";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { API } from "../../Utils/Apis";

function PrivateShare({type,data,handleDelete,children,handleOnLike}) {
  
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Private");
  useEffect(()=>{
    const option=data?.type;
    
    setSelectedOption(option);
    // console.log(selectedOption);
    
  },[])
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
const [isCopied, setIsCopied] = useState(false);
const [qrVisible, setQrVisible] = useState(false);

const url = selectedOption==="Public"?`${SHARE}/${type}/${data?._id}`:`${SHARE}/${type}/${data?._id}/${data?.tokenId}`;

const copyToClipboard = () => {
  navigator.clipboard.writeText(url)
    .then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    })
    .catch(() => {
    });
};

const toggleShareModal = () => {
  setIsShareModalOpen(!isShareModalOpen);
};

const closeShareModal = () => {
  setIsShareModalOpen(false);
};

const downloadQRCode = () => {
  const qrCanvas = document.querySelector('canvas');
  const qrImage = qrCanvas.toDataURL("image/png");
  const downloadLink = document.createElement('a');
  downloadLink.href = qrImage;
  downloadLink.download = `QRCode_${data?._id}.png`;
  downloadLink.click();
};

const handleShare = () => {
  setQrVisible(true);
  toggleShareModal();
};
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    // console.log(isModalOpen);
    setIsModalOpen(true);
  };
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const toggleModalDelete = () => {
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };
  // Step 3: Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeModal = () => {
    // console.log("oko");
    setSelectedOption(selectedOption==="Private"?"Public":"Private");
    setIsModalOpen(false);
  };
  const handleChangeVisibilty=async()=>{
    // e.preventDefault()
    try {
      // console.log(`${API}/api/${type}/change/${data?._id}/${selectedOption}`);
      // const reqOption=selectedOption==="Private"?"Public":"Private";
      // console.log(reqOption,selectedOption);
      
      const response=await axios.get(`${API}/api/${type}/change/${data?._id}/${selectedOption}`);
      if(response.status===200){
        setSelectedOption(selectedOption);
        setIsModalOpen(false);
      }
      
    } catch (err) {
      console.error(err);
      
    }
  }
    // console.log(selectedOption);
    // console.log(data);
    // console.log(e.target.value);
    // console.log(data?._id);
    // console.log(data?.tokenId);
    // console.log(data?.type);
    // console.log(data?.type

  return (
    <>
    {/* // Add this button inside your return statement for debugging */}
    {/* <button onClick={() => setIsModalOpen(!isModalOpen)}>Open Modal</button> */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            className={`absolute text-base list-none mt-6   bg-transparent divide-y divide-gray-100 rounded-lg shadow w-44`}
            style={{
              display: isDropdownOpen ? "block" : "none",
              zIndex:1,
              overflow: isDropdownOpen ? "visible" : "hidden",
              // top:isDropdownOpen?'4%':'100%
            }} // Adjust as needed
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <button
                onClick={handleShare}
                  className="w-full rounded-lg  bg-blue-600 px-4 py-2 text-sm text-white hover:text-blue-700 hover:bg-gray-100 "
                >
                  Share
                </button>
              </li>

              <li>
                <button
                onClick={toggleModalDelete}
                  className="w-full rounded-lg text-white bg-red-600 px-4 py-2 text-sm hover:text-red-600 hover:bg-gray-100 "
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center pb-5">
          {children}
          {/* <CakeDemo height={'100%'}/> */}
   
          <div className="flex mt-4 md:mt-6">
            <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  type="radio"
                  name="radio"
                  value="Private"
                  className="peer hidden"
                  checked={selectedOption === "Private"}
                  onChange={handleChange}
                />
                <span
                  className={`tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${
                    selectedOption === "Private"
                      ? "bg-gradient-to-r from-[blueviolet] to-[violet] text-white"
                      : ""
                  }`}
                >
                  Private
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  type="radio"
                  name="radio"
                  value="Public"
                  className="peer hidden"
                  checked={selectedOption === "Public"}
                  onChange={handleChange}
                />
                <span
                  className={`tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${
                    selectedOption === "Public"
                      ? "bg-gradient-to-r from-[blueviolet] to-[violet] text-white"
                      : ""
                  }`}
                >
                  Public
                </span>
              </label>
            </div>
          </div>
        </div>
        
      </div>
      {/* Modal Share */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative pt-[25%] h-[100vh] p-4 w-full xl:pt-[10%] max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Alert
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedOption==="Public"?"If you make this public then it will be displayed over all over the website and anyone can see your creation":"If you make this private then it will be viewed only by share url"}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                 Are you sure to make this chages
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                    
                  // data-modal-hide="default-modal"
                  type="button"
                  onClick={handleChangeVisibilty}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                onClick={closeModal}
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* // <!-- Modal Delete --> */}
      {isModalDeleteOpen && (
                <div
                    id="popup-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-lg max-h-full">
                        <div className="relative bg-white rounded-lg shadow ">
                            <button
                                type="button"
                                onClick={toggleModalDelete}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                    Are you sure you want to delete this creation?
                                </h3>
                                <button
                                    onClick={()=>handleDelete(data?._id)}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    Yes, I&apos;m sure
                                </button>
                                <button
                                    onClick={toggleModalDelete}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Share Modal */}
             {isShareModalOpen && (
        <div
          id="static-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Share
                </h3>
                <button
                  type="button"
                  onClick={closeShareModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 items-center flex flex-col">
                <div className="w-full max-w-sm">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600" style={{zIndex:1}}>URL</span>
                    <div className="relative w-full">
                      <input
                        id="website-url"
                        type="text"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={url}
                        readOnly
                        disabled
                      />
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
                      type="button"
                    >
                      <span id="default-icon" className={!isCopied ? 'inline-flex items-center' : 'hidden'}>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                      <span id="success-icon" className={isCopied ? 'inline-flex items-center' : 'hidden'}>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917L5.724 10.5 15 1.5" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                {qrVisible && (
                  <>
                    <QRCodeCanvas value={url} />
                    <button
                      onClick={downloadQRCode}
                      className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Download QR Code
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PrivateShare;
