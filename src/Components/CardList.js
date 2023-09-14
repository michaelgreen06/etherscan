import React from "react";
import Card from "./Card";

const CardList = ({ transactions }) => {
  return (
    <div>
      {transactions.map((item, i) => {
        return (
          <Card
            key={i}
            hash={item.hash}
            from={item.from}
            gasUsed={item.gasUsed}
            gasPrice={item.gasPrice}
            time={item.timeStamp}
          />
        );
      })}
    </div>
  );
};

export default CardList;

//I need this to return an array of JSX card elements
