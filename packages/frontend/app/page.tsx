"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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

export default function Home() {
  const router = useRouter();

  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase
        .from("shops")
        .select("name, description, wallet_address");
      if (error) {
        console.error("Error fetching shops:", error);
      } else {
        setShops(data as Shop[]);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-center items-center pt-20 pb-16">
        <input
          type="text"
          placeholder="検索ワードを入力してください"
          className="min-w-[32vw] border-[#CECECE] border-b-2 text-center text-lg focus:outline-none focus:border-[#7d7d7d]"
        />
      </div>
      <div className="grid sm:grid-cols-4 sm:grid-rows-2 gap-6 w-[80%]">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="aspect-[3/4] bg-white border-b-2 border-[#7d7d7d] duration-200 hover:shadow-lg"
            onClick={() => router.push(`/shop/${shop.wallet_address}`)}
          >
            <div className="bg-gray-400 aspect-square"></div>
            <div className="px-1">
              <h1 className="font-bold">{shop.name}</h1>
              <p className="text-sm">{shop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
