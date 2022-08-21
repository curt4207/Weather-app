import React, { useState } from "react";
import Papa from "papaparse";
import style from "../styles/Home.module.css";
import fire from "../config/fire-conf";

function CSVConvert() {
  const [file, setFile] = useState([]);

  const handleChange = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        setFile(results.data);
      },
    });
  };

  const sendToFirestore = () => {
    fire.firestore().collection("cities").add(file);
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={handleChange} />
      <br />
      <button type="button" onClick={sendToFirestore}>
        +Firebase
      </button>
    </>
  );
}

export default CSVConvert;
