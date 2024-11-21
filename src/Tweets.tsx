import { useEffect, useState } from 'react'
import { useContract } from './UseContract'
import { ethers } from 'ethers';

const Tweets = () => {

  const [tweetCount, setTweetCount] = useState(1); 
  const [tweets, setTweets] = useState<Promise<any>>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [inputValue, setInputValue] = useState<string>('');

  useEffect( () => {
    async function gettingContract () {
      const {contract , signer} = await useContract(); 
      setContract(contract);
      setSigner(signer);
    };

    if ( contract ) {
      const newTweets = contract.getTweets();
      setTweets(newTweets)
    }
  }, [tweets] );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Input Value:', inputValue);
    if (contract) 
      contract.createTweet(inputValue);
    setInputValue('');
  };

  return (
    <>
      <div className='tweetsContainer mx-[10%] w-auto h-auto items-center justify-center bg-gray-200 border-2 border-gray-500 rounded-lg'>
        <div className='row flex justify-between w-[100%] h-[10vh]'>
          <p className='text-xl m-5'>Tweets ( {tweetCount} )</p>
          <form className='flex row' onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text"
              required
              className="w-full h-[6vh] my-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="px-6 py-2 h-[6vh] my-auto mx-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >                                         
              Submit
            </button>
          </form>
        </div>
          <div className='tweet my-1 border-2 border-gray-700 rounded-lg mx-3 h-auto w-auto'>sdfhgs</div>
      </div>
    </>
  )
}

export default Tweets;
