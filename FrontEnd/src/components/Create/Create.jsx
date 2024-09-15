
import Carousel from 'react-multi-carousel'
import "./Create.css"
function Create() {
  return (
    <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={false}
    className=""
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: 3,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: 1,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: 2,
        partialVisibilityGutter: 30,
      },
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
  >
   <Create/>
    {/* <article className='min-h-96 relative overflow-hidden grow max-h-[540px]'>
       <div className='h-full overflow-hidden'>
        <div className='z-10 relative flex items-center justify-center w-full h-full '> */}
        {/* <div className='w-[100px] h-[100px]'>

       <div>
        <WCards2/>
        </div>
        </div>
        {/* </div>
       </div>
       </article> */}
       {/* <div>
        <CakeDemo/>
       </div> */}
       {/* <div className='w-[100px] h-[100px]'>
        <BCards1/>
       </div> */}
  </Carousel>
  //   <div className="cards">
  //   <div className="card red">
  //     <p className="tip">Hover Me</p>
  //   </div>
  //   <div className="card blue">
  //     <p className="tip">Hover Me</p>
  //   </div>
  //   <div className="card green">
  //     <p className="tip">Hover Me</p>
  //   </div>
  // </div>

  
  )
}

export default Create