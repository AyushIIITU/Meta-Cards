import Header from "./components/Common/Header"
import Home1 from "./components/Home/Home1"
import Cake from "./components/cakes/Cake"
import BCards1 from "./components/cards/BCards1"
import WCards2 from "./components/cards/WCards2"

// import ""
function App() {


  return (
    <div className="w-full h-full bg-gradient-to-r from-black via-black to-gray-500">
      {/* <Cake/> */}
      {/* <BCards1/> */}
      {/* <WCards2/> */}
      
      <Header/>
      <Home1/>
      <div className="">
      <h1 className="text-blue-400 size-4000">Welcome to Meta Cards</h1> 
      <h4>Here You can Cretae your own custom cards for occasions</h4>     
      </div>
      
    </div>
  )
}

export default App
