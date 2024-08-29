import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import WeddingDisplay from "../Link/WeddingDisplay";
import PublicShare from "../Link/PublicShare";


function PublicWedding() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/wedding/public`);
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
                <PublicShare data={card} key={ind} type={"wedding"}>
                <WeddingDisplay data={card} height={"100%"} />
              </PublicShare>
            // <PublicWed data={card} height={"100%"} key={ind} />
          ))}
        </div>
      )}
    </>
  );
}

export default PublicWedding;
