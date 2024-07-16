// import React, { useRef, useState } from 'react';
// // import CakeDemo from '../Demo/CakeDemo';
// import html2canvas from 'html2canvas';
// import gifshot from 'gifshot';
// import WeddingLink from '../Link/WeddingLink';

// function ReactToImg() {
//   const componentRef = useRef();
//   const [hovering, setHovering] = useState(false);

//   const captureFrames = async () => {
//     const frames = [];
//     const captureFrame = () => {
//       return html2canvas(componentRef.current, { useCORS: true }).then(canvas => canvas.toDataURL('image/png'));
//     };

//     // Capture the initial state
//     frames.push(await captureFrame());

//     // Trigger hover state and capture frames during transition
//     setHovering(true);
//     await new Promise(resolve => setTimeout(resolve, 100)); // Allow CSS transition to start

//     // Capture frames at different points in the transition
//     for (let i = 0; i < 10; i++) {
//       frames.push(await captureFrame());
//       await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay as needed for smooth transition capture
//     }

//     setHovering(false); // Reset hover state

//     createGif(frames);
//   };

//   const createGif = (images) => {
//     gifshot.createGIF({
//       images: images,
//       gifWidth: componentRef.current.offsetWidth,
//       gifHeight: componentRef.current.offsetHeight,
//     }, (obj) => {
//       if (!obj.error) {
//         const image = obj.image;
//         const downloadLink = document.createElement('a');
//         downloadLink.href = image;
//         downloadLink.download = 'component.gif';
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//       } else {
//         console.error('Error creating GIF:', obj.error);
//       }
//     });
//   };
// /* ReactToImg.css */


//   return (
//     <div>
//       <div
//         ref={componentRef}
//         onMouseEnter={() => setHovering(true)}
//         onMouseLeave={() => setHovering(false)}
//         className={`overflow-hidden  ${hovering ? 'hover' : ''}`}
//       >
//               <WeddingLink id={"667dc05b527d5369b1e0d22c"} />
//       </div>
//       <button onClick={captureFrames}>Download Image</button>
//     </div>
//   );
// }

// export default ReactToImg;
