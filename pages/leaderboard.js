import { useRouter } from "next/router";
import Link from "next/link";
import { GiFishingHook } from "react-icons/gi";
import { BackendURL } from "../lib/BackendURL";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../lib/UserContext";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [hours, setHours] = useState(24);
  const [tab, setTab] = useState("total-caught");
  const { user, setUser } = useContext(UserContext);

  const requestLeaderboard = (ihours, itab) => {
    setHours(ihours);
    setTab(itab);
    Axios.get(`${BackendURL}/leaderboard/${itab}/${ihours}`).then(
      (response) => {
        setLeaderboard(response.data);
        console.log(response.data);
      }
    );
  };

  useEffect(() => {
    requestLeaderboard(24, "total-caught");
  }, []);
  const Router = useRouter();
  return (
    <div>
      <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 z-[1] border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
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

            <div className="font-bold text-lg ml-[26px]">Leaderboard</div>
          </div>

          <div className="p-[7.5px] rounded-full hover:bg-gray-500/20 cursor-pointer">
            <GiFishingHook size={20} />
          </div>
        </div>

        <div className="flex items-center overflow-x-hidden cursor-pointer">
          <div
            className={`p-4 hover:bg-gray-500/20 ${
              tab == "total-caught" ? "border-b-2 border-tblue font-bold" : ""
            }`}
            onClick={() => {
              requestLeaderboard(hours, "total-caught");
            }}
          >
            Caught
          </div>

          <div
            className={`p-4 hover:bg-gray-500/20 ${
              tab == "total-weight" ? "border-b-2 border-tblue font-bold" : ""
            }`}
            onClick={() => {
              requestLeaderboard(hours, "total-weight");
            }}
          >
            Weight
          </div>

          <div
            className={`p-4 hover:bg-gray-500/20 ${
              tab == "biggest" ? "border-b-2 border-tblue font-bold" : ""
            }`}
            onClick={() => {
              requestLeaderboard(hours, "biggest");
            }}
          >
            Biggest
          </div>

          <div
            className={`p-4 hover:bg-gray-500/20 ${
              tab == "smallest" ? "border-b-2 border-tblue font-bold" : ""
            }`}
            onClick={() => {
              requestLeaderboard(hours, "smallest");
            }}
          >
            Smallest
          </div>

          <div
            className={`p-4 hover:bg-gray-500/20 ${
              tab == "longest" ? "border-b-2 border-tblue font-bold" : ""
            }`}
            onClick={() => {
              requestLeaderboard(hours, "longest");
            }}
          >
            Longest
          </div>
        </div>
      </div>

      <div className="px-4 py-3 mb-[50px]">
        <div className="flex mb-2">
          <div
            className={`rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer mr-3 ${
              hours == 24 ? "bg-black text-white hover:bg-black" : ""
            }`}
            onClick={() => {
              requestLeaderboard(24, tab);
            }}
          >
            24 Hours
          </div>
          <div
            className={`rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer mr-3 ${
              hours == 72 ? "bg-black text-white hover:bg-black" : ""
            }`}
            onClick={() => {
              requestLeaderboard(72, tab);
            }}
          >
            3 Days
          </div>
          <div
            className={`rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer mr-3 ${
              hours == 720 ? "bg-black text-white hover:bg-black" : ""
            }`}
            onClick={() => {
              requestLeaderboard(720, tab);
            }}
          >
            30 Days
          </div>
        </div>

        {leaderboard.map((value, index) => {
          return (
            <div key={index} className="p-2 flex justify-between items-center">
              <div className="flex items-center">
                <div>{`#${index + 1}`}</div>
                <div className="flex ml-4 mr-4">
                  <Image
                    src={`${BackendURL}/avatars/${value.avatar}`}
                    className="rounded-full"
                    width={35}
                    height={35}
                    layout="fixed"
                    objectFit="cover"
                  />
                </div>
                <div>{value.username}</div>
              </div>
              <div>{value.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
