import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useNFTContract } from "@/app/hooks/nftMarketplace";

export const ViewNFT = () => {
  const { onMintNFT } = useNFTContract();

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftPrice, setNftPrice] = useState(0);
  const { address } = useAccount();

  const handleSubmit = async () => {
    if (!address) {
      alert("ウォレットアドレスが接続されていません。");
      return;
    }

    if (!nftName || !nftDescription || nftPrice <= 0) {
      alert("全ての項目を入力してください。");
      return;
    }

    try {
      const tokenURI = await createTokenURI(nftName, nftDescription);
      const tokenId = await onMintNFT(tokenURI);

      alert("NFTが正常に発行されました！");
      console.log(tokenId);

      setNftName("");
      setNftDescription("");
      setNftPrice(0);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("NFTの発行中に予期しないエラーが発生しました。");
    }
  };

  const createTokenURI = async (name: string, description: string) => {
    const metadata = {
      name,
      description,
      image: "https://example.com/path/to/image.png",
    };

    const metadataJson = JSON.stringify(metadata);
    const ipfsUrl = await uploadMetadataToIPFS(metadataJson);
    return ipfsUrl;
  };

  const uploadMetadataToIPFS = async (metadataJson: string) => {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "your-api-key",
          pinata_secret_api_key: "your-secret-api-key",
        },
        body: JSON.stringify({
          pinataOptions: { cidVersion: 1 },
          pinataContent: metadataJson,
        }),
      }
    );

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-6">
        <div className="w-[12vw] mb-8 aspect-square rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-gray-50"></div>
        <input
          type="text"
          className="text-3xl font-bold text-center"
          placeholder="NFT NAME"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
        />
        <input
          type="text"
          className="my-4 font-bold text-center"
          placeholder="NFT description"
          value={nftDescription}
          onChange={(e) => setNftDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-end font-bold mb-4">
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faEthereum} size="xl" className="mr-4" />
          <input
            type="number"
            min="0"
            step={0.00001}
            className="w-40 text-2xl mr-2 text-center"
            placeholder="0.0000"
            value={nftPrice}
            onChange={(e) => setNftPrice(Number(e.target.value))}
          />
        </div>
        <h1>ETH</h1>
      </div>

      <input
        type="button"
        value="発行"
        className="py-1 px-6 rounded-md bg-[#1EBFD1] hover:bg-[#2c96c6] duration-200 shadow-[0_2px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_1px_1px_rgba(0,0,0,0.25)] text-white font-bold cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
};
