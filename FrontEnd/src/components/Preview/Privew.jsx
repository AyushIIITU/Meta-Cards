
import styles from "./Privew.module.css";
import BirthDayGif from "../../Video/Birth-DAY.mp4";
import WeddingGif from "../../Video/Wedding-Card.mp4";
import FormalCard from "../../Video/Wish-Card.mp4";
import { Link } from "react-router-dom";
function Privew() {
  return (
    <center className={styles.container}>
      <Link to="Birthday" className="flex flex-col mb-5">
        <video
          loading="lazy"
          muted="muted"
          src={BirthDayGif}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderTopLeftRadius: `10px`,
            borderTopRightRadius: `10px`,
          }}
        ></video>
        <div className={styles.badge}>BirthDay Card</div>
      </Link>
      <Link to="FormalCard" className="flex flex-col mb-5">
        <video
          loading="lazy"
          muted="muted"
          src={FormalCard}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderTopLeftRadius: `10px`,
            borderTopRightRadius: `10px`,
          }}
        ></video>
        <div className={styles.badge}>Formal Card</div>
      </Link>
      <Link to="Wedding" className="flex flex-col mb-5">
        <video
          loading="lazy"
          muted="muted"
          src={WeddingGif}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderTopLeftRadius: `10px`,
            borderTopRightRadius: `10px`,
          }}
        ></video>
        <div className={styles.badge}>Wedding Card</div>
      </Link>
      {/* <div data-text="Formal Card" style={{ '--r': '5' }} className={styles.glass}>
        <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
          ></path>
        </svg>
      </div>
      <div data-text="Wedding Card" style={{ '--r': '25' }} className={styles.glass}>
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
          ></path>
        </svg>
      </div> */}
    </center>
  );
}

export default Privew;
