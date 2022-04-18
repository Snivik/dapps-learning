pragma solidity ^0.8;


contract SmartWallet {

    struct Account {
        uint256 balance;
        mapping (address => uint256) allowance; 
    }

    
    mapping (address => Account) public accounts;

    event Replenished(address account, uint256 balance);
    event AllowanceIsSet(address from, address to, uint256 allowance);
    event Withdrawn(address from, address to, uint256 amount);
    
    
    /**
        Internal function to replenish any account with
        a value from a message
     */
    function _replenishAccount(address account) internal {
        accounts[account].balance += msg.value;
        emit Replenished(account, accounts[account].balance);
    }

    /**
     * Returns balance of your account
     */
    function getBalance() public view returns(uint256){
        return accounts[msg.sender].balance;
    }

    /**
     * Returns allowance for certain individual and maximum withdrawable amount
     */
    function getAllowance(address from) public view returns(uint256 allowance, uint256 withdrawable){
        require(from != msg.sender, 'You do not have allowance for yourself');
        uint256 a = accounts[from].allowance[msg.sender];
        return (
            a,
            accounts[from].balance % a
        );
    }


    /**
     * Sets permittable allowance for a certain address to withdraw from an account
     */
    function setAllowance(address to, uint256 amount) public {
        accounts[msg.sender].allowance[to] = amount;
        emit AllowanceIsSet(msg.sender, to, amount);
    }

    
    /**
     * Lets you withdrwaw from your account or any other account that has funds from your allowance
     */
    function withdrawFrom(address from, uint256 amount) public {  
        require(accounts[from].balance >= amount, 'You are trying to withdraw more than user has');
        if (from != msg.sender){
            require(accounts[from].allowance[msg.sender] >= amount, 'You cannot exceed your allowance');
            accounts[from].allowance[msg.sender] -= amount;
        }

        accounts[from].balance -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(from, msg.sender, amount);
    }

    /** 
    * Deposit money to a certain account
    */
    function depositMoneyTo(address to) external payable{
        _replenishAccount(to);
    }

    /** 
    * Deposit money to sender's account
    */
    function depositMoney() external payable {
        _replenishAccount(msg.sender);
    }

    

    // Technical stuff
    address payable owner;

    modifier onlyContractOwner{
        require(msg.sender == owner);
        _;
    }

    constructor(){
        owner = payable(msg.sender);
    }

    receive() external payable {
       _replenishAccount(msg.sender);
    }  

    function destroy(address payable to) public onlyContractOwner{
        require(msg.sender == owner, 'Only owner can destroy a contract');
        selfdestruct(to);
        
    }

}