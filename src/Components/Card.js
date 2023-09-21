import React from "react";

const Card = ({ hash, from, gasUsed, gasPrice, time }) => {
  const millisec = time * 1000;
  const dateObject = new Date(millisec);
  const formatDate = dateObject.toLocaleString();
  return (
    <div className="dib pa2 bg-lightest-blue ma2 br4">
      <img
        alt="Robot Representing a Transaction"
        src={`https://robohash.org/${hash}?size=200x200`}
      />
      <p>Date of Transaction: {formatDate}</p>
      <p>Signer: {from}</p>
      <p>Eth Paid: {(gasPrice * gasUsed) / 1e18}</p>
      <a
        href={`https://etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noreferrer"
      >
        <p>See Transaction on Etherscan</p>
      </a>
    </div>
  );
};

export default Card;
