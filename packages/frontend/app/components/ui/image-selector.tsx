"use client";

import { useRef } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ImageSelectorProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-64 h-64 border border-gray-300 rounded-lg overflow-hidden cursor-pointer">
      {selectedImage ? (
        <div className="relative h-full">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected image"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleRemoveImage}
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            <span className="sr-only">Remove image</span>
          </button>
        </div>
      ) : (
        <div
          className="flex items-center justify-center h-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          onClick={handleBoxClick}
        >
          <FontAwesomeIcon icon={faImage} size="xl" />
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Select an image"
      />
    </div>
  );
};
