import React, { useState } from 'react'
import WishLink from '../Link/WishLink';

function WishTest() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Private");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setIsModalOpen(true);
    };
  
    // Step 3: Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeModal = () => {
      setSelectedOption(selectedOption==="Private"?"Public":"Private");
      setIsModalOpen(false);
    };
    return (
      <>
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
              className={`absolute z-20 text-base list-none mt-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{
                display: isDropdownOpen ? "block" : "none",
  
                overflow: isDropdownOpen ? "visible" : "hidden",
                // top:isDropdownOpen?'4%':'100%
              }} // Adjust as needed
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Share
                  </a>
                </li>
  
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="flex flex-col items-center pb-5">
        <WishLink/>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
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
                    If you make this public then it will be displayed over all over the website and anyone can see your creation
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                   Are you sure to send make this chages
                  </p>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                      
                    data-modal-hide="default-modal"
                    type="button"
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
        {/* // <!-- Main modal --> */}
      
      </>
    );
}

export default WishTest