import { useState } from 'react';

// Sample fonts
import {fonts} from '../../Utils/Fonts'

const FontPicker = ({selectedFont,setSelectedFont}) => {
  // setSelectedFont(fonts[0].value);
  // const [selectedFont, setSelectedFont] = useState(fonts[0].value);
  // console.log(fonts);
  return (
    <>
      {/* <h1 className="text-2xl mb-4">Select a Font</h1> */}
      <select
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSelectedFont(e.target.value)}
        value={selectedFont}
      >
        {fonts.map((font) => (
          <option key={font.name} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FontPicker;
