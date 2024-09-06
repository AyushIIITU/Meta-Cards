import React, { useEffect, useState } from 'react';
import style from "./like.module.css";

function Like({ count, onLike, id ,isLike}) {
    const [countLike, setCountLike] = useState(count);
    const [isLiked, setIsLiked] = useState(isLike);

    useEffect(() => {
        const liked = localStorage.getItem(`isLiked-${id}`);
        if (liked) {
            setIsLiked(true);
            // setCountLike(prevCount => prevCount + 1);
        }
    }, [id]);

    const handleLike = () => {
        onLike(id);
        if (isLiked) {
            setIsLiked(false);
            setCountLike(prevCount => prevCount - 1);
        } else {
            setIsLiked(true);
            setCountLike(prevCount => prevCount + 1);
        }
    };

    return (
        <button className={style["Btn"]} onClick={handleLike}>
            <span className={isLiked ? style["leftContainerLiked"] : style["leftContainer"]}>
                <svg fill={isLiked ? "red" : "white"} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                </svg>
                <span className={style["like"]}>{isLiked ? "Liked" : "Like"}</span>
            </span>
            <span className={isLiked ? style["likedCountLiked"] : style["likeCount"]}>
                {countLike}
            </span>
        </button>
    );
}

export default Like;
