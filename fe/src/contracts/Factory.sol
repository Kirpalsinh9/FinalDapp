pragma solidity ^0.5.4;
import "./Lottery.sol";

contract Factory{
    uint public currentlotteryId;
    mapping(uint => Lottery) Lotteries;
    event Newlottery(address _owner,uint _id);
    
    function DeployLottery() public {
        currentlotteryId++;
        Lottery c = new Lottery();
        Lotteries[currentlotteryId] = c;
        emit Newlottery(msg.sender,currentlotteryId);
    }
    
    function getlotteryById(uint _id) public view returns (Lottery) {
        return Lotteries[_id];
    }
}