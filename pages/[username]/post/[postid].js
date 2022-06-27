import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function ProfilePostPage() {
  const Router = useRouter();
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

    Axios.get(`${BackendURL}/post/comments/${postid}`).then((response) => {
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
    Axios.post(`${BackendURL}/post/comment`, {
      postid: postid,
      comment: comment,
    }).then((response) => {
      console.log(response.data);
      if (response.data.commented === true) {
        setComment("");
        Axios.get(`${BackendURL}/post/comments/${postid}`).then((response) => {
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
      <NavBar back={true} title="Post" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="px-4 pt-3">
            <div className="flex items-center">
              <Image
                src={`${BackendURL}/images/ufc.jpg`}
                className="rounded-full"
                width={50}
                height={50}
                layout="fixed"
              />
              <div className="ml-3">
                <div className="font-bold">{post.username}</div>
                {post.location && (
                  <div className="text-gray-500">
                    {post.location.substring(0, 20) + "..."}
                  </div>
                )}
              </div>
            </div>
            <div className="flex text-gray-500 items-center text-xl mt-2">
              <FaBalanceScale size={22} />
              <div className="ml-1 mr-4">{post.weight} lbs</div>
              {post.length && (
                <>
                  <FaRulerHorizontal size={22} />
                  <div className="ml-1 mr-4">{`${post.length}"`}</div>
                </>
              )}

              <FaFish size={22} />
              <div className="ml-1">{post.species}</div>
            </div>
            <div className="text-2xl mt-2 mb-3">{post.caption}</div>

            {post.picture && (
              <div className="mt-2">
                <Image
                  className="rounded-xl"
                  src={`${BackendURL}/images/${post.picture}`}
                  width={500}
                  height={500}
                  objectFit="cover"
                />
              </div>
            )}

            <div className="text-gray-500">{post.postdate}</div>

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
                src={`${BackendURL}/images/ufc.jpg`}
                className="rounded-full"
                width={50}
                height={50}
                layout="fixed"
              />
              <div className="text-xl ml-3">
                <input
                  className="w-[150px]"
                  type="text"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                  placeholder="Tweet your reply"
                />
              </div>
            </div>
            <div
              className="bg-tblue py-1.5 px-3 rounded-full cursor-pointer shadow-lg text-white"
              onClick={() => createComment()}
            >
              Tweet
            </div>
          </div>

          {comments.map((value) => {
            return (
              <div
                key={value.commentid}
                className="flex px-4 py-3 border-b border-gray-200"
              >
                <div>
                  <Image
                    src={`${BackendURL}/images/ufc.jpg`}
                    className="rounded-full"
                    width={50}
                    height={50}
                    layout="fixed"
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
        </>
      )}
    </div>
  );
}
