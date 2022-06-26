import { useRouter } from "next/router";
import Image from "next/image";
import Axios from "axios";
import { BackendURL } from "../../lib/BackendURL";
import NavBar from "../../components/NavBar";

export default function ProfilePage() {
  Axios.defaults.withCredentials = true;
  const Router = useRouter();

  const { username } = Router.query;

  return (
    <div>
      <NavBar back={true} title="Profile" />
    </div>
  );
}
