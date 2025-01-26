import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Shop() {
  return (
    <div className="h-full w-[90%] mx-[5%]">
      <div className="flex">
        <div className="flex justify-center items-center aspect-square w-[50%]">
          <div className="aspect-square bg-black w-[60%]">image</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[60%] text-center">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="font-bold text-3xl">Shop Name</h1>
            <p className="w-[80%] min-h-20 mt-4 text-lmd">Shop Description</p>
          </div>
          <ul className="flex gap-8 my-4">
            <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
              <FontAwesomeIcon icon={faXTwitter} size="xl" />
            </li>
            <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </li>
            <li className="flex justify-center items-center w-12 h-12 rounded-2xl duration-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </li>
          </ul>
        </div>
      </div>

      <div className="fixed grid grid-cols-5 bottom-0 w-[72vw] sm:min-h-52 2xl:min-h-72  px-[9vw] pt-4 pb-10 shadow-inner rounded-t-lg bg-[#F4F2F3]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold my-2">FNT Name</h1>
          <div className="sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full bg-white duration-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold my-2">FNT Name</h1>
          <div className="sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full bg-white duration-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold my-2">FNT Name</h1>
          <div className="sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full bg-white duration-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold my-2">FNT Name</h1>
          <div className="sm:w-20 sm:h-20 2xl:w-24 2xl:h-24 rounded-full bg-white duration-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)]"></div>
        </div>
      </div>
    </div>
  );
}
