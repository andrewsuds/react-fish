import Axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BackendURL } from "../lib/BackendURL";

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

  useEffect(() => {
    Axios.get(`${BackendURL}/post/species`).then((response) => {
      setSpeciesList(response.data);
      setLoading(false);
    });
  }, []);

  const submit = () => {
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
      } else {
        setMessage(response.data.message);
      }
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              value={weight}
              placeholder="Weight"
            />
          </div>

          <div>
            <input
              type="text"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              value={length}
              placeholder="Length"
            />
          </div>

          <div>
            <input
              type="text"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              value={caption}
              placeholder="Caption"
            />
          </div>

          <div>
            <select
              defaultValue={""}
              onChange={(e) => {
                setSpeciesID(e.target.value);
              }}
            >
              <option value={""} hidden>
                Select a Fish
              </option>
              {speciesList.map((value) => {
                return <option value={value.speciesid}>{value.species}</option>;
              })}
            </select>
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
            />
          </div>

          <div>{message}</div>

          <button onClick={submit}>Submit</button>
        </div>
      )}
    </div>
  );
}
