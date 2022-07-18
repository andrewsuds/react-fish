import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Axios from "axios";
import { BackendURL } from "../lib/BackendURL";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBalanceScale,
  FaRulerHorizontal,
  FaFish,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MdOutlineBubbleChart } from "react-icons/md";

export default function HomePage() {
  Axios.defaults.withCredentials = true;
  const [postFeed, setPostFeed] = useState([]);

  useEffect(() => {
    Axios.get(`${BackendURL}/post/all`).then((response) => {
      setPostFeed(response.data);
    });
  }, []);

  const requestToggleLike = (id, isliked) => {
    Axios.post(`${BackendURL}/post/like`, {
      postid: id,
      isliked: isliked,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const toggleLike = (id) => {
    console.log("You passed: " + id);
    const newList = postFeed.map((item) => {
      if (item.postid == id) {
        if (item.isliked == 0) {
          requestToggleLike(id, 0);
          return {
            ...item,
            isliked: 1,
            likecount: parseInt(item.likecount) + 1,
          };
        }

        if (item.isliked == 1) {
          requestToggleLike(id, 1);
          return {
            ...item,
            isliked: 0,
            likecount: parseInt(item.likecount) - 1,
          };
        }
      }

      return item;
    });
    setPostFeed(newList);
  };

  return (
    <div className="mb-[50px]">
      <NavBar title="Home" activity={true} />
      {postFeed.map((value) => {
        return (
          <div
            key={value.postid}
            className="flex px-4 py-2 border-t border-gray-200 hover:bg-gray-100"
          >
            <div className="mr-3">
              <Image
                src={`${BackendURL}/avatars/${value.avatar}`}
                className="rounded-full bg-gray-200"
                width={50}
                height={50}
                layout="fixed"
                objectFit="cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-baseline">
                <Link href={`/${value.username}`}>
                  <div className="font-bold hover:underline hover:cursor-pointer mr-1">
                    {value.username}
                  </div>
                </Link>

                {value.location && (
                  <div className="text-gray-500 text-sm mr-1">
                    {value.location}
                  </div>
                )}
                <div className="text-sm text-gray-500 leading-6">
                  {value.postdate.days ? (
                    <span>• {value.postdate.days}d</span>
                  ) : value.postdate.hours ? (
                    <span>• {value.postdate.hours}h</span>
                  ) : value.postdate.minutes ? (
                    <span>• {value.postdate.minutes}m</span>
                  ) : (
                    <span>• {value.postdate.seconds}s</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap text-gray-500 items-center">
                <div className="flex items-center">
                  <FaBalanceScale size={20} />
                  <div className="ml-2 mr-4">{value.weight} lbs</div>
                </div>

                {value.length && (
                  <div className="flex items-center">
                    <FaRulerHorizontal size={20} />
                    <div className="ml-2 mr-4">{`${value.length}"`}</div>
                  </div>
                )}

                <div className="flex items-center">
                  <FaFish size={20} />
                  <div className="ml-2">{value.species}</div>
                </div>
              </div>

              {value.caption && (
                <div className="mt-1 mb-2">{value.caption}</div>
              )}

              {value.picture && (
                <div className="flex mb-2">
                  <Image
                    className="rounded-xl bg-gray-200 orientation"
                    src={`${BackendURL}/images/${value.picture}`}
                    width={500}
                    height={500}
                    objectFit="cover"
                  />
                </div>
              )}

              <div className="flex items-center text-gray-500 text-sm ml-[-7px]">
                <div
                  className="flex items-center hover:text-red-500 group hover:cursor-pointer"
                  onClick={() => toggleLike(value.postid)}
                >
                  {value.isliked == 0 ? (
                    <div className="group-hover:bg-red-100 rounded-full p-2">
                      <FaRegHeart size={16} />
                    </div>
                  ) : (
                    <div className="group-hover:bg-red-100 text-red-500 rounded-full p-2">
                      <FaHeart size={16} />
                    </div>
                  )}
                  <div className="ml-1 mr-6">{value.likecount} Likes</div>
                </div>

                <Link href={`/${value.username}/post/${value.postid}`}>
                  <div className="flex items-center hover:text-blue-500 group hover:cursor-pointer">
                    <div className="group-hover:bg-blue-100 rounded-full p-2">
                      <MdOutlineBubbleChart size={18} />
                    </div>
                    <div className="ml-1">{value.commentcount} Comments</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
