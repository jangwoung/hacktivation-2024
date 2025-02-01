"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { createClient } from "@/utils/supabase/client";

import { Modal } from "../components/ui/modal";
import { ViewNFT } from "./components/view-nft";
import { ImageSelector } from "../components/ui/image-selector";

export default function MakeShop() {
  const supabase = createClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectSNS, setSelectSNS] = useState("X");

  const { address } = useAccount();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [shopDescription, setShopDescription] = useState<string>("");
  const [xAddress, setXAddress] = useState<string>("");
  const [instagramAddress, setInstagramAddress] = useState<string>("");
  const [youtubeAddress, setYoutubeAddress] = useState<string>("");

  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase.from("shops").select("*");
      if (error) {
        console.error("Error fetching shops:", error);
      } else {
        if (address) {
          const matchingShop = data.find(
            (shop) => shop.wallet_address === address
          );
          if (matchingShop) {
            setSelectedImage(matchingShop.image_url);
            setShopName(matchingShop.name);
            setShopDescription(matchingShop.description);
            setXAddress(matchingShop.social_media.x || "");
            setInstagramAddress(matchingShop.social_media.instagram || "");
            setYoutubeAddress(matchingShop.social_media.youtube || "");
          }
        }
      }
    };
    fetchShops();
  }, []);

  const handleSubmit = async () => {
    if (!address) return;

    try {
      const { data: existingShops, error: fetchError } = await supabase
        .from("shops")
        .select("*")
        .eq("wallet_address", address);

      if (fetchError) throw fetchError;

      const shopData = {
        wallet_address: address,
        name: shopName,
        description: shopDescription,
        social_media: {
          x: xAddress,
          instagram: instagramAddress,
          youtube: youtubeAddress,
        },
      };

      let error;

      if (existingShops && existingShops.length > 0) {
        const { error: updateError } = await supabase
          .from("shops")
          .update(shopData)
          .eq("wallet_address", address);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from("shops").insert({
          ...shopData,
          created_at: new Date().toISOString(),
        });
        error = insertError;
      }

      if (error) throw error;

      alert(
        existingShops && existingShops.length > 0
          ? "ショップ情報が更新されました！"
          : "ショップが正常に登録されました！"
      );
    } catch (error) {
      console.error("Error saving shop:", error);
      alert("ショップの保存中にエラーが発生しました。" + error);
    }
  };

  const snsComponent = useMemo(() => {
    switch (selectSNS) {
      case "X":
        return (
          <input
            type="text"
            placeholder="https://x.com/…"
            value={xAddress}
            className="w-4/5 mt-2 px-2 py-1 rounded-md shadow-inner bg-slate-100 text-sm focus:outline-gray-300"
            onChange={(e) => setXAddress(e.target.value)}
          />
        );
      case "Instagram":
        return (
          <input
            type="text"
            placeholder="https://www.instagram.com/…"
            value={instagramAddress}
            className="w-4/5 mt-2 px-2 py-1 rounded-md shadow-inner bg-slate-100 text-sm focus:outline-gray-300"
            onChange={(e) => setInstagramAddress(e.target.value)}
          />
        );
      case "Youtube":
        return (
          <input
            type="text"
            placeholder="https://www.youtube.com/…"
            value={youtubeAddress}
            className="w-4/5 mt-2 px-2 py-1 rounded-md shadow-inner bg-slate-100 text-sm focus:outline-gray-300"
            onChange={(e) => setYoutubeAddress(e.target.value)}
          />
        );
      default:
        return null;
    }
  }, [selectSNS, xAddress, instagramAddress, youtubeAddress]);

  return (
    <div className="h-full w-[90%] mx-[5%]">
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <ViewNFT />
        </Modal>
      )}
      <div className="flex">
        <div className="flex justify-center items-center aspect-square w-[50%]">
          <ImageSelector
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-[60%] text-center">
          <div className="flex flex-col justify-center items-center w-full">
            <input
              type="text"
              value={shopName}
              placeholder="Shop Name"
              className="font-bold text-3xl text-center border-b-2 pb-1 focus:outline-none focus:border-gray-500"
              onChange={(e) => setShopName(e.target.value)}
            />
            <textarea
              value={shopDescription}
              placeholder="Shop Description"
              className="w-[80%] min-h-24 mt-4 p-2 rounded-md text-lmd border-2 resize-none border-white focus:outline-none focus:border-gray-300"
              onChange={(e) => setShopDescription(e.target.value)}
            />
          </div>
          <ul className="flex gap-8 my-4">
            <li
              onClick={() => setSelectSNS("X")}
              className={`flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${
                selectSNS == "X" ? "text-black" : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon icon={faXTwitter} size="xl" />
            </li>
            <li
              onClick={() => setSelectSNS("Instagram")}
              className={`flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${
                selectSNS == "Instagram" ? "text-black" : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </li>
            <li
              onClick={() => setSelectSNS("Youtube")}
              className={`flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${
                selectSNS == "Youtube" ? "text-black" : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </li>
          </ul>
          {snsComponent}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`w-60 py-2 px-8 mb-10 rounded-md border-2 border-gray-400 font-bold duration-200 hover:border-[#3090c8]`}
        >
          NFTの編集
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`w-40 py-2 px-8 rounded-md bg-[#3090c8] text-white font-bold duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]`}
        >
          登録
        </button>
      </div>
    </div>
  );
}
