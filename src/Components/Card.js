import React from "react";

const Card = ({ hash, from, gas, gasPrice }) => {
  return (
    <div>
      <img
        alt="Robot Representing a Transaction"
        src={`https://robohash.org/${hash}?size=200x200`}
      />
    </div>
  );
};

export default Card;
