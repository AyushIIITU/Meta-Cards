import CoustomCrousal from "./CoustomCrousal";

const CoustomCrousalTest = () => {
    const images = [
      {
        src: "https://s1.1zoom.ru/prev2/540/Fields_Sunflowers_Closeup_539973_300x200.jpg",
        alt: "Sunflowers",
      },
      {
        src: "https://vocabulary.ru/images/Hopetoun_falls.jpg",
        alt: "Waterfall",
      },
      {
        src: "https://s1.1zoom.ru/prev2/546/Germany_Rivers_Fields_Moselle_Hill_545275_300x200.jpg",
        alt: "River",
      },
      {
        src: "https://s1.1zoom.ru/prev2/547/China_Taiwan_Mountains_Forests_Fields_Roads_Night_546672_300x200.jpg",
        alt: "Land",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Quba_385.jpg/300px-Quba_385.jpg",
        alt: "Mountains",
      },
    ];
  
    return <CoustomCrousal images={images} />;
  };
  
  export default CoustomCrousalTest;