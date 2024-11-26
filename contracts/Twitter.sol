// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol" ;

pragma solidity ^0.8.26;

interface IProfile {
    struct Profile {
        string userName;
        string bio;
    }

    function getProfile (address userAddress) external view returns (Profile memory);
}

contract Twitter is Ownable {

    IProfile profileContract;

    constructor(address _profileContract ,address initialOwner) Ownable(initialOwner) {
        // Additional initialization logic (if any)
        profileContract = IProfile( _profileContract );
    } 

    uint16 max_length_tweet = 280;

    struct Tweet {
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        uint256 id;
    }
    
    mapping(address => Tweet[] ) public tweets;

    event TweetCreated(uint256 id, address author, uint256 timestamp, string content) ;
    event TweetLiked (address liker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event TweetUnLiked (address unLiker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);

    modifier onlyRegistered () {
        require( bytes(profileContract.getProfile(msg.sender).userName).length > 0, "User is not registered" );
        _;
    }

    function createTweet ( string memory _tweet ) public onlyRegistered {
        require(bytes(_tweet).length <= max_length_tweet, "The tweet is too long");

        Tweet memory newTweet = Tweet( {
            author: msg.sender,
            content: _tweet,
            timestamp: block.timestamp,
            likes: 0,
            id: tweets[msg.sender].length
        } );

        tweets[msg.sender].push(newTweet);

        emit TweetCreated(newTweet.id, newTweet.author, newTweet.timestamp, newTweet.content);
    }

   modifier hasLikes (uint256 id, address author) {
    require( tweets[author][id].likes > 0 , "U a not the owner" );
    _;
   }

    function getTweets ( address _owner ) public view returns (Tweet[] memory) {
        return tweets[_owner];
    }

    function getTweet ( address _owner, uint _index ) public view returns ( Tweet memory ) {
        return tweets[_owner][_index];
    } 

    function changeMaxLength (uint16 newMaxLen) public onlyOwner {
        max_length_tweet = newMaxLen;
    }

    function likeTweet (uint256 id, address author) external onlyRegistered {
        require(id > 0 && tweets[author].length > id, "That tweet is unavialable");  

        tweets[author][id].likes++ ;

        emit TweetLiked(msg.sender, author, id, tweets[author][id].likes);
    }

    function unLikeTweet (uint256 id, address author) external hasLikes(id, author) onlyRegistered {
        require(id > 0 && tweets[author].length > id, "That tweet is unavialable"); 
        
        tweets[author][id].likes-- ;

        emit TweetUnLiked(msg.sender, author, id, tweets[author][id].likes);
    }

}