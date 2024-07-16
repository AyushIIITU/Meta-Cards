import { useEffect, useState } from "react";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import axios from "axios";
import WeddingLinkFront from "./WeddingLinkFront";
// import WCardFront from "../cards/WCardFront";
import WeddingLinkBack from "./WeddingLinkBack";

function WeddingLink({id}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [IMG, setIMG] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/wedding/${id}`);
      setData(response.data);
      //   console.log(response.data);
      setIMG(
        `${API}/${response.data.WeddingBackGroundIMG.replace(/\\/g, "/")}`
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        <>
          <div
            style={{
              backgroundImage: `url(${IMG})`,
            }}
            className="bg-cover h-[100vh] flex items-center w-full bg-center bg-no-repeat object-contain overflow-hidden"
          >
             <div
    className="relative w-[500px] max-w-[90vw] h-[500px] max-h-[90vh] min-h-[250px] min-w-[250px] mx-auto"
    style={{ perspective: "1000px" }}
  >
              {/* <WCardFront/> */}
              {data.Front && <WeddingLinkFront FrontData={data.Front} />}
              

              {data.Back && <WeddingLinkBack BackData={data.Back} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WeddingLink;
