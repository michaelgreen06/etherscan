import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";
import CardList from "./Components/CardList";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M`
    )
      .then((response) => response.json())
      .then((result) => setTransactions(result));
  }, [account]);
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };
  const handleSignerChange = (e) => {
    setSigner(e.target.value);
  };
  const filteredTransactions = transactions.filter(filterFunc);
  function filterFunc(transaction) {
    return transaction.from.includes(signer.toLowerCase());
  }

  return (
    <div>
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

export default App;

//9/14/23 left off updating the dependency array of useEffect to update when account is changed
// Also not sure if filtered transactions is correct
