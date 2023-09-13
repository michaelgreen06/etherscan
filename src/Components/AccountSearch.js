import React from "react";

const AccountSearch = ({ accountChange, accountValue }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Enter MultiSig Address"
        onChange={accountChange}
        value={accountValue}
      />
    </div>
  );
};

export default AccountSearch;

// using 0x19e50fa5623895d5a2976693eaff5c2f879510ed for testing
//api docs: https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
//transaction cost = gasUsed*gasPrice (needs to be divided by 1x10^18 to get ether cost)
// https://api.etherscan.io/api
// ?module=account
// &action=txlist
// &address=0x19e50fa5623895d5a2976693eaff5c2f879510ed
// &startblock=0
// &endblock=99999999
// &page=1
// &offset=10
// &sort=desc
// &apikey=S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M
