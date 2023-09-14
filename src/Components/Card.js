import React from "react";

const Card = ({ hash, from, gasUsed, gasPrice, time }) => {
  return (
    <div>
      <img
        alt="Robot Representing a Transaction"
        src={`https://robohash.org/${hash}?size=200x200`}
      />
      <p>Date of Transaction: {Date(time * 1000)}</p>
      <p>Signer: {from}</p>
      <p>Eth Paid: {(gasPrice * gasUsed) / 1e18}</p>
    </div>
  );
};

export default Card;
