import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";
import CardList from "./Components/CardList";

function App() {
  const [account, setAccount] = useState("");
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

  if (filteredTransactions.length === 0) {
    return (
      <div className="tc">
        <h1>Enter MultiSig Address to fetch transactions</h1>
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

//9/20/23 work on the below issues:

//issues to fix:
//1). timestamp is wrong
//2). Want at least 2 cards per line
//3). Want to sum total eth spent
//4). initial state should work w/o using passport multisig - eg should say enter wallet address to populate (done 9/19/23)
//5). Set up the api key as an env (process.env)
//6). change the favicon
