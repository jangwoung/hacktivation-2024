"use client";

import { useState, useEffect } from "react";
import { useNFTContract } from "@/app/hooks/nftMarketplace"; // 修正: useNFTContractのフックを使う
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { createClient } from "@/utils/supabase/client";
import { Modal } from "@/app/components/ui/modal";
import { ViewNFT } from "@/app/make-shop/components/view-nft";

const supabase = createClient();

interface SocialMedia {
  x?: string;
  youtube?: string;
  instagram?: string;
}

interface Shop {
  id: string;
  wallet_address: string;
  image_url: string | null;
  name: string;
  description: string;
  social_media: SocialMedia;
  created_at: string;
}

interface NFT {
  tokenId: number;
  name: string;
  imageUrl: string;
  price: number;
}

export default function Shop({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [shop, setShop] = useState<Shop | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const { onListNFTForSale } = useNFTContract(); // 修正: useNFTContractのフックを使う

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setWalletAddress(resolvedParams.address);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase.from("shops").select("*");
      if (error) {
        console.error("Error fetching shops:", error);
      } else {
        if (walletAddress) {
          const matchingShop = data.find(
            (shop) => shop.wallet_address === walletAddress
          );
          if (matchingShop) {
            setShop(matchingShop);
          }
        }
      }
    };
    fetchShops();
  }, [walletAddress]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const nftData = [
        { tokenId: 1, name: "NFT 1", imageUrl: "/nft1.png", price: 0.5 },
        { tokenId: 2, name: "NFT 2", imageUrl: "/nft2.png", price: 1.0 },
      ];
      setNfts(nftData);
    };
    fetchNFTs();
  }, []);

  const onListNFTForSaleHandler = async (tokenId: number, price: number) => {
    try {
      await onListNFTForSale(tokenId, price); // onListNFTForSaleを呼び出す
      console.log("NFT has been listed successfully!");

      // リスト後にnftsに追加
      const newNFT = {
        tokenId,
        name: `NFT ${tokenId}`,
        imageUrl: `/nft${tokenId}.png`,
        price,
      };
      setNfts((prevNfts) => [...prevNfts, newNFT]); // 新しいNFTをnftsに追加
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  return (
    <div className="h-full w-[90%] mx-[5%]">
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <ViewNFT />
        </Modal>
      )}

      <div className="flex">
        <div className="flex justify-center items-center aspect-square w-[50%]">
          <div className="aspect-square bg-black w-[60%]">image</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[60%] text-center">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="font-bold text-3xl">{shop?.name}</h1>
            <p className="w-[80%] min-h-24 mt-4 text-lmd">
              {shop?.description}
            </p>
          </div>
          <ul className="flex gap-8 my-4">
            {shop?.social_media?.x && (
              <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                <a
                  href={shop.social_media.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faXTwitter} size="xl" />
                </a>
              </li>
            )}
            {shop?.social_media?.instagram && (
              <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                <a
                  href={shop.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="xl" />
                </a>
              </li>
            )}
            {shop?.social_media?.youtube && (
              <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                <a
                  href={shop.social_media.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} size="xl" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        {nfts.map((nft) => (
          <div
            key={nft.tokenId}
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            <h1 className="font-bold my-2">{nft.name}</h1>
            <div className="sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full bg-white duration-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="mt-2 text-lg font-semibold">{nft.price} ETH</div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
              onClick={() => onListNFTForSaleHandler(nft.tokenId, nft.price)}
            >
              List for Sale
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
