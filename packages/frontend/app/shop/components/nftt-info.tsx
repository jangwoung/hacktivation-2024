import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

export const ViewNFT = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-6">
        <div className="w-[12vw] mb-8 aspect-square rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-gray-50"></div>
        <h1 className="text-3xl font-bold">NFT NAME</h1>
        <p className="my-4 font-bold">NFT description</p>
      </div>

      <div className="flex justify-center items-end font-bold mb-4">
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faEthereum} size="xl" className="mr-4" />
          <h1 className="text-2xl mr-2">00.0000</h1>
        </div>
        <h1>ETH</h1>
      </div>

      <input
        type="button"
        value="購入"
        className="py-1 px-6 rounded-md bg-[#1EBFD1] hover:bg-[#2c96c6] duration-200 shadow-[0_2px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_1px_1px_rgba(0,0,0,0.25)] text-white font-bold cursor-pointer"
      />
    </div>
  );
};
