import React from "react";

const SignerSearch = ({ signerChange, signerValue }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Enter Signer Address"
        onChange={signerChange}
        value={signerValue}
      />
    </div>
  );
};

export default SignerSearch;
