import Axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { BackendURL } from "../lib/BackendURL";
import { GiCirclingFish, GiFishBucket } from "react-icons/gi";
import Link from "next/link";

export default function SignupPage() {
  Axios.defaults.withCredentials = true;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const signup = () => {
    Axios.post(`${BackendURL}/auth/signup`, {
      name: name,
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response) {
        setMessage(response.data.message);
      }
    });
  };

  return <div>Signup</div>;
}
