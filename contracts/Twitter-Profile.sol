pragma solidity ^0.8.26;

contract Profile {

    struct UserProfile {
        string userName;
        string bio;
        string joinedDate;
    }

    mapping ( address => UserProfile ) public profiles;

    function setProfile ( string memory userName, string memory bio, string memory joinedDate ) public {
        profiles[msg.sender] = UserProfile( userName, bio, joinedDate ) ;
    }

    function getProfile ( address userAddress) public view returns (UserProfile memory) {
        return profiles[userAddress];
    }

}