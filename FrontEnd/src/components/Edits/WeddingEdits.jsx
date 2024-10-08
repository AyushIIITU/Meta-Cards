import { useState } from "react";
import style from "./WeddingEdits.module.css";
import { API } from "../../Utils/Apis";
import Crousal3 from "../Common/Crousal3";
import { BorderDesine, CornerDesine } from "../../Constants/DesingConstants";
import FontPicker from "../Test/FontPicker";
import { fonts } from "../../Utils/Fonts";
import { TbCloudUpload } from "react-icons/tb";
import stylee from './WishEdit2.module.css'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function WeddingEdits() {
  const navigate = useNavigate();
  const [textColour, setTextColour] = useState("#c18435");
  const [textFrontColour, setTextFrontColour] = useState("#c18435");
  const [coverImage, setCoverImage] = useState(null);
  const [coverBackGround, setBackGround] = useState(null);
  const [frontGround, setFrontGround] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Private');
  const [coverImageDisplay, setCoverImageDisplay] = useState();
  const [coverBackGroundDisplay, setCoverBackGroundDisplay] = useState();
  const [selectedFont, setSelectedFonts] = useState(fonts[0].value);
  const [selectedHeadFont, setSelectedHeadFonts] = useState(fonts[8].value);
  const [frontFont, setFrontFont] = useState(fonts[0].value);
  const [head1, setHead1] = useState("Invitation");
  const [head2, setHead2] = useState("BrideName");
  const [head3, setHead3] = useState("GroomName");
  const [frontText, setFrontText] = useState("BrideName & GroomName");
  const [p1, setp1] = useState(
    "We would be delighted with your attendance\nat the wedding of"
  );
  const [p2, setp2] = useState("D/O rotodina & rotodile");
  const [p3, setp3] = useState(
    "S/O panda & pandoria\nSecond day of Eid, 7:30 to Midnight,\nThe Levi Palace, karachi, Pakistan"
  );

  const [editable, setEditable] = useState(false);
  const [editableFront, setEditableFront] = useState(false);
  const [scale, setScale] = useState(1);
  const handleTextChange = (e, setChange) => {
    // if (e.key === "Enter") {
    //   setChange((prev) => prev + '\n');
    // } else {
    setChange(e.target.value);
    // }
  };
  const [coverFrontGroundDisplay, setCoverFrontGroundDisplay] = useState(null);

  const handleFileUpload = (e, set1, set2) => {
    const file = e.target.files[0];
    // console.log("file", file);
    if (file) {
      set1(file);
      // setCoverBackGroundDisplay(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        set2(`url(${reader.result})`);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   // console.log("file", file);
  //   if (file) {
  //     setCoverImage(file);

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setCoverImageDisplay(`url(${reader.result})`);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleEdit = () => {
    setEditable(true);
  };
  const handleEditFront = () => {
    setEditableFront(true);
  };
  const handleSaveLine = () => {
    console.log("Save");
    setEditable(false);
  };
  const handleSaveLineFront = () => {
    console.log("Save");
    setEditableFront(false);
  };
  const [desing, setDesing] = useState(
    "http://localhost:3000/uploads/Static/d4.png"
  );
  const [borderDesing, setBorderDesing] = useState(
    "http://localhost:3000/uploads/Static/f8.png"
  );
  const handleSelectBorderDesing = (desing) => {
    setBorderDesing(desing);
    console.log("Selected border", desing);
  };
  const handleSelectDesing = (design) => {
    setDesing(design);
    console.log("Selected design:", design);
  };
  const handleScale = (e) => {
    console.log(e.target.value);
    setScale(parseFloat(e.target.value));
  };
  const handleWeddingSubmit = async () => {
    try {
      const data = {
        WeddingBackGroundIMG: coverBackGround,
        WeddingFrontIMG: frontGround,
        WeddingBackIMG: coverImage,
        f1: frontFont,
        f2: selectedHeadFont,
        f3: selectedFont,
        c1: textFrontColour,
        c2: textColour,
        d1: borderDesing,
        d2: desing,
        s1: scale,
        l1: frontText,
        l2: [head1, head2, head3],
        l3: [p1, p2, p3],
        creater:localStorage.getItem('UserID'),
        type:selectedTab
      };
      console.log(data);
      const response = await axios.post(`${API}/api/wedding`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status===201){
        toast.success("Wedding Card is Created");
      }
      navigate("/");
    } catch (err) {
      console.error("Error in Wedding", err);
    }
  };
  return (
    <div
      style={{ backgroundImage: coverBackGroundDisplay }}
      className="bg-cover min-h-screen bg-center bg-no-repeat object-contain "
    >
      <div className="flex flex-wrap justify-around">
        <div className="flex flex-col flex-wrap items-center">
        <div
  className="w-full max-w-[500px] h-[500px] bg-center bg-no-repeat overflow-x-auto overflow-y-hidden object-contain bg-cover relative"
  style={{ backgroundImage: coverFrontGroundDisplay }}
>
  <img src={borderDesing} className="w-full max-w-[500px]" />
  <div
    className="absolute inset-0 flex justify-center items-center"
    style={{ fontFamily: frontFont }}
  >
    {editableFront ? (
      <input
        type="text"
        className="text-center w-[80%] bg-transparent"
        onChange={(e) => setFrontText(e.target.value)}
        defaultValue={frontText}
        style={{
          color: textFrontColour,
          fontSize: `${scale}rem`, // Use rem instead of vh for better scaling
        }}
      />
    ) : (
      <h1
        className="text-center"
        style={{
          color: textFrontColour,
          fontSize: `${scale}rem`, // Use rem instead of vh
        }}
      >
        {frontText}
      </h1>
    )}
  </div>
</div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={
                editableFront
                  ? handleSaveLineFront
                  : () => {
                      handleEditFront();
                    }
              }
            >
              {editableFront ? "Save" : "Edit"}
            </button>
            {editableFront && (
              <>
                <FontPicker
                  selectedFont={frontFont}
                  setSelectedFont={setFrontFont}
                />
                <label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="0.1"
                    defaultValue={scale}
                    onChange={handleScale}
                  />
                </label>
                <input
                  type="color"
                  defaultValue={textFrontColour}
                  onChange={(e) => {
                    setTextFrontColour(e.target.value);
                  }}
                />
                <label
                  htmlFor="FrontImage"
                  className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-1.5 text-gray-700 cursor-pointer"
                >
                  <span>
                    <TbCloudUpload />
                  </span>
                  <p>
                    drag and drop your file here or click to select a file! to
                    Change BackeGround Image
                  </p>
                </label>
                <input
                  id="FrontImage" // Ensure the id matches the htmlFor attribute of the label
                  type="file"
                  accept=".png, .gif, .jpeg, .jpg"
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      setFrontGround,
                      setCoverFrontGroundDisplay
                    )
                  }
                  className="hidden" // No need for max-width on hidden input
                />
              </>
            )}
          </div>
          <div className="w-[50vw] min-w-[300px]">
            <Crousal3
              Image={BorderDesine}
              handleSelectDesing={handleSelectBorderDesing}
            />
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center">
          <div className="w-[500px] h-[500px]">
            <div
              className={style.container}
              style={{
                color: `${textColour}`,
                backgroundImage: coverImageDisplay,
                backgroundPosition: "center",
              }}
            >
              <img src={desing} className="w-[50%]" alt="decorative corner" />
              <img
                src={desing}
                className="w-[50%] transform -scale-x-100 absolute top-0 right-0"
                alt="decorative corner"
              />
              <div className="flex flex-col  items-center relative top-[-34%]">
                {editable ? (
                  <input
                    type="text"
                    className={` font-laFlibustiere text-center bg-transparent text-[45px]`}
                    onChange={(e) => setHead1(e.current.value)}
                    defaultValue={head1}
                    style={{ fontFamily: selectedHeadFont }}
                  />
                ) : (
                  <h1
                    style={{ fontFamily: selectedHeadFont }}
                    className={` font-laFlibustiere text-center text-[45px] bg-transparent`}
                  >
                    {head1}
                  </h1>
                )}
                {editable ? (
                  <textarea
                    type="text"
                    className={` font-lobster  resize-none mt-[1px] w-[75%] text-center bg-transparent font-size-14 z-10`}
                    onChange={(e) => handleTextChange(e, setp1)}
                    rows={2}
                    defaultValue={p1}
                    style={{ fontFamily: selectedFont }}
                  />
                ) : (
                  <pre
                    style={{ fontFamily: selectedFont }}
                    className={` text-center font-size-14`}
                  >
                    {p1}
                  </pre>
                )}
                {/* {editable ? (
            <input
              type="text"
              className=" font-lobster w-[75%] text-center font-size-14"
              onChange={(e) => setp2(e.current.value)}
              defaultValue={p2}
            />
          ) : (
            <p className=" font-lobster text-center font-size-14">
              {p2}
            </p>
          )}
           */}
                {editable ? (
                  <input
                    type="text"
                    className={` font-laFlibustiere text-center text-[45px] bg-transparent`}
                    onChange={(e) => setHead2(e.current.value)}
                    defaultValue={head2}
                    style={{ fontFamily: selectedHeadFont }}
                  />
                ) : (
                  <h1
                    style={{ fontFamily: selectedHeadFont }}
                    className={` font-laFlibustiere text-center text-[45px] bg-transparent`}
                  >
                    {head2}
                  </h1>
                )}
                {editable ? (
                  <input
                    type="text"
                    className={` font-lobster w-[75%] bg-transparent z-10 text-center font-size-14`}
                    onChange={(e) => setp2(e.current.value)}
                    defaultValue={p2}
                    style={{ fontFamily: selectedFont }}
                  />
                ) : (
                  <p
                    style={{ fontFamily: selectedFont }}
                    className={` font-lobster text-center font-size-14`}
                  >
                    {p2}
                  </p>
                )}

                {editable ? (
                  <input
                    type="text"
                    className={` font-laFlibustiere bg-transparent z-10 text-center text-[45px]`}
                    onChange={(e) => setHead3(e.current.value)}
                    defaultValue={head3}
                    style={{ fontFamily: selectedHeadFont }}
                  />
                ) : (
                  <h1
                    style={{ fontFamily: selectedHeadFont }}
                    className={` font-laFlibustiere text-center text-[45px] bg-transparent`}
                  >
                    {head3}
                  </h1>
                )}
                {/* {editable ? (
            <input
              type="text"
              className=" font-lobster w-[75%] text-center font-size-14"
              onChange={(e) => setp4(e.current.value)}
              defaultValue={p4}
            />
          ) : (
            <p className=" font-lobster text-center font-size-14">
              {p4}
            </p>
          )} */}

                {/* <hr className="mt-[0.5vh] w-[200px] border-none border-t-[0.5px] border-t-[#b57729] mx-auto" /> */}
                {/* {editable ? (
            <input
              type="text"
              className=" font-lobster w-[75%] text-center font-size-14"
              onChange={(e) => setp5(e.current.value)}
              defaultValue={p5}
            />
          ) : (
            <p className=" font-lobster text-center font-size-14">
              {p5}
            </p>
          )} */}
                {editable ? (
                  <textarea
                    type="text"
                    className={`font-lobster  resize-none bg-transparent mt-[1px] w-[75%] text-center font-size-14 z-10`}
                    onChange={(e) => handleTextChange(e, setp3)}
                    rows={3}
                    style={{ fontFamily: selectedFont }}
                    defaultValue={p3}
                  />
                ) : (
                  <pre
                    style={{ fontFamily: selectedFont }}
                    className={`text-center font-size-14`}
                  >
                    {p3}
                  </pre>
                )}
              </div>
              <img
                src={desing}
                className="w-[50%] transform -scale-y-100 absolute bottom-0 left-0"
              />
              <img
                src={desing}
                className="w-[50%] transform -scale-y-100 -scale-x-100 absolute bottom-0 right-0"
              />
            </div>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={
                editable
                  ? handleSaveLine
                  : () => {
                      handleEdit();
                    }
              }
            >
              {editable ? "Save" : "Edit"}
            </button>
            {editable && (
              <>
                <input
                  type="color"
                  defaultValue={textColour}
                  onChange={(e) => {
                    setTextColour(e.target.value);
                  }}
                />
                <FontPicker
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFonts}
                />
                <FontPicker
                  selectedFont={selectedHeadFont}
                  setSelectedFont={setSelectedHeadFonts}
                />
                <label
                  htmlFor="file"
                  className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-1.5 text-gray-700 cursor-pointer"
                >
                  <span>
                    <TbCloudUpload />
                  </span>
                  <p>drag and drop your file here or click to select a file!</p>
                </label>
                <input
                  id="file" // Ensure the id matches the htmlFor attribute of the label
                  type="file"
                  accept=".png, .gif, .jpeg, .jpg"
                  onChange={(e) =>
                    handleFileUpload(e, setCoverImage, setCoverImageDisplay)
                  }
                  className="hidden" // No need for max-width on hidden input
                />
              </>
            )}
          </div>
          <div className=" w-[50vw] min-w-[300px]">
            <Crousal3
              Image={CornerDesine}
              handleSelectDesing={handleSelectDesing}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-around ">
        <div>
        <label
          htmlFor="backGround"
          className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-1.5 text-gray-700 cursor-pointer"
        >
          <span>
            <TbCloudUpload />
          </span>
          <p>
            Drag and drop your file here or click to select a file! for
            Background Image Change
          </p>
        </label>
        <input
          id="backGround" // Ensure the id matches the htmlFor attribute of the label
          type="file"
          accept=".png, .gif, .jpeg, .jpg"
          onChange={(e) =>
            handleFileUpload(e, setBackGround, setCoverBackGroundDisplay)
          }
          className="hidden" // No need for max-width on hidden input
        /></div>
           <div className={stylee["body"]}>
      <div className={stylee["tabs"]}>
        <input
          checked={selectedTab === 'Private'}
          value="Private"
          id="Private"
          type="radio"
          className={stylee["input"]}
          onChange={() => setSelectedTab('Private')}
        />
        <label htmlFor="Private" className={stylee["label"]}>Private</label>

        <input
          checked={selectedTab === 'Public'}
          value="Public"
          id="Public"
          type="radio"
          className={stylee["input"]}
          onChange={() => setSelectedTab('Public')}
        />
        <label htmlFor="Public" className={stylee["label"]}>Public</label>
      </div>
    </div>
    { /* From Uiverse.io by catraco */  }

  
      </div>
      <div className="flex items-center mt-2 justify-center h-full">
        <button
         
          onClick={handleWeddingSubmit}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {/* <span className="w-max h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]"> */}
          Submit
          {/* </span> */}
        </button>
      </div>
      {/* <button onClick={}>Submit</button> */}
    </div>
  );
}

export default WeddingEdits;
