import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";
import CardList from "./Components/CardList";
import TotalGas from "./Components/TotalGas";

function App() {
  const [account, setAccount] = useState("0x19e50fa5623895d5a2976693eaff5c2f879510ed");
  const [signer, setSigner] = useState("");
  const [transactions, setTransactions] = useState({
    status: 0,
    result: [],
  });
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
        setTransactions(data);
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

  let filteredTransactions = [];
  if (Array.isArray(transactions.result)) {
    filteredTransactions = transactions.result.filter(filterFunc);
    function filterFunc(transaction) {
      return transaction.from.includes(signer.toLowerCase());
    }
  }

  let heading;
  if (filteredTransactions.length === 0) {
    heading = <h1>Enter MultiSig Address to Fetch Transactions</h1>;
  } else {
    heading = <h1>Awesome React Eth Transaction Tracker</h1>;
  }
  //we can only use expressions w/in JSX. Statements need to be outside of JSX
  return (
    <div className="tc">
      {heading}
      <TotalGas transactions={filteredTransactions} />
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

export default App;

//issues to fix:
//5). Set up the api key as an env (process.env)
