import Image from "next/image";
import { BackendURL } from "../lib/BackendURL";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { GiFishingHook } from "react-icons/gi";
import { UserContext } from "../lib/UserContext";
import { useContext } from "react";
import Link from "next/link";

export default function NavBar(props) {
  const { user, setUser } = useContext(UserContext);
  const Router = useRouter();
  return (
    <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4 justify-between">
      <div className="flex items-center">
        {props.back === true ? (
          <div
            className="p-[7.5px] rounded-full hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer"
            onClick={() => Router.back()}
          >
            <IoArrowBack size={20} />
          </div>
        ) : (
          <Link href="/settings">
            <div className="w-[35px] h-[35px]">
              <Image
                src={`${BackendURL}/avatars/${user}`}
                className="rounded-full"
                width={35}
                height={35}
                layout="fixed"
                objectFit="cover"
              />
            </div>
          </Link>
        )}
        <div className="font-bold text-lg ml-[26px]">{props.title}</div>
      </div>

      {props.activity == true && (
        <Link href="/activity">
          <div className="p-[7.5px] rounded-full hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
            <GiFishingHook size={20} />
          </div>
        </Link>
      )}
    </div>
  );
}
