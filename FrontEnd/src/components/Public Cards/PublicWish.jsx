import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import WishLinkData from "../Link/WishLinkData";

function PublicWish() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/wish/public`);
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
        <div className="flex flex-wrap gap-y-[4vh] justify-evenly">
          {publicCard.map((card, ind) => (
            <WishLinkData key={ind} data={card} height={"100%"} ind={ind} />
          ))}
        </div>
      )}
    </>
  );
}

export default PublicWish;
