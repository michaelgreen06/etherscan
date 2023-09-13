import "./App.css";
import AccountSearch from "./Components/AccountSearch";
import { useState, useEffect } from "react";
import SignerSearch from "./Components/SignerSearch";

function App() {
  [account, setAccount] = useState("");
  [signer, setSigner] = useState("");
  useEffect(() => {});
  const handleAccountChange = () => {}; //in here I'll setAccountChange state to e.target.value
  const handleSignerChange = () => {}; //in here I'll setSignerChange state to e.target.value
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
    </div>
  );
}

export default App;

//9/13/23 left off finding how to convert wei to eth. card needs to be updated to contain this logic
