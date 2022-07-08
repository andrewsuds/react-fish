import { IoCloudUploadOutline } from "react-icons/io5";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Axios from "axios";
import { BackendURL } from "../lib/BackendURL";

export default function SettingsPage() {
  const [picture, setPicture] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    const formData = new FormData();
    formData.append("avatar", picture);

    Axios.post(`${BackendURL}/profile/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log(response.data);
      if (response.data.changed === false) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    });
  };
  return (
    <div>
      <NavBar back={true} title="Settings" />
      <div className="px-4 py-3 mb-[50px]">
        <h1>Change Profile Picture:</h1>
        <div className="flex mt-2">
          <label
            htmlFor="dropzone"
            className="cursor-pointer w-full rounded-md border-2 border-dashed border-gray-200"
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
        <div onClick={submit}>Submit</div>
      </div>
    </div>
  );
}
