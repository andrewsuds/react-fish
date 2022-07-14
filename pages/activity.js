import NavBar from "../components/NavBar";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "../lib/BackendURL";
import Image from "next/image";
import Link from "next/link";
import { GiCirclingFish } from "react-icons/gi";

export default function ActivityPage() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${BackendURL}/profile/activity`).then((response) => {
      setLoading(false);
      setActivity(response.data);
    });
  }, []);
  return (
    <section>
      <NavBar back={true} title="Activity" />
      {loading ? (
        <div className="flex justify-center mt-8 text-tblue">
          <GiCirclingFish size={35} className="animate-spin" />
        </div>
      ) : (
        <div className="mb-[50px]">
          {activity.map((value) => {
            return (
              <div
                key={value.postid}
                className="px-4 py-2 flex items-center border-t border-gray-200"
              >
                <div className="w-[35px] h-[35px] mr-3">
                  <Image
                    src={`${BackendURL}/avatars/${value.avatar}`}
                    className="rounded-full bg-gray-200"
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
                  {value.type === "comment" && (
                    <span>{" commented on your "}</span>
                  )}

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
      )}
    </section>
  );
}
