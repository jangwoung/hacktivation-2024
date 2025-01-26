import Link from "next/link";

import { User } from "./components/user";

export const Header = () => {
  return (
    <div className="fixed top-0 h-[100px] w-[84vw] mx-[8vw] px-10 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="font-bold text-[28px]">Title.</h1>
      </Link>
      <div className="flex gap-10 items-center">
        <ul className="flex gap-4">
          <li className="hover:underline cursor-pointer">
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li className="hover:underline cursor-pointer">
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
        <User />
      </div>
    </div>
  );
};
