import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contractConfig';
import { useState } from 'react';

export async function useContract() {

  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [contract, setContract] = useState<ethers.Contract>();

  if (typeof window.ethereum !== 'undefined') {

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    setSigner(signer);
    setContract(contractInstance);
  } else {
    alert('MetaMask is not installed!');
  };

  return {contract, signer};
}
