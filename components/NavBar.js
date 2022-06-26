import Image from "next/image";
import { BackendURL } from "../lib/BackendURL";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";

export default function NavBar(props) {
  const Router = useRouter();
  return (
    <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4">
      {props.back === true ? (
        <div
          className="p-[7.5px] rounded-full hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer"
          onClick={() => Router.back()}
        >
          <IoArrowBack size={20} />
        </div>
      ) : (
        <div className="w-[35px] h-[35px]">
          <Image
            src={`${BackendURL}/images/ufc.jpg`}
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
      )}

      <div className="font-bold text-xl ml-[26px]">{props.title}</div>
    </div>
  );
}
