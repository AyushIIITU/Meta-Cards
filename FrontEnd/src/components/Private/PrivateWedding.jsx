import { useState, useEffect } from "react";
import axios from "axios";
// import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";

// import PublicShare from "../Link/PublicShare";
// import weddingDisplay from "../Link/CakeDisplay";
import PrivateShare from "./PrivateDisplay";
import { API } from "../../Utils/Apis";
// import CakeDisplay from "../Link/CakeDisplay";
import Like from "../Common/Like";
import WeddingDisplay from "../Link/WeddingDisplay";
import Error404 from "../Common/Error404";

function PrivateWedding() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const id=localStorage?.getItem('UserID');
  const fetchData = async () => {
    setLoading(true);
    try {  
        // console.log(id);
        
      const response = await axios.get(`${API}/api/wedding/user/${id}`);
      // console.log(response);
      
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
  const handleDelete=async(id)=>{
    try {
      const response=await axios.delete(`${API}/api/wedding/${id}`);
      
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }
  const handleOnLike = async (id) => {
    try {
        const liked = localStorage.getItem(`isLiked-${id}`);
        const userId = id || (await axios.get('https://api.ipify.org?format=json')).data.id;
        // console.log(id);
        
        if (liked) {
            localStorage.removeItem(`isLiked-${id}`);
            const response = await axios.post(`${API}/api/wedding/unlike`, {
                id: id,
                user: userId,
            });
           
        } else {
            localStorage.setItem(`isLiked-${id}`, true);
            const response = await axios.post(`${API}/api/wedding/like`, {
                id: id,
                user: userId,
            });
           
        }
    } catch (err) {
        console.error(err);
    }
};


  return (
    <>
      {loading ? (
        <Loader />
      ) : ( publicCard.length>0?
        <div className="flex flex-wrap gap-y-[4vh] justify-evenly">
          {publicCard.length<1?<h1 className="text-xl font-bold font-lato"> No Card Here!</h1>:publicCard.map((card, ind) => (
            <PrivateShare data={card} key={ind} type={"wedding"} handleDelete={handleDelete} handleOnLike={handleOnLike}>
              <WeddingDisplay data={card} height={"100%"} />
              <Like count={card?.liked?.length} onLike={handleOnLike} isLike={card?.liked?.find((like)=>like!=id)} id={card?._id}/>
            </PrivateShare>
          ))}
        </div>:<Error404/>
      )}
    </>
  );
}

export default PrivateWedding;
