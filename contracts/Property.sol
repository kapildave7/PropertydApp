// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.11;
pragma experimental ABIEncoderV2;


contract Property {
    address payable public manager;
    uint256 public userId;
    uint256 public propertyId;

    constructor(){
        manager = payable(msg.sender);
    }
    //vallid user modifier

    modifier onlyValidUser {
        Profile memory _user = profiles[userId];
       require(_user.validUser == true && _user.userAddress == msg.sender, "you are not a vaild user");
       _; 
    }

    //only Manager modifier

    modifier onlyManager {
        require(msg.sender == manager, "you are not a manager");
        _;
    }

    // User Profile Struct

    struct Profile {
        string userName;
        address userAddress;
        uint256 userMobile;
        uint256 userId;
        string emailAddress;
        uint256 userPanCrad;
        uint256 userAdharCrad;
        bool validUser;
    }
    mapping(uint=>Profile) public profiles;

    // List property Struct

    struct ListProperty {
        Profile profileData;
        uint256 currentPropertyId;
        uint listingAmount;
        uint availableAmount;
        uint256 longitude;
        uint256 latitude;
        string propertySize;
        // string description;
        string residentialAddress;
        uint256 durationsDays;
        uint256 minimumAmount;
        string ipfsHash;
        address payable userAddress;
    }

    mapping(uint=>ListProperty) public listProperties;

    // ListProperty[] public listProperties;


    //investing

    struct Invest {
        Profile profileData;
        uint256 investedPropertyId;
        uint256 userId;
        uint investingAmount;
        uint time;
    }

    Invest[] public investings;


    //Creating New User Profile

    function profile(string memory _name,uint256 _mobile, string memory _email, uint256 _pan, uint256 _adhar) public payable   {
        for(uint i=0; i<= userId; i++){
        address newaddress = profiles[i].userAddress;
        require(newaddress != msg.sender, "This address is alreday axist");
        }
        userId ++;
        profiles[userId]=Profile(_name, msg.sender,_mobile,userId,_email,_pan,_adhar, true);
    }

    //List your Property 

    function listNewProperty(uint _userId,uint256 _long,uint256 _lati,string memory _size, string memory _rAddress, uint256 _dueDate, uint256 _minAmount, string memory _ipfsHash) public payable {
        require(msg.value > 0,"enter the listing amount");
        Profile memory _userProfileData = profiles[_userId];
        require(_userProfileData.validUser == true,"you are not a valid user");
         propertyId ++;
         listProperties[propertyId] = ListProperty(_userProfileData,propertyId,msg.value,msg.value,_long,_lati,_size,_rAddress,_dueDate,_minAmount, _ipfsHash, payable (msg.sender));
    }

    //Investing in property

    function investing(uint _propertyId, uint _userId) public payable  {
        Profile memory _userProfileData = profiles[_userId];
        ListProperty memory _singleList = listProperties[_propertyId];

        //minium amount check
        require(_singleList.minimumAmount <= msg.value, "Invest accordingly minium amount");
        require(_singleList.availableAmount >= msg.value, "Invest less than available amount");
        require(_userProfileData.validUser == true,"you are not a valid user");
        Invest memory _newInvest = Invest({
            profileData: _userProfileData,
            investedPropertyId: _propertyId,
            investingAmount: msg.value,
            userId: _userProfileData.userId,
            time: block.timestamp
        });

      
        _singleList.availableAmount = _singleList.availableAmount - msg.value;
       listProperties[_propertyId] = _singleList;
       investings.push(_newInvest);
        //transfer ether into manager account
       manager.transfer(msg.value);
    }

    function transferEthToOwner(uint _id) public payable onlyManager {
        ListProperty memory _listed = listProperties[_id];
        require(_listed.availableAmount == 0, "Listing still open");
        uint _transferValue = _listed.listingAmount;
        address payable _transferAccount = _listed.userAddress;
        _transferAccount.transfer(_transferValue);
    }

}