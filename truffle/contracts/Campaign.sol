// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;


/**
    A contract where a creator can set up milestones and other users can donate to
    Reaching each milestone will unlock certain amount for creator and provide offchain
    sources info that milestone is unlocked and certain info can be revealed to people who donated a minimum pledge
 */
contract Campaign is Ownable {

    mapping (address => uint256) public donations;

    uint256 private _withdrawn;
    uint256 private _withdrawableAmount;

    uint256[] public milestones;
    uint256 immutable public milestonesCount;
    uint256 immutable public minPledge;
    uint256 public donatedAmount;
    uint256 public currentMilestone; // index
   
   
    constructor(uint256[] memory _milestones, uint256 _minPledge) Ownable() {
        milestones = _milestones;
        milestonesCount = _milestones.length;
        minPledge = _minPledge;
    }

    function campaignIsFinished() public view returns (bool){
        return currentMilestone >= milestonesCount;
    }

    /**
        Lets the owner of the campaign to collect money for each milestone
        or all the money of the contract if campaign is finished
     */
    function collect() public onlyOwner {
        if (campaignIsFinished()){
            _withdrawn += address(this).balance;
            payable(owner()).transfer(address(this).balance);
        } else {
            require(_withdrawableAmount > _withdrawn, "Campaign: You don't have anything to withdraw");
            uint256 amount = _withdrawableAmount - _withdrawn;
            _withdrawn += amount;
            payable(owner()).transfer(amount);
        }
        
    }

    /**
        A boolean flag that confirms whether a certain user can see
        the content or not
     */
    function canSeeContent(uint256 step) public view returns (bool){
        if (owner() == msg.sender) return true;
        return (currentMilestone > step) && (donations[msg.sender] >= minPledge);
    }

    receive() external payable  {
        require(msg.value >= minPledge, "Campaign: less than min pledge");
        donatedAmount+= msg.value;
        donations[msg.sender] += msg.value;

        while ( (currentMilestone < milestonesCount) && (donatedAmount > milestones[currentMilestone])){
            currentMilestone+=1;
            _withdrawableAmount = milestones[currentMilestone-1];
        } 
    }

}
