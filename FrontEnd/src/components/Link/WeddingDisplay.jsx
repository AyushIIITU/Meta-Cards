import WeddingLinkFront from './WeddingLinkFront'
import WeddingLinkBack from './WeddingLinkBack'
import { API } from '../../Utils/Apis'

function WeddingDisplay({data,height}) {
  // console.log(data);
  // const URL=
  return (
    <div
            style={{
              backgroundImage: `url(${API}/${data?.WeddingBackGroundIMG?.replace(/\\/g, "/")})`,
              height: height ?height: '100vh'  
            }}
            className="bg-cover flex items-center w-full bg-center bg-no-repeat object-contain overflow-hidden"
          >
             <div
    className="relative w-[500px] max-w-[90vw] h-[500px] max-h-[90vh] min-h-[250px] min-w-[250px] mx-auto"
    style={{ perspective: "1000px" }}
  >
              {/* <WCardFront/> */}
              {data?.Front && <WeddingLinkFront FrontData={data?.Front} />}
              

              {data?.Back && <WeddingLinkBack BackData={data?.Back} />}
            </div>
          </div>
  )
}

export default WeddingDisplay