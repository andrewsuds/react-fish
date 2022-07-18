import Link from "next/link";
import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import { BackendURL } from "../lib/BackendURL";
import Axios from "axios";
import {
  RiHomeFill,
  RiHomeLine,
  RiSearchFill,
  RiSearchLine,
} from "react-icons/ri";
import { FaMap, FaRegMap } from "react-icons/fa";
import { MdLeaderboard, MdOutlineLeaderboard } from "react-icons/md";
import { GiFishingPole } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";

export default function SiteLayout({ children }) {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;
  const Router = useRouter();

  useEffect(() => {
    Axios.get(`${BackendURL}/auth/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setUser(response.data.avatar);
      } else {
        setUser("");
      }
    });
    console.log("Logged In: " + user);
  });

  return (
    <div>
      {Router.pathname == "/" ||
      Router.pathname == "/login" ||
      Router.pathname == "/signup" ? (
        <div>{children}</div>
      ) : (
        <div className="max-w-sm mx-auto">
          <div className="sm:border-x sm:border-gray-200 min-h-screen">
            {children}
          </div>

          {Router.pathname == "/create" ? (
            <div
              className="fixed bottom-[66px] right-[16px] p-3 rounded-full bg-tblue text-white shadow-md cursor-pointer"
              onClick={() => Router.back()}
            >
              <IoArrowBack size={26} />
            </div>
          ) : (
            <Link href="/create">
              <div className="fixed bottom-[66px] right-[16px] p-3 rounded-full bg-tblue text-white shadow-md cursor-pointer">
                <GiFishingPole size={26} />
              </div>
            </Link>
          )}

          <div className="flex fixed left-0 right-0 bottom-0 border-t border-gray-200 bg-white justify-around py-1">
            <Link href="/home">
              <div className="p-[7.5px] hover:bg-gray-200 rounded-full">
                {Router.pathname == "/home" ? (
                  <RiHomeFill size={26} />
                ) : (
                  <RiHomeLine size={26} />
                )}
              </div>
            </Link>

            <Link href="/search">
              <div className="p-[7.5px] hover:bg-gray-200 rounded-full">
                {Router.pathname == "/search" ? (
                  <RiSearchFill size={26} />
                ) : (
                  <RiSearchLine size={26} />
                )}
              </div>
            </Link>

            <Link href="/leaderboard">
              <div className="p-[7.5px] hover:bg-gray-200 rounded-full">
                {Router.pathname == "/leaderboard" ? (
                  <MdLeaderboard size={26} />
                ) : (
                  <MdOutlineLeaderboard size={26} />
                )}
              </div>
            </Link>

            <Link href="/map">
              <div className="p-[7.5px] hover:bg-gray-200 rounded-full">
                {Router.pathname == "/map" ? (
                  <FaMap size={26} />
                ) : (
                  <FaRegMap size={26} />
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
