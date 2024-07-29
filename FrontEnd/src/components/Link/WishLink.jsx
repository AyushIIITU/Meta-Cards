import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import style from "../cards/BCards1.module.css";

function WishLink({ id, height }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [IMG, setIMG] = useState(null);
  const [CardIMG, setCardIMG] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/wish/get/${id}`);
      setData(response.data);
      setIMG(`${API}/${response.data.WishBackGroundIMG.replace(/\\/g, "/")}`);
      setCardIMG(`${API}/${response.data.WishFrontIMG.replace(/\\/g, "/")}`);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${IMG})`,
        height: height ? height : "100vh",
      }}
      className="bg-cover flex justify-center items-center w-full bg-center bg-no-repeat object-contain overflow-auto"
    >
      <div
        style={{
          color: `${data?.l1}`,
          backgroundColor: `${data?.l2}`,
        }}
        className={style.card}
      >
        <div className={style.imgBox}>
          <div className={style.bark}></div>
          <img
            style={{ minWidth: "300px" }}
            className=" w-full h-full object-cover"
            src={CardIMG}
            alt="Card"
          />
        </div>
        <div className={style.details}>
          {data.Wish?.Header?.map((he, index) => (
            <h4 key={index} className={`${style.color1} h4`}>
              {he}
            </h4>
          ))}
          {data.Wish?.Body?.map((B, index) => (
            <p key={index}>{B}</p>
          ))}
          {data.Wish?.Footer?.map((F, index) => (
            <p key={index} className="text-right">
              {F}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishLink;
