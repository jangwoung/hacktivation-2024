"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { createClient } from "@/utils/supabase/client";

import { Modal } from "../components/ui/modal";
import { ImageSelector } from "../components/ui/image-selector";

export default function MakeShop() {
  const supabase = createClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectSNS, setSelectSNS] = useState("X");
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [xAddress, setXAddress] = useState("");
  const [instagramAddress, setInstagramAddress] = useState("");
  const [youtubeAddress, setYoutubeAddress] = useState("");

  const handleSubmit = async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      // let imageUrl = selectedImage;
      // if (selectedImage && selectedImage.startsWith("data:")) {
      //   const { data: imageData, error: imageError } = await supabase.storage
      //     .from("shop-images")
      //     .upload(`${address}/${Date.now()}.jpg`, selectedImage);

      //   if (imageError) throw imageError;
      //   imageUrl = imageData.path;
      // }

      const { error } = await supabase.from("shops").insert({
        wallet_address: address,
        // image_url: imageUrl,
        name: shopName,
        description: shopDescription,
        social_media: {
          x: xAddress,
          instagram: instagramAddress,
          youtube: youtubeAddress,
        },
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert("ショップが正常に登録されました！");
    } catch (error) {
      console.error("Error saving shop:", error);
      alert("ショップの登録中にエラーが発生しました。" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const snsComponent = useMemo(() => {
    switch (selectSNS) {
      case "X":
        return (
          <input
            type="text"
            placeholder="https://x.com/"
            value={xAddress}
            className="w-4/5 mt-2 px-2 py-1 rounded-md shadow-inner bg-slate-100 text-sm focus:outline-gray-300"
            onChange={(e) => setXAddress(e.target.value)}
          />
        );
      case "Instagram":
        return (
          <input
            type="text"
            placeholder="https://www.instagram.com/"
            value={instagramAddress}
            className="w-4/5 mt-2 px-2 py-1 rounded-md shadow-inner bg-slate-100 text-sm focus:outline-gray-300"
            onChange={(e) => setInstagramAddress(e.target.value)}
          />
        );
      case "Youtube":
        return (
          <input
            type="text"
            placeholder="https://www.youtube.com/"
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
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
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
      <div className="w-full mt-1 flex flex-col justify-center items-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !address}
          className={`py-2 px-8 rounded-md ${
            address && !isLoading ? "bg-[#3090c8]" : "bg-gray-500"
          } text-white font-bold duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]`}
        >
          {isLoading ? "登録中..." : "登録"}
        </button>
      </div>
    </div>
  );
}
