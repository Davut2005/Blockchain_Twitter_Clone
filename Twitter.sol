// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract Twitter {

   address owner; 

   constructor () {
    owner = msg.sender;
   }

   modifier onlyOwner () {
    require( owner == msg.sender, "U a not the owner" );
    _;
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

    function createTweet ( string memory _tweet ) public {
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

    function likeTweet (uint256 id, address author) external {
        require(id > 0 && tweets[author].length > id, "That tweet is unavialable");  

        tweets[author][id].likes++ ;

        emit TweetLiked(msg.sender, author, id, tweets[author][id].likes);
    }

    function unLikeTweet (uint256 id, address author) external hasLikes(id, author) {
        require(id > 0 && tweets[author].length > id, "That tweet is unavialable"); 
        
        tweets[author][id].likes-- ;

        emit TweetUnLiked(msg.sender, author, id, tweets[author][id].likes);
    }

}