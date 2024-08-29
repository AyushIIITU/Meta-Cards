import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";

import PublicShare from "../Link/PublicShare";
import CakeDisplay from "../Link/CakeDisplay";

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
        <div className="flex flex-wrap gap-y-[4vh] justify-evenly">
          {publicCard.map((card, ind) => (
            <PublicShare data={card} key={ind} type={"cake"}>
              <CakeDisplay data={card} height={"100%"} />
            </PublicShare>
          ))}
        </div>
      )}
    </>
  );
}

export default PublicCake;
