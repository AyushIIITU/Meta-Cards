
import style from "./WCardFront.module.css"
function WCardFront() {
  return (
    <>
    <div
          className={`${style.cover} w-[500px] h-[500px] absolute mx-auto `}
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/areeba/image/upload/v1650488986/938ba925943764901f2c2889ea835d42--dark-navy-blue-cobalt-blue.jpg")',
            objectFit: "cover",
            transformOrigin: "left center",
            transition: "transform 4s",
            zIndex: 1,
          }}
        >
          <img
            src="https://res.cloudinary.com/areeba/image/upload/v1650491336/Pngtree_golden_line_mandala_pattern_decorative_5960487.png"
            className={style["cover-style"]}
          />
          <h1
            className="relative bottom-[310px] text-center text-[45px]"
            style={{
              background: "-webkit-linear-gradient(#f7d182, #a16a2a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Risvant & Nuunu
          </h1>
        </div></>
  )
}

export default WCardFront