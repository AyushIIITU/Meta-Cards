import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
// import style from "./CakeLinkPrivate.module.css";
import CakeDisplay from "./CakeDisplay";
import toast from "react-hot-toast";
import Error from "../Common/Error";

function CakeLinkPrivate() {
  const { id, token } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API}/api/cake/get/${id}`,
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
  return <>{loading ? <Loader /> :error?<Error/>: <CakeDisplay data={data} />}</>;
}

export default CakeLinkPrivate;
