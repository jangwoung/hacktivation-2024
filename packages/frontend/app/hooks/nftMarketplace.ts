import { useAccount, useReadContract, useWriteContract } from "wagmi";
import nftMarketplaceAbi from "@/app/ABI/NFTMarketplace.json";

export const useNFTContract = () => {
  const { address } = useAccount();
  const nftMarketplaceAddress = "0xYourNFTMarketplaceAddressHere"; // Replace with actual marketplace address

  // Read NFT balance
  const {
    data: nftBalance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useReadContract({
    address: nftMarketplaceAddress,
    abi: nftMarketplaceAbi,
    functionName: "balanceOf",
    args: [address],
  });

  // Mint NFT
  const {
    writeContract: mintNFT,
    isPending: isMinting,
    isError: isMintError,
  } = useWriteContract();
  const onMintNFT = async (tokenURI: string) => {
    await mintNFT({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "mint",
      args: [tokenURI],
    });
  };

  // List NFT for sale
  const {
    writeContract: listNFTForSale,
    isPending: isListing,
    isError: isListingError,
  } = useWriteContract();
  const onListNFTForSale = async (tokenId: number, price: number) => {
    await listNFTForSale({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "listNFT",
      args: [tokenId, price],
    });
  };

  // Buy NFT
  const {
    writeContract: buyNFT,
    isPending: isBuying,
    isError: isBuyError,
  } = useWriteContract();
  const onBuyNFT = async (tokenId: number, price: number) => {
    await buyNFT({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "buyNFT",
      args: [tokenId],
      value: price,
    });
  };

  return {
    address,
    balance: nftBalance ? Number(nftBalance) : 0,
    isBalanceError,
    isBalanceLoading,
    onMintNFT,
    isMinting,
    isMintError,
    onListNFTForSale,
    isListing,
    isListingError,
    onBuyNFT,
    isBuying,
    isBuyError,
  };
};
