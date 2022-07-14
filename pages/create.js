import Axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BackendURL } from "../lib/BackendURL";
import NavBar from "../components/NavBar";
import {
  FaBalanceScale,
  FaRulerHorizontal,
  FaFish,
  FaCamera,
} from "react-icons/fa";
import { MdBubbleChart } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GiCirclingFish } from "react-icons/gi";

export default function CreatePage() {
  Axios.defaults.withCredentials = true;
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [picture, setPicture] = useState("");
  const [caption, setCaption] = useState("");
  const [speciesID, setSpeciesID] = useState("");
  const [message, setMessage] = useState("");
  const Router = useRouter();
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(`${BackendURL}/post/species`).then((response) => {
      setLoading(false);
      setSpeciesList(response.data);
    });
  }, []);

  const submit = () => {
    setSubmitted(true);
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("weight", weight);
    formData.append("length", length);
    formData.append("caption", caption);
    formData.append("speciesid", speciesID);
    Axios.post(`${BackendURL}/post/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log(response.data);
      if (response.data.posted === true) {
        setMessage(response.data.message);
        setSubmitted(false);
      } else {
        setMessage(response.data.message);
        setSubmitted(false);
      }
    });
  };

  return (
    <div>
      <NavBar title="Create Post" />
      {loading ? (
        <div className="flex justify-center mt-8 text-tblue">
          <GiCirclingFish size={35} className="animate-spin" />
        </div>
      ) : (
        <div className="mb-[50px]">
          <div className="px-4 py-3 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <FaBalanceScale size={22} />
              </div>
              <input
                className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
                type="text"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                value={weight}
                placeholder="Weight"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <FaRulerHorizontal size={22} />
              </div>
              <input
                className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
                type="text"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                value={length}
                placeholder="Length"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <FaFish size={22} />
              </div>
              <select
                className="w-full rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
                defaultValue={""}
                onChange={(e) => {
                  setSpeciesID(e.target.value);
                }}
              >
                <option value={""} hidden>
                  Select a Fish
                </option>
                {speciesList.map((value) => {
                  return (
                    <option key={value.speciesid} value={value.speciesid}>
                      {value.species}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-gray-500 pt-2.5">
                <MdBubbleChart size={22} />
              </div>
              <textarea
                className="w-full resize-none rounded-[4px] border-gray-300 focus:border-2 focus:border-tblue focus:ring-0 focus:shadow-sm"
                rows={3}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                value={caption}
                placeholder="Caption"
              />
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-gray-500 pt-2.5 px-[1px]">
                <FaCamera size={20} />
              </div>
              <label
                htmlFor="dropzone"
                className="cursor-pointer w-full rounded-[4px] border-2 border-dashed border-gray-200"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6 text-gray-500">
                  <IoCloudUploadOutline size={22} />
                  <p>
                    {!picture
                      ? "Click to upload file"
                      : picture.name.length > 25
                      ? picture.name.substring(0, 22) + "..."
                      : picture.name}
                  </p>
                </div>
                <input
                  id="dropzone"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div>{message}</div>
          </div>

          <div
            className="fixed top-[10px] right-[16px] z-10 bg-tblue py-1.5 px-3 rounded-full cursor-pointer shadow-md text-white"
            onClick={!submitted ? submit : undefined}
          >
            {!submitted ? (
              "Submit"
            ) : (
              <div className="animate-spin px-[14px] py-[1px]">
                <GiCirclingFish size={22} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
