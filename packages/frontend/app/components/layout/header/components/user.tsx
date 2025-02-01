"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const User = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`fixed flex justify-center items-center duration-500 h-20 min-w-64 px-8 right-[8vw] rounded-lg 
        bg-gradient-to-br from-[#8bdbe3] to-[#3090c8] shadow-md ${
          isHovered ? "top-2" : "top-[-200px]"
        }`}
      >
        <ConnectButton />
      </div>
      <Link href={"/mypage"}>
        <FontAwesomeIcon icon={faCircleUser} size="xl" />
      </Link>
    </div>
  );
};
