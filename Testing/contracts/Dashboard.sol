pragma solidity ^0.5.4;
import "./Factory.sol";

contract Dashboard{
    Factory database;
    string winner;
    uint id;
    constructor(address _database) public {
        database = Factory(_database);
        winner="";
        id=0;
    }
    
    function NewLottery() public returns (Lottery) {
        database.DeployLottery();
        id++;
    }
    
    
    function TotalLottery() public view returns(uint){
        return id;
    }
    
    function OpenLotteryById(uint _id) public{
        Lottery c = Lottery(database.getlotteryById(_id));
        c.ToOpenLottery();
    }
    
    function CloseLotteryById(uint _id) public{
        Lottery c = Lottery(database.getlotteryById(_id));
        c.ToCloseLottery();
    }
    
    function EnterLotteryById(uint _id,string memory _name,uint _age,string memory _region)payable public{
        Lottery c = Lottery(database.getlotteryById(_id));
        c.EnterLottery.value(msg.value)(_name,_age,_region);
    }
    
    function PickWinnerById(uint _id) payable public {
        Lottery c = Lottery(database.getlotteryById(_id));
        winner = c.PickWinner.value(msg.value)();
        
    }
    function Showwinner() public view returns(string memory)
    {
        return winner;
    } 
     
    
}