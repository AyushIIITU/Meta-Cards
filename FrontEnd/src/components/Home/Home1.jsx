import React from 'react'
import { Link } from 'react-router-dom'
import style from "./Home1.module.css"
function Home1() {
  return (
    <>
    <div className={style["hero"]}></div>

    <section  className={style["home"]}>
        <div className={style["home-content"]}>
            <h1 className='text-white'>A virtual Cards</h1>
            <h3>for pricious Oucassions</h3>
            <p className='text-white'>In this website you can create a virtual card which can be sent on ocassions</p>
                <div className={style["btn-box"]}>
                    <Link to="preview">Preview</Link>
                    <Link to="create">Create</Link>
                </div>
        </div>
    </section>
    </>

  )
}

export default Home1