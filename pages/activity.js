import NavBar from "../components/NavBar";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "../lib/BackendURL";
import Image from "next/image";
import Link from "next/link";

export default function ActivityPage() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    Axios.get(`${BackendURL}/profile/activity`).then((response) => {
      if (response.status != 400) {
        setActivity(response.data);
      }
    });
  }, []);
  return (
    <div className="mb-[50px]">
      <NavBar back={true} title="Activity" />
      {activity.map((value) => {
        return (
          <div
            key={value.postid}
            className="px-4 py-2 flex items-center border-t border-gray-200"
          >
            <div className="w-[35px] h-[35px] mr-3">
              <Image
                src={`${BackendURL}/avatars/${value.avatar}`}
                className="rounded-full"
                width={35}
                height={35}
                layout="fixed"
                objectFit="cover"
              />
            </div>
            <div>
              <Link href={`/${value.username}`}>
                <span className="font-bold cursor-pointer hover:underline">
                  {value.username}
                </span>
              </Link>

              {value.type === "like" && <span>{" liked your "}</span>}
              {value.type === "comment" && <span>{" commented on your "}</span>}

              <Link href={`/${value.username}/post/${value.postid}`}>
                <span className="font-bold cursor-pointer hover:underline">
                  post
                </span>
              </Link>

              <span>{". "}</span>
              {value.activitydate.days ? (
                <span className="text-gray-500">
                  {value.activitydate.days}d
                </span>
              ) : value.activitydate.hours ? (
                <span className="text-gray-500">
                  {value.activitydate.hours}h
                </span>
              ) : value.activitydate.minutes ? (
                <span className="text-gray-500">
                  {value.activitydate.minutes}m
                </span>
              ) : (
                <span className="text-gray-500">
                  {value.activitydate.seconds}s
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
