import { useState } from "react";
import { SHARE } from "../../Utils/Share";
import { QRCodeCanvas } from "qrcode.react";
import { SlActionRedo } from "react-icons/sl";

function PublicShare({ data, key, children ,type}) {
        
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  const url = `${SHARE}/${type}/${data?._id}`;

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadQRCode = () => {
    const qrCanvas = document.querySelector('canvas');
    const qrImage = qrCanvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = qrImage;
    downloadLink.download = `QRCode_${data._id}.png`;
    downloadLink.click();
  };

  const handleShare = () => {
    setQrVisible(true);
    toggleModal();
  };

  return (
    <div key={key} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={handleShare}
        >
          <span className="sr-only">Open dropdown</span>
          <SlActionRedo />
        </button>
      </div>
      <div className="flex flex-col items-center pb-5">
        {children}
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          @{data.creater.name || "Deleted Account"}
        </h5>
      </div>
      {isModalOpen && (
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
                  onClick={closeModal}
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
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">URL</span>
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
    </div>
  );
}

export default PublicShare;
