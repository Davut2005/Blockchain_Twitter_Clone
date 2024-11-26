pragma solidity ^0.8.26;

contract Profile {

    struct UserProfile {
        string userName;
        string bio;
    }

    mapping ( address => UserProfile ) public profiles;

    function setProfile ( string memory userName, string memory bio ) public {
        profiles[msg.sender] = UserProfile( userName, bio ) ;
    }

    function getProfile ( address userAddress) public view returns (UserProfile memory) {
        return profiles[userAddress];
    }

}