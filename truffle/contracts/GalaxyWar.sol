// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;


// Token-like contract thar
contract GalaxyWar {

    address private _ownerAddress;
    uint256 public _unitPrice;
    modifier onlyowner {
        require(_ownerAddress == msg.sender);
        _;
    }

    mapping (uint256 => uint256) private _planetaryPower;
    mapping (uint256 => address) private _owners;

    constructor(){
        _ownerAddress = msg.sender;
        _unitPrice = 0.01 ether;
    }

    function updateUnitPrice(uint256 newPrice) public onlyowner {
        _unitPrice = newPrice;
    }

    function sendBalanceTo(address to) public onlyowner{
        payable(to).transfer(address(this).balance);
    }

    function getOwner(uint256 planetId) public view returns (address){
        require(_exists(planetId), "Planet doesn't exist yet");
        return _owners[planetId];
    }

    function getPower(uint256 planetId) public view returns (uint256){
        require(_exists(planetId), "Planet doesn't exist yet");
        return _planetaryPower[planetId];
    }

    function _exists(uint256 tokenAddress) internal view returns (bool) {
        return _owners[tokenAddress] != address(0);
    }

    function _verifyPlanets(uint256 from, uint256 to) internal view {
        require(_exists(from), "Source planet does not exist");
        require(_exists(to), "Target planet does not exist");
    }
    
    function mint(uint256 planetId) external payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ether is required to create a planet");
        require(!_exists(planetId), "This planet already exists");

        _planetaryPower[planetId] = 0;
        _owners[planetId] = msg.sender;
    }

    function buyPlanetaryForce(uint256 planetId) external payable {
        require(msg.value >= _unitPrice, "Minimum of 1 unit can be bought");
        require(_exists(planetId), "This planet does not exist");
            
        uint256 forceAmount = msg.value / _unitPrice;
        _planetaryPower[planetId] += forceAmount;
    }

    function sendSupportTo(uint256 from, uint256 to, uint256 forces) external {
       
        _verifyPlanets(from, to);
        require(_owners[from] == msg.sender, "This is not your planet");
        require(forces <= _planetaryPower[from], "You cannot send more forces than you have");

        _planetaryPower[from] -= forces;
        _planetaryPower[to] += forces;
    }

    function startAnAttack(uint256 from, uint256 to, uint256 forces) external  {
        
        _verifyPlanets(from, to);
        require(_owners[from] == msg.sender, "This is not your planet");
        require(forces <= _planetaryPower[from], "You cannot attack with more forces than you have");

        // Do the war
        bool attackerWillWin = forces >= _planetaryPower[to];
        uint256 loosingPower = attackerWillWin ? _planetaryPower[to] : forces;
        uint256 winningPower = attackerWillWin ? forces : _planetaryPower[to];

        uint256 traitors = loosingPower / 4;
        uint256 ratio = winningPower / loosingPower;
        uint256 winnerTolls = winningPower / ratio;

        uint256 winnerRemainingUnits = winningPower + traitors - winnerTolls;

        // If someone attacked and won, he will gain the planet
        if (attackerWillWin) {
            _planetaryPower[from] = winnerRemainingUnits;
            _planetaryPower[to] = 0;
            _owners[to] = _owners[from];
        }

        // If someone attacked and lost, he simply lost all of the forces he has sent.
        else {
            _planetaryPower[to] -= winnerTolls;
            _planetaryPower[to] += traitors;
            _planetaryPower[from] -= forces;
        } 

    }

}