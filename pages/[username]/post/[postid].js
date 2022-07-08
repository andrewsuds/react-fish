import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../lib/UserContext";
import Image from "next/image";
import Axios from "axios";
import { BackendURL } from "../../../lib/BackendURL";
import NavBar from "../../../components/NavBar";
import {
  FaBalanceScale,
  FaRulerHorizontal,
  FaFish,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MdOutlineBubbleChart } from "react-icons/md";
import { IoArrowDown } from "react-icons/io5";

export default function ProfilePostPage() {
  const Router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const { username, postid } = Router.query;
  useEffect(() => {
    if (!Router.isReady) return;
    Axios.get(`${BackendURL}/post/one/${postid}`).then((response) => {
      setPost(response.data);
      setLoading(false);
    });

    Axios.get(`${BackendURL}/comment/all/${postid}`).then((response) => {
      setComments(response.data);
    });
  }, [Router.isReady]);

  const requestToggleLike = (id, isliked) => {
    Axios.post(`${BackendURL}/post/like`, {
      postid: id,
      isliked: isliked,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const formatDate = (dateString) => {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const time = new Date(dateString).toLocaleTimeString("en-US", timeOptions);
    const date = new Date(dateString).toLocaleDateString("en-US", dateOptions);
    return `${time} • ${date}`;
  };

  const toggleLike = (id) => {
    let newPost = {
      ...post,
    };

    if (post.isliked == 0) {
      newPost.isliked = 1;
      newPost.likecount = parseInt(newPost.likecount) + 1;
      requestToggleLike(id, 0);
    }

    if (post.isliked == 1) {
      newPost.isliked = 0;
      newPost.likecount = parseInt(newPost.likecount) - 1;
      requestToggleLike(id, 1);
    }

    setPost(newPost);
  };

  const createComment = () => {
    Axios.post(`${BackendURL}/comment/create`, {
      postid: postid,
      comment: comment,
    }).then((response) => {
      console.log(response.data);
      if (response.data.commented === true) {
        setComment("");
        Axios.get(`${BackendURL}/comment/all/${postid}`).then((response) => {
          setComments(response.data);
        });

        let newPost = {
          ...post,
        };
        newPost.commentcount = parseInt(newPost.commentcount) + 1;
        setPost(newPost);
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <div>
      <NavBar back={true} activity={true} title="Post" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="px-4 pt-3">
            <div className="flex items-center mb-2">
              <Image
                src={`${BackendURL}/avatars/${post.avatar}`}
                className="rounded-full"
                width={50}
                height={50}
                objectFit="cover"
              />
              <div className="ml-3">
                <div className="font-bold">{post.username}</div>
                {post.location && (
                  <div className="text-gray-500">{post.location}</div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap text-gray-500 items-center text-lg">
              <div className="flex items-center">
                <FaBalanceScale size={22} />
                <div className="ml-2 mr-4">{post.weight} lbs</div>
              </div>
              {post.length && (
                <div className="flex items-center">
                  <FaRulerHorizontal size={22} />
                  <div className="ml-2 mr-4">{`${post.length}"`}</div>
                </div>
              )}
              <div className="flex items-center">
                <FaFish size={22} />
                <div className="ml-2">{post.species}</div>
              </div>
            </div>
            <div className="text-xl my-2">{post.caption}</div>

            {post.picture && (
              <div className="mb-2">
                <Image
                  className="rounded-xl"
                  src={`${BackendURL}/images/${post.picture}`}
                  width={500}
                  height={500}
                  objectFit="cover"
                />
              </div>
            )}

            <div className="text-gray-500">{formatDate(post.postdate)}</div>

            <div className="flex mt-2 justify-around text-gray-500 border-y border-gray-200">
              <div
                className="flex items-center group hover:cursor-pointer hover:text-red-500"
                onClick={() => toggleLike(post.postid)}
              >
                {post.isliked == 0 ? (
                  <div className="group-hover:bg-red-100 p-2 rounded-full">
                    <FaRegHeart size={22} />
                  </div>
                ) : (
                  <div className="group-hover:bg-red-100 text-red-500 p-2 rounded-full">
                    <FaHeart size={22} />
                  </div>
                )}

                <div className="ml-2 py-3">{post.likecount} Likes</div>
              </div>

              <div className="flex items-center">
                <div className="p-2">
                  <MdOutlineBubbleChart size={22} />
                </div>
                <div className="ml-2">{post.commentcount} Comments</div>
              </div>
            </div>
          </div>

          <div className="flex border-b px-4 py-3 border-gray-200 items-center justify-between">
            <div className="flex items-center">
              <Image
                src={`${BackendURL}/avatars/${user}`}
                className="rounded-full"
                width={50}
                height={50}
                objectFit="cover"
              />
              <div className="text-lg ml-3">
                <input
                  className="rounded-md border-gray-200 focus:border-gray-200 focus:ring-2 focus:ring-tblue focus:shadow-md"
                  type="text"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                  placeholder="Comment your reply"
                />
              </div>
            </div>
            <div
              className="bg-tblue p-2 rounded-full cursor-pointer shadow-md text-white"
              onClick={() => createComment()}
            >
              <IoArrowDown size={20} />
            </div>
          </div>

          <div>
            {comments.map((value) => {
              return (
                <div
                  key={value.commentid}
                  className="flex px-4 py-3 border-b border-gray-200"
                >
                  <div className="w-[50px] h-[50px]">
                    <Image
                      src={`${BackendURL}/avatars/${value.avatar}`}
                      className="rounded-full"
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="flex">
                      <div className="font-bold">{value.username}</div>
                      <div className="ml-1 text-gray-500">• 20m</div>
                    </div>
                    <div>{value.comment}</div>
                  </div>
                </div>
              );
            })}
            <div className="h-[81px] mb-[49px]"></div>
          </div>
        </>
      )}
    </div>
  );
}
