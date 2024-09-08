import { Link } from "react-router-dom";
import style from "./Home1.module.css";
import TestCarousel from "../Test/TestCrousal";
function Home1() {
  return (
    <>
      {/* <div className={style["hero"]}></div> */}

      <section className={style["home"]}>
        <div className={style["home-content"]}>
          <h1 className="text-black">A virtual Cards</h1>
          <h3>for pricious Oucassions</h3>
          <p className="text-dark">
            In this website you can create a virtual card which can be sent on
            ocassions
          </p>
          <h1 className="text-blue-400 size-4000">Welcome to Meta Cards</h1>
          <h4>Here You can Cretae your own custom cards for occasions</h4>
          <div className="flex justify-start p-[2vh] pl-[4vh] gap-4">
            <Link to="preview" className={style["button2"]}>Demo</Link>

            <Link to="create" className={style["button2"]}>Create</Link>

          </div>
          {/* <div className={style["btn-box"]}>
            <Link to="preview" className={style["button"]}>
              <span className={style["button-content"]}>Preview </span>
            </Link>

            <Link to="create">Create</Link>
          </div> */}
        </div>
        <TestCarousel />
      </section>
    </>
  );
}

export default Home1;
