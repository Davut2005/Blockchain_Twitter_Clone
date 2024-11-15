import { useEffect, useState } from 'react'
import { useContract } from './UseContract'

const Tweets = () => {

  const {contract , signer} = useContract();  
  const [tweetCount, setTweetCount] = useState(1); 
  const [tweets, setTweets] = useState<Promise<any>>()

  const createTweet = () => {
    if (contract) 
        contract.createTweet('helloooo');
  };
  useEffect( () => {
    if ( contract ) {
        const newTweets = contract.getTweets();
        setTweets(newTweets)
    }
  }, [tweets] )
  

  return (
    <>
      <div className='tweetsContainer mx-[10%] w-auto h-auto items-center justify-center bg-gray-200 border-2 border-gray-500 rounded-lg'>
        <div className='row flex justify-between w-[100%] h-[10vh]'>
          <p className='text-xl m-5'>Tweets ( {tweetCount} )</p>
          <button 
            className='bg-blue-500 my-auto h-[70%] text-white mr-1 font-bold rounded-lg border-4 border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400' 
            onClick={() => createTweet()}>Create Tweet</button>
        </div>
          <div className='tweet border-2 border-gray-700 rounded-lg mx-3 h-auto w-auto'>sdfhgs</div>
      </div>
    </>
  )
}

export default Tweets;
