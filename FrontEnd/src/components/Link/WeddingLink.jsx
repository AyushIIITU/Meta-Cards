import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import toast from "react-hot-toast";
import Error from "../Common/Error";
import WeddingDisplay from "./WeddingDisplay";

function WeddingLink() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); // Fixed typo: loadding to loading
  // const [IMG,setIMG]=useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/wedding/get/${id}`);
      setData(response.data); 
      setLoading(false);
    } catch (err) {
      toast.error("Something Went Wrong");
      setError(true);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? <Loader /> : error ? <Error /> : <WeddingDisplay data={data} />}
    </>
  );
}

export default WeddingLink;
