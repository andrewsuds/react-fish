import Image from "next/image";
import { Menu } from "@headlessui/react";
import { BackendURL } from "../lib/BackendURL";
import { useRouter } from "next/router";
import { UserContext } from "../lib/UserContext";
import { AvatarContext } from "../lib/AvatarContext";
import { useContext } from "react";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { GiFishingHook } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import Axios from "axios";

export default function NavBar(props) {
  const { avatar } = useContext(AvatarContext);
  const { user } = useContext(UserContext);
  const Router = useRouter();
  return (
    <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4 justify-between">
      <div className="flex items-center">
        {props.back === true ? (
          <div
            className="p-[7.5px] rounded-full hover:bg-gray-500/20 cursor-pointer"
            onClick={() => Router.back()}
          >
            <IoArrowBack size={20} />
          </div>
        ) : (
          <Menu as="div" className="relative w-[35px] h-[35px]">
            <Menu.Button className="flex focus:outline-none">
              <Image
                src={`${BackendURL}/avatars/${avatar}`}
                className="rounded-full bg-gray-200"
                width={35}
                height={35}
                layout="fixed"
                objectFit="cover"
              />
            </Menu.Button>

            <Menu.Items className="absolute origin-top-left left-0 mt-3 w-[150px] rounded-md bg-white drop-shadow-md border border-gray-200 focus:outline-none cursor-pointer overflow-hidden">
              <Link href={`/${user}`}>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`flex items-center p-4 ${
                        active ? "bg-gray-100" : "hover:bg-gray-100"
                      } `}
                    >
                      <FaRegUser size={16} className="mr-3" />
                      Profile
                    </a>
                  )}
                </Menu.Item>
              </Link>

              <Link href="/settings">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`flex items-center p-4 ${
                        active ? "bg-gray-100" : "hover:bg-gray-100"
                      } `}
                    >
                      <FiSettings size={16} className="mr-3" />
                      Settings
                    </a>
                  )}
                </Menu.Item>
              </Link>

              <Menu.Item
                onClick={() => {
                  Axios.post(`${BackendURL}/auth/logout`).then((response) => {
                    Router.push("/");
                  });
                }}
              >
                {({ active }) => (
                  <a
                    className={`flex items-center p-4 ${
                      active ? "bg-gray-100" : "hover:bg-gray-100"
                    } `}
                  >
                    <MdLogout size={16} className="mr-3" />
                    Log out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        )}
        <div className="font-bold text-lg ml-[26px]">{props.title}</div>
      </div>

      {props.activity == true && (
        <Link href="/activity">
          <div className="p-[7.5px] rounded-full hover:bg-gray-500/20 cursor-pointer">
            <GiFishingHook size={20} />
          </div>
        </Link>
      )}
    </div>
  );
}
