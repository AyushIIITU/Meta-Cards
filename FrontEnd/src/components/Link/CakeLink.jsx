import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import CakeDisplay from "./CakeDisplay";
import toast from "react-hot-toast";
import Error from "../Common/Error";

function CakeLink() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); // Fixed typo: loadding to loading
  // const [IMG,setIMG]=useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/api/cake/get/${id}`);

      // console.log("response.data", response.data); // Use the id variable
      setData(response.data); // Set the data with response.data
      // setIMG(`${API}/${response.data.CakeBackGroundIMG.replace(/\\/g, "/")}` )
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
      {loading ? <Loader /> : error ? <Error /> : <CakeDisplay data={data} />}
    </>
  );
}

export default CakeLink;
