import Axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { BackendURL } from "../lib/BackendURL";
import { GiCirclingFish, GiFishBucket } from "react-icons/gi";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function SignupPage() {
  Axios.defaults.withCredentials = true;
  const Router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [green, setGreen] = useState(true);

  const signup = () => {
    setLoading(true);
    Axios.post(`${BackendURL}/auth/signup`, {
      name: name,
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.registered == false) {
        setGreen(false);
        setPassword("");
      }

      if (response.data.registered == true) {
        setGreen(true);
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
      }
      setMessage(response.data.message);
      setLoading(false);
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
        <div className="text-2xl font-bold py-5">Sign up for Fishbucket</div>
        <div>
          <input
            className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Name"
          />
        </div>

        <div className="mt-3">
          <input
            className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Email"
          />
        </div>

        <div className="mt-3">
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
            className={`text-base mt-2 inline-block ${
              green ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </label>
        </div>

        <div
          className="w-full flex bg-black hover:bg-black/80 rounded-full text-white font-bold text-center py-1.5 mt-3 cursor-pointer justify-center"
          onClick={signup}
        >
          {!loading ? (
            "Sign up"
          ) : (
            <GiCirclingFish className="animate-spin" size={24} />
          )}
        </div>

        <Link href="/login">
          <div className="mt-12 group cursor-pointer">
            <span>{"Already have an account? "}</span>
            <span className="text-tblue group-hover:underline">Log in</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
