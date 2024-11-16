// src/hooks/useContract.ts
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contractConfig";

export const useContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const arra = []

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setSigner(signer);
        setContract(contractInstance);
      } else {
        console.error("Ethereum wallet is not connected");
      }
    };

    initContract();
  }, []);

  return { contract, signer };
};
