pragma solidity ^0.5.0;

contract Lottery
{
    struct player{
        string  name;
        uint age;
        string region;
        address  payable user;
    }
   address public owner;
   
   
   uint public playercount;
   enum State{OPEN,CLOSED}
   player[]  playerList;
   
    
   State public currentstate;
   event Player(string _Name,uint256 _bet);
   event LotteryState(State _state);
 
  
  constructor()public
  {
    owner=tx.origin;
    playercount=0;
    currentstate = State.OPEN;
    emit LotteryState(currentstate);
    
  }
  
  modifier OnlyOwner()
    {
        require(tx.origin==owner,"only the owner can call it");
        _;
    }
   modifier LotteryOpen{
       require(currentstate == State.OPEN,"State Should be Open.");
       _;
   } 
   modifier LotteryClosed{
       require(currentstate == State.CLOSED,"State Should be Closed.");
       _;
   }
   
   function ToOpenLottery() public OnlyOwner{
       currentstate = State.OPEN;
      emit LotteryState(currentstate);  
       
   }
   function ToCloseLottery() public OnlyOwner{
       currentstate = State.CLOSED;
       emit LotteryState(currentstate);
   }
   
  function EnterLottery(string memory _name,uint _age,string memory _region) payable public LotteryOpen
   {
    require(tx.origin!=owner && msg.value>0.01 ether,"Owner Can't bet or ether should be more than 0.01 or State has to be Opened.");
     playerList.push(player(_name,_age,_region,tx.origin));
     playercount++;
     emit Player(_name,msg.value);
  }
  
   
    function Random() private view returns(uint)
    {
        return uint(keccak256(abi.encode(block.number,block.coinbase)));
    }
    

   function PickWinner() public OnlyOwner payable LotteryClosed returns(string memory)
      {   
        uint index=Random()%playerList.length;
        playerList[index].user.transfer(address(this).balance);
        return playerList[index].name;
         
     }
    
     
}