import { useState } from 'react'
import './App.css'
import ConnectedAccounts from './ConnectedAccounts'
import Tweets from './Tweets'
import { ethers } from 'ethers';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ConnectedAccounts />
      <Tweets />
    </>
  )
}

export default App
