// import React from 'react'

import React, { useState } from 'react';
import {read, utils} from 'xlsx';

/**
 * This is an example on how you may export multiple components from your view
 * If your module offers custom Skills, you would export your skill components here
 */
export { Example1 } from './example1'
export { Example2 } from './example2'

/**
 * This file is the full view of your module. It automatically includes heavy dependencies, like react-bootstrap
 * If you want to display an interface for your module, export your principal view as "default"
 */
// export default class MyMainView extends React.Component {
//   render() {
//     return <div>Some interface</div>
//   }
// }

// const UploadButton = ({ onFileChange }) => {
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     onFileChange(file);
//   };

//   return (
//     <div>
//       <label htmlFor="uploadInput">Upload Excel File:</label>
//       <input type="file" id="uploadInput" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default UploadButton;



const UploadButton = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
         
          const data = new Uint8Array(e.target.result);
          console.log("agadi");
          const workbook = read(data, { type: 'array' });
          console.log("pachadi");
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
  
          setExcelData(jsonData);
          console.log("checking the excel", jsonData);
          // onFileChange(jsonData); // Invoke the callback with the parsed data
        } catch (error) {
          console.log("error vayo", error);
          // Handle the error here (e.g., display an error message to the user)
        }
      }

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <label htmlFor="uploadInput">Upload Excel File:</label>
      <input type="file" id="uploadInput" accept=".xlsx" onChange={handleFileChange} />

      {/* Displaying the parsed Excel data in a table */}
      {excelData && (
        <table>
          <thead>
            <tr>
              {excelData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadButton;
