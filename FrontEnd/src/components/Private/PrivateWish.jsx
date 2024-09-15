import { useState, useEffect } from "react";
import axios from "axios";
// import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";

// import PublicShare from "../Link/PublicShare";
// import CakeDisplay from "../Link/CakeDisplay";
import PrivateShare from "./PrivateDisplay";
import { API } from "../../Utils/Apis";
// import CakeDisplay from "../Link/CakeDisplay";
import Like from "../Common/Like";
import WishDisplay from "../Link/WishDisplay";
import Error404 from "../Common/Error404";
// import WeddingDisplay from "../Link/WeddingDisplay";

function PrivateWish() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const id=localStorage?.getItem('UserID');
  const fetchData = async () => {
    setLoading(true);
    try {  
        // console.log(id);
        
      const response = await axios.get(`${API}/api/wish/user/${id}`);
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
      const response=await axios.delete(`${API}/api/cake/${id}`);
      console.log(response);
      
    //   fetchData();
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
            const response = await axios.post(`${API}/api/cake/unlike`, {
                id: id,
                user: userId,
            });
            console.log(response);
        } else {
            localStorage.setItem(`isLiked-${id}`, true);
            const response = await axios.post(`${API}/api/cake/like`, {
                id: id,
                user: userId,
            });
            console.log(response);
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
          {publicCard.map((card, ind) => (
            <PrivateShare data={card} key={ind} type={"wish"} handleDelete={handleDelete} handleOnLike={handleOnLike}>
              <WishDisplay data={card} height={"100%"} />
              <Like count={card?.liked?.length} onLike={handleOnLike} isLike={card?.liked?.find((like)=>like!=id)} id={card?._id}/>
            </PrivateShare>
          ))}
         </div>:<Error404/>
      )}
    </>
  );
}

export default PrivateWish;
