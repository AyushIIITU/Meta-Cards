import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../Utils/Apis";
import Loader from "../skeleton/Loader";
import PublicShare from "../Link/PublicShare";
import WishDisplay from "../Link/WishDisplay";
import Like from "../Common/Like";
import Error404 from "../Common/Error404";

function PublicWish() {
  const [publicCard, setPublicCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = localStorage?.getItem("UserID");
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/wish/public`);
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
  const handleOnLike = async (id) => {
    try {
      const liked = localStorage.getItem(`isLiked-${id}`);
      const userId =
        id || (await axios.get("https://api.ipify.org?format=json")).data.id;
      // console.log(id);

      if (liked) {
        // localStorage.removeItem(`isLiked-${id}`);
        const response = await axios.post(`${API}/api/cake/unlike`, {
          id: id,
          user: userId,
        });
      } else {
        // localStorage.setItem(`isLiked-${id}`, true);
        const response = await axios.post(`${API}/api/cake/like`, {
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
      ) : publicCard.length > 0 ? (
        <div className="flex flex-wrap gap-y-[4vh] justify-evenly">
          {publicCard.map((card, ind) => (
            <PublicShare data={card} key={ind}>
              <WishDisplay data={card} height={"100%"} />
              <Like
                count={card?.liked?.length}
                onLike={handleOnLike}
                isLike={card?.liked?.find((like) => like != id)}
                id={card?._id}
              />
            </PublicShare>
          ))}
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
}

export default PublicWish;
