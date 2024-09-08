import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import toast from "react-hot-toast";
import Error from "../Common/Error";
import WeddingDisplay from "./WeddingDisplay";

function WeddingLinkPrivate() {
  const { id, token } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API}/api/wedding/get/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
    //   console.error(err);
    toast.error("Something went Wrong");
      setLoading(false); 
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <>{loading ? <Loader /> :error?<Error/>: <WeddingDisplay data={data} />}</>;
}

export default WeddingLinkPrivate;
