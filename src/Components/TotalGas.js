import React from "react";

const TotalGas = ({ transactions }) => {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    total = total + (transactions[i].gasUsed * transactions[i].gasPrice) / 1e18;
  }
  return (
    <>
      <h2>Total Gas Used: {total} ETH</h2>
    </>
  );
};

export default TotalGas;

//RN I have an arry of objects so reduce isn't going to work w/o some modifying. I could use a map function to create
//a new array for each gasPrice & gasUsed portion of each object. I think I can do this w/ a for loop.
