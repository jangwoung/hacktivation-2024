// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    string public name;
    string public symbol;

    struct NFTListing {
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => NFTListing) private _listings;

    uint256 private _tokenIds;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address from, address to, uint256 price);
    event NFTUnlisted(uint256 indexed tokenId);

    constructor() {
        name = "NFTMarketplace";
        symbol = "NFTM";
    }

    modifier onlyOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        _;
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Address zero is not a valid owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token ID does not exist");
        return owner;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenURIs[tokenId];
    }

    function getListingPrice(uint256 tokenId) public view returns (uint256) {
        require(_listings[tokenId].isListed, "NFT is not listed");
        return _listings[tokenId].price;
    }

    function isListed(uint256 tokenId) public view returns (bool) {
        return _listings[tokenId].isListed;
    }

    function listNFT(uint256 tokenId, uint256 price) public onlyOwner(tokenId) {
        require(price > 0, "Price must be greater than 0");
        require(!_listings[tokenId].isListed, "NFT is already listed");

        _listings[tokenId] = NFTListing(price, true);
        emit NFTListed(tokenId, price);
    }

    function unlistNFT(uint256 tokenId) public onlyOwner(tokenId) {
        require(_listings[tokenId].isListed, "NFT is not listed");
        delete _listings[tokenId];
        emit NFTUnlisted(tokenId);
    }

    function buyNFT(uint256 tokenId) public payable {
        require(_listings[tokenId].isListed, "NFT is not listed for sale");
        require(msg.value == _listings[tokenId].price, "Incorrect price");
        
        address seller = ownerOf(tokenId);
        require(msg.sender != seller, "Cannot buy your own NFT");

        // Transfer ownership
        _balances[seller] -= 1;
        _balances[msg.sender] += 1;
        _owners[tokenId] = msg.sender;

        // Clear listing and approvals
        delete _listings[tokenId];
        _approve(address(0), tokenId);

        // Transfer payment to seller
        payable(seller).transfer(msg.value);

        emit NFTSold(tokenId, seller, msg.sender, msg.value);
        emit Transfer(seller, msg.sender, tokenId);
    }

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _owners[newTokenId] = msg.sender;
        _balances[msg.sender] += 1;
        _tokenURIs[newTokenId] = tokenURI;

        emit Transfer(address(0), msg.sender, newTokenId);

        return newTokenId;
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "Approval to current owner");
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "Not authorized");

        _approve(to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public {
        require(operator != msg.sender, "Cannot approve self as operator");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }
}