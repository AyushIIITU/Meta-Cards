import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import CakeLinkData from "../Link/CakeLinkData";


function PublicCake() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/cake/public`);
      setPublicCard(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {publicCard.map((card, ind) => (
            <CakeLinkData key={ind} data={card} height={"100%"} ind={ind} />
          ))}
        </div>
      )}
    </>
  );
}

export default PublicCake;
