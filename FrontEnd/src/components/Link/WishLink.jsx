import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import toast from "react-hot-toast";
import Error from "../Common/Error";
import WishDisplay from "./WishDisplay";

function WishLink() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/wish/get/${id}`);
      setData(response.data); 
      setLoading(false);
    } catch (err) {
      toast.error("Something Went Wrong");
      setError(true);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? <Loader /> : error ? <Error /> : <WishDisplay data={data} />}
    </>
  );
}

export default WishLink;
