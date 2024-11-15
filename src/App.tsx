import { useState } from 'react'
import './App.css'
import ConnectedAccounts from './ConnectedAccounts'
import Tweets from './Tweets'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ConnectedAccounts />
      <Tweets />
    </>
  )
}

export default App
