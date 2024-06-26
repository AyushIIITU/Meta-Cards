import { useRef, useState } from "react";
import style from "./WishEdits.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../Utils/Apis";
import { TbCloudUpload } from "react-icons/tb";
function WishEdits() {
  const [textColour, setTextColour] = useState("#ffffff");
  const [coverImage, setCoverImage] = useState(null);
  const [coverBackGround, setBackGround] = useState(null);
  const [backGroundColour, setBackGroundColour] = useState("#e0e1dc");
  const [coverImageDisplay, setCoverImageDisplay] = useState();
  const [coverBackGroundDisplay, setCoverBackGroundDisplay] = useState();
  const [line, setLine] = useState([
    "Dear Dad,",
    "Let's see.. .",
    "You’re never around, you",
    "hate the music I’m into, you",
    "practically despise the movies I",
    "like, and yet somehow you still",
    "manage to be the best dad every year.",
    "How do you do that? :)",
  ]);
  const [heading, setHeading] = useState([
    "You're not a Fossil! (YET)",
    "(HAPPY BIRTHDAY)",
  ]);
  const refWish = useRef();
  const refColour = useRef();
  const [endPara, setEndPara] = useState(["Happy Birthday, papa!", "♥Sarah"]);
  const [editable, setEditable] = useState(false);
  const handleAddLine = () => {
    if (line.length === 8) {
      toast.error("You cant add more lines");
    }
    setLine([...line, ""]);
  };
  const handleAiResponse = async () => {
    try {
      if (!refWish.current.value) {
        toast.error("Please enter your wish");
      }
      const response = await axios.get(`${API}/ai/wish`, {
        wish: refWish.current.value,
      });
      console.log(response);
      setLine(response.data.split("\n"));
    } catch (err) {
      console.error("error in Ai", err);
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      setCoverImage(file);
      setCoverImageDisplay(URL.createObjectURL(file));
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setCoverImageDisplay(`url(${reader.result})`);
      // };
      // reader.readAsDataURL(file);
    }
  };
  const handleBackGroundUpload = (e) => {
    const file = e.target.files[0];
    // console.log("file", file);
    if (file) {
      setBackGround(file);
      // setCoverBackGroundDisplay(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverBackGroundDisplay(`url(${reader.result})`);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveLine = () => {
    // console.log(line);
    const newLines = line.filter((l) => l !== "");
    // console.log(newLines);
    setLine(newLines);
    setEditable(false);
    console.log(refColour.current.value);
  };
  const handleEdit = () => {
    setEditable(true);
  };
  const handleEditHeader = (index, value) => {
    const newHeading = [...heading];
    newHeading[index] = value;
    setHeading(newHeading);
  };
  const handleEditPara = (index, value) => {
    const newLine = [...line];
    newLine[index] = value;
    setLine(newLine);
  };
  const handleEditEndPara = (index, value) => {
    const newEndPara = [...endPara];
    newEndPara[index] = value;
    setEndPara(newEndPara);
  };
  return (
    <div
      style={{ backgroundImage: coverBackGroundDisplay }}
      className="bg-cover  bg-center bg-no-repeat object-contain overflow-hidden"
    >
      <div className="flex justify-around mt-[45vh] relative">
        <div className={style["card"]}>
          <div className={style["imgBox"]}>
            <div className={style["bark"]}></div>
            <img className={style["cover-img"]} src={coverImageDisplay} />
          </div>
        </div>
        <div
          className={style["card"]}
          style={{
            color: `${textColour}`,
            backgroundColor: `${backGroundColour}`,
          }}
        >
          <div className={style["details"]}>
            {heading.map((head, index) =>
              editable ? (
                <input
                  type="text"
                  defaultValue={head}
                  key={index}
                  className={style["color2 margin h4"]}
                  onChange={(e) => handleEditHeader(index, e.target.value)}
                />
              ) : (
                <h4 key={index} className={style["color2 margin h4"]}>
                  {head}
                </h4>
              )
            )}
            {line.map((line, index) =>
              editable ? (
                <input
                  type="text"
                  defaultValue={line}
                  key={index}
                  onChange={(e) => {
                    handleEditPara(index, e.target.value);
                  }}
                />
              ) : (
                <p key={index}>{line}</p>
              )
            )}
            {endPara.map((ep, index) =>
              editable ? (
                <input
                  type="text"
                  defaultValue={ep}
                  key={index}
                  onChange={(e) => {
                    handleEditEndPara(index, e.target.value);
                  }}
                />
              ) : (
                <p className={style["text-right"]} key={index}>
                  {ep}
                </p>
              )
            )}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleAddLine}
            >
              Add Line
            </button>
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleAiResponse}
            >
              Generate Ai Respone
            </button>
            <input
              type="text"
              ref={refWish}
              placeholder="EnterWish(eg.mom birthday)"
            />
            {!editable || (
              <input
                type="color"
                defaultValue={textColour}
                onChange={(e) => setTextColour(e.target.value)}
              />
            )}
            {!editable || (
              <input
                type="color"
                defaultValue={backGroundColour}
                onChange={(e) => setBackGroundColour(e.target.value)}
              />
            )}
          </div>
        </div>
        {/* <div className={style["card"]}> */}
        {/* <div className={style["imgBox"]}>
          <div className={style["bark"]}></div>
          <img src="https://image.ibb.co/fYzTrb/lastofus.jpg" />
        </div> */}
        {/* <div className={style["details"]}>
          <h4 className={style["color1 h4"]}>You're not a Fossil! (YET)</h4>
          <h4 className={style["color2 margin h4"]}>(HAPPY BIRTHDAY)</h4>
          Dear Dad,</p>
          Let's see.. .</p>
          You’re never around, you</p>
          hate the music I’m into, you</p>
          practically despise the movies I</p>
          like, and yet somehow you still</p>
          manage to be the best dad every year.</p>
          How do you do that? :)</p>
          <p className={style["text-right"]}>Happy Birthday, papa!</p>
          <p className={style["text-right"]}>♥Sarah</p>
        </div> */}
        {/* </div> */}
      </div>
      <div>
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
          onChange={handleFileUpload}
          className="hidden" // No need for max-width on hidden input
        />
        <label
          htmlFor="Bgfile"
          className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-1.5 text-gray-700 cursor-pointer"
        >
          <span>
            <TbCloudUpload />
          </span>
          <p>drag and drop your file here or click to select a file!</p>
        </label>
        <input
          id="Bgfile" // Ensure the id matches the htmlFor attribute of the label
          type="file"
          accept=".png, .gif, .jpeg, .jpg"
          onChange={handleBackGroundUpload}
          className="hidden" // No need for max-width on hidden input
        />
        {/* {coverImage && <img src={coverImage} alt="Cover" className="mt-4" />} */}
      </div>
    </div>
  );
}

export default WishEdits;
