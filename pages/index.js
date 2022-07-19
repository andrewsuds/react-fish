import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiFishBucket } from "react-icons/gi";
import Axios from "axios";
import { BackendURL } from "../lib/BackendURL";

export default function IndexPage() {
  const Router = useRouter();
  const [picture, setPicture] = useState("/");

  useEffect(() => {
    Axios.get(`${BackendURL}/profile/randompic`).then((response) => {
      console.log(response.data.picture);
      setPicture(`${BackendURL}/images/${response.data.picture}`);
    });
  }, []);
  return (
    <div className="grid grid-cols-none md:grid-cols-9">
      <div className="md:col-span-5 relative h-[350px] md:h-screen bg-white">
        <div className="absolute md:hidden top-[16px] left-[16px] text-tblue z-20">
          <GiFishBucket size={50} />
        </div>
        <Image
          src={picture}
          className="grayscale brightness-150"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="md:col-span-4 p-8 justify-self-center md:justify-self-start">
        <div className="hidden md:flex pb-3 text-tblue">
          <GiFishBucket size={50} />
        </div>
        <div className="text-6xl font-black mt-12 mb-12 hidden md:block">
          Happening now
        </div>
        <div className="text-3xl font-extrabold mb-8">
          Join Fishbucket today.
        </div>
        <div
          className="w-[300px] py-2 bg-tblue hover:bg-tblue/90 font-bold text-white text-center rounded-full cursor-pointer"
          onClick={() => Router.push("/signup")}
        >
          Sign up with email
        </div>
        <div className="flex w-[300px] mt-1 mb-1 items-center justify-center">
          <hr className="border border-gray-200 mr-2 w-[120px]" />
          or
          <hr className="border border-gray-200 ml-2 w-[120px]" />
        </div>
        <div
          className="w-[300px] py-2 border border-gray-300 hover:bg-gray-100 text-center rounded-full cursor-pointer"
          onClick={() => Router.push("/home")}
        >
          Continue as Guest
        </div>

        <div className="font-bold text-lg mt-8 mb-4">
          Already have an account?
        </div>
        <div
          className="w-[300px] py-2 border font-bold border-gray-300 hover:bg-gray-100 text-tblue text-center rounded-full cursor-pointer"
          onClick={() => Router.push("/login")}
        >
          Log in
        </div>
      </div>
    </div>
  );
}
