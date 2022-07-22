import Axios from "axios";
import { UserContext } from "../lib/UserContext";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { BackendURL } from "../lib/BackendURL";
import Link from "next/link";
import { GiCirclingFish, GiFishBucket } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function LoginPage() {
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const Router = useRouter();

  const login = () => {
    setLoading(true);
    Axios.post(`${BackendURL}/auth/login`, {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.loggedIn == true) {
        setUser(response.data.username);
        Router.push("/home");
      } else {
        setPassword("");
        setMessage(response.data.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4 justify-center">
        <div
          className="absolute left-[16px] p-[7.5px] rounded-full hover:bg-gray-500/20 cursor-pointer"
          onClick={() => Router.push("/")}
        >
          <IoClose size={20} />
        </div>
        <div className="text-tblue">
          <GiFishBucket size={28} />
        </div>
      </div>

      <section className="px-8">
        <div className="text-2xl font-bold py-5">Log in to Fishbucket</div>
        <div>
          <input
            className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="Username"
          />
        </div>

        <div className="mt-3 mb-6">
          <input
            name="password"
            className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="text-base mt-2 inline-block text-red-500"
          >
            {message}
          </label>
        </div>

        <div
          className="w-full flex bg-black hover:bg-black/80 rounded-full text-white font-bold text-center py-1.5 mt-3 cursor-pointer justify-center"
          onClick={login}
        >
          {!loading ? (
            "Log in"
          ) : (
            <GiCirclingFish className="animate-spin" size={24} />
          )}
        </div>

        <div className="w-full hover:bg-gray-100 border border-gray-300 font-bold rounded-full text-center py-1.5 mt-6 cursor-pointer">
          Forgot password?
        </div>
        <Link href="/signup">
          <div className="mt-12 group cursor-pointer">
            <span>{"Don't have an account? "}</span>
            <span className="text-tblue group-hover:underline">Sign up</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
