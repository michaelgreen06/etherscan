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
  const filteredTransactions = transactions.filter(filterFunc);
  function filterFunc(transaction) {
    return transaction.from.includes(signer.toLowerCase());
  }

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

export default App;

//9/15/23 app "works" but could use many improvements
//next time try to reuse old .then fetch code

// async function fetchData() {
//   try {
//     const response = await fetch(
//       `https://api.etherscan.io/api?module=account&action=txlist&address=0x19e50fa5623895d5a2976693eaff5c2f879510ed&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M`
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data.result); // You can do something with the fetched data here
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// fetchData();
