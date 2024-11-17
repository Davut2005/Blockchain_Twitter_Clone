import React, { useState } from "react";

const ConnectedAccounts = () => {

  const [accounts, setAccounts] = useState<string[]>();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
        setAccounts(accounts);
        console.log(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <>
    <div className="flex m-auto my-7 items-center justify-center border-2 border-black rounded-lg bg-gray-100 connectWalletContainer">
        <div className="w-96 h-30 mx-auto bg-white shadow-lg rounded-lg flex-column items-center justify-center">
            <h1 className="mx-[25%] text-3xl text-blue-800">Tweet Dapp</h1>
            <button onClick={connectWallet} className="w-[100%] h-20 my-2 bg-blue-500 text-white font-bold rounded-lg border-4 border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <h1 className="">Connect your Wallet</h1>
            </button>
            {accounts?.length ? <p className="text-1xl"> Connected Wallet address is {accounts[0]} </p> : null}
        </div>    
    </div>
    </>
  )
}

export default ConnectedAccounts;
