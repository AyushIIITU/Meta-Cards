import { useParams } from "react-router-dom";
import WeddingLink from './WeddingLink';
function WeddingLinkProvider() {
    const {id}=useParams();
  return (
    <WeddingLink id={id}/>
  )
}

export default WeddingLinkProvider