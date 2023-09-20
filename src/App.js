import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";
import CardList from "./Components/CardList";
import TotalGas from "./Components/TotalGas";

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
}

export default App;

//9/21/23 figure out how to get TotalGas component working:

//issues to fix:
//3). Want to sum total eth spent
//5). Set up the api key as an env (process.env)
//7). Cleanup app return statement

//summing the total amount of eth will require some thought. I could always sum the amount of eth spent even if
//the transactions aren't sorted by signer. This is def the MVP. I think I make a new component to sum the amount of eth gas
//It will be above the other cards. Maybe it'll just be an h1. it will need to access the gas used and gasprice for all
//transactions that are currently showing. Currently this data is only showing up in card but I think I can import it
//into a new component as props just I have imported it into Card.
