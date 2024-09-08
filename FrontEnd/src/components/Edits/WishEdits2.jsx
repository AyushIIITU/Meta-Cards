import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../Utils/Apis";
import { TbCloudUpload } from "react-icons/tb";
import style from './WishEdit2.module.css'
import { useNavigate } from "react-router-dom";
function WishEdits2() {
  const navigate = useNavigate();
  const [textColour, setTextColour] = useState("#000000");
  const [coverImage, setCoverImage] = useState(null);
  const [coverBackGround, setBackGround] = useState(null);
  const [backGroundColour, setBackGroundColour] = useState("#e0e1dc");
  const [coverImageDisplay, setCoverImageDisplay] = useState();
  const [coverBackGroundDisplay, setCoverBackGroundDisplay] = useState();
  const [selectedTab, setSelectedTab] = useState('Private');
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
      return toast.error("You cant add more lines");
    }
    setLine([...line, ""]);
  };
  const handleAiResponse = async () => {
    try {
      if (!refWish.current.value) {
        return toast.error("Please enter your wish");
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
  const handelWishSubmit=async ()=>{
    try {
        const data={
            l1:textColour,
            l2:backGroundColour,
            WishBackGroundIMG:coverBackGround,
            WishFrontIMG:coverImage,
            Wish:{
                Header:heading,
                Body:line,
                Footer:endPara
            },
            creater:localStorage.getItem('UserID'),
            type:selectedTab
        }
        console.log(data);
        const response=await axios.post(`${API}/api/wish`,data,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.log(response);
        if(response.status===201){
            toast.success("Successfully added");
        }
        navigate("/")
    } catch (err) {
        console.error("Error in Wish Card",err);
    }
  }
  return (
    <div
      style={{ backgroundImage: coverBackGroundDisplay }}
      className="bg-cover min-h-screen bg-center bg-no-repeat object-contain overflow-hidden"
    >
      <div className="flex justify-evenly items-center flex-wrap mt-[5%]">
        <div className="w-[300px] h-[400px] ">
          {/* {coverImageDisplay? */}
          <img
            className=" w-full h-full object-cover"
            src={coverImageDisplay}
          />
          {/* // : <div className="text-4xl align-middle text-center my-auto border-red-200 border-2"> Add Image form below
          // </div>} */}
          
        </div>
        <div
          className="w-[300px] mt-auto h-[420px] "
          style={{
            color: `${textColour}`,
            backgroundColor: `${backGroundColour}`,
          }}
        >
          <div className="my-auto bg-transparent">
            {!editable && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-[19%] px-4 rounded-full "
                  onClick={handleAiResponse}
                >
                  Generate Ai Respone
                </button>
                <input
                  className="border-2 border-transparent mx-auto w-full text-center h-10 outline-none overflow-hidden bg-gray-200 rounded-lg transition-all duration-500 focus:border-blue-500 focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)] focus:bg-white hover:border-blue-500 hover:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
                  type="text"
                  ref={refWish}
                  placeholder="EnterWish(eg.mom birthday)"
                />
              </>
            )}
            {heading.map((head, index) =>
              editable ? (
                <input
                  type="text"
                  defaultValue={head}
                  key={index}
                  className="text-center w-full bg-transparent"
                  onChange={(e) => handleEditHeader(index, e.target.value)}
                />
              ) : (
                <h4 key={index} className=" text-center">
                  {head}
                </h4>
              )
            )}
            {line.map((line, index) =>
              editable ? (
                <input
                  type="text"
                  className="w-full bg-transparent"
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
                  className="w-full text-end bg-transparent"
                  type="text"
                  defaultValue={ep}
                  key={index}
                  onChange={(e) => {
                    handleEditEndPara(index, e.target.value);
                  }}
                />
              ) : (
                <p className="text-right" key={index}>
                  {ep}
                </p>
              )
            )}
            {!editable || (
              <div className="flex justify-center">
                <input
                  type="color"
                  defaultValue={textColour}
                  onChange={(e) => setTextColour(e.target.value)}
                />
                <input
                  type="color"
                  defaultValue={backGroundColour}
                  onChange={(e) => setBackGroundColour(e.target.value)}
                />
              </div>
            )}
            {!editable || (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleAddLine}
              >
                Add Line
              </button>
            )}
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
          </div>
        </div>
      </div>
      <div className="flex justify-around flex-wrap mt-[10%]">
        <label
          htmlFor="file"
          className="flex flex-col justify-center w-[250px] h-[190px] border-2 border-dashed border-gray-300 items-center text-center p-1.5 text-gray-700 cursor-pointer"
        >
          <span>
            <TbCloudUpload />
          </span>
          <p>drag and drop your file here or click to select a file! for Change Card Image</p>
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
          <p>drag and drop your file here or click to select a file! to Change BackeGround Image</p>
        </label>
        <input
          id="Bgfile" // Ensure the id matches the htmlFor attribute of the label
          type="file"
          accept=".png, .gif, .jpeg, .jpg"
          onChange={handleBackGroundUpload}
          className="hidden" // No need for max-width on hidden input
        />
   <div className={style["body"]}>
      <div className={style["tabs"]}>
        <input
          checked={selectedTab === 'Private'}
          value="Private"
          id="Private"
          type="radio"
          className={style["input"]}
          onChange={() => setSelectedTab('Private')}
        />
        <label htmlFor="Private" className={style["label"]}>Private</label>

        <input
          checked={selectedTab === 'Public'}
          value="Public"
          id="Public"
          type="radio"
          className={style["input"]}
          onChange={() => setSelectedTab('Public')}
        />
        <label htmlFor="Public" className={style["label"]}>Public</label>
      </div>
    </div>
      </div>
      <div className="flex items-center justify-center h-full mt-3">
        <button
         
          onClick={handelWishSubmit}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {/* <span className="w-max h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]"> */}
          Submit
          {/* </span> */}
        </button>
      </div>
      {/* <button onClick={handelWishSubmit}>Submit</button> */}
    </div>
  );
}

export default WishEdits2;
