import React from "react";

const TotalGas = ({ transactions }) => {
  let total = 0;

  for (let i = 0; i < transactions.length; i++) {
    total += (transactions.gasUsed[i] * transactions.gasPrice[i]) / 1e18;
    return total;
  }
  return (
    <>
      <h1>Total Gas used:{total}</h1>
    </>
  );
};

export default TotalGas;

//RN I have an arry of objects so reduce isn't going to work w/o some modifying. I could use a map function to create
//a new array for each gasPrice & gasUsed portion of each object. I think I can do this w/ a for loop.
