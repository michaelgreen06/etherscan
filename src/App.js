import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";
import CardList from "./Components/CardList";

function App() {
  const [account, setAccount] = useState("0x19e50fa5623895d5a2976693eaff5c2f879510ed");
  const [signer, setSigner] = useState("0x");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [account]);

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };
  const handleSignerChange = (e) => {
    setSigner(e.target.value);
  };

  let filteredTransactions;
  if (transactions === "Error! Invalid address format") {
    return (filteredTransactions = []);
  } else {
    filteredTransactions = transactions.filter(filterFunc);
    function filterFunc(transaction) {
      return transaction.from.includes(signer.toLowerCase());
    }
  }

  // const filteredTransactions = transactions.filter(filterFunc);
  // function filterFunc(transaction) {
  //   return transaction.from.includes(signer.toLowerCase());
  // }

  if (filteredTransactions.length === 0) {
    return <h1>Enter MultiSig Address to fetch transactions</h1>;
  } else {
    return (
      <div className="tc">
        <h1>Awesome React Eth Transaction Tracker</h1>
        <AccountSearch
          accountChange={handleAccountChange}
          accountValue={account}
        />
        <SignerSearch
          signerChange={handleSignerChange}
          signerValue={signer}
        />
        <CardList transactions={filteredTransactions} />
      </div>
    );
  }
}

export default App;

//9/19/23 finish fixing the code so that the state can be null initially which then shows the "enter multi.." message

//issues to fix:
//1). timestamp is wrong
//2). Want at least 2 cards per line
//3). Want to sum total eth spent
//4). initial state should work w/o using passport multisig - eg should say enter wallet address to populate
//5). Set up the api key as an env (process.env)
//6). change the favicon

//1). I need to write an if statement that renders a "loading" screen if a multisig address isn't entered in
//I don't know where I need to write this if statement. I'm thinking that writing it in the JSX will be best
//because then it will be easy for me to tell it what to do <h1> enter multisig address to see transaction</h1>
