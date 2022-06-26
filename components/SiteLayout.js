import SideBar from "./SideBar";
import SideBarIcon from "./SideBarIcon";
import SideBarCreate from "./SideBarCreate";
import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import { BackendURL } from "../lib/BackendURL";
import Axios from "axios";

export default function SiteLayout({ children }) {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`${BackendURL}/auth/login`).then((response) => {
      console.log("Logged In: " + response.data.username);
      setUser(response.data.username);
    });
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex">
        <div className="flex-col fixed top-0 bottom-0 hidden overflow-y-auto sm:block sm:w-[75px] xl:w-[275px] px-3">
          <SideBarIcon />
          <SideBar name="Home" url="/" icon="home" selectedIcon="homeoutline" />
          <SideBar
            name="Search"
            url="/search"
            icon="home"
            selectedIcon="homeoutline"
          />
          <SideBar
            name="Leaderboard"
            url="/leaderboard"
            icon="home"
            selectedIcon="homeoutline"
          />
          <SideBar
            name="Map"
            url="/map"
            icon="home"
            selectedIcon="homeoutline"
          />
          <SideBar
            name="Activity"
            url="/activity"
            icon="home"
            selectedIcon="homeoutline"
          />
          <SideBarCreate />
        </div>

        <div className="sm:ml-[75px] xl:ml-[275px] w-screen sm:flex-1 border-x border-gray-200 min-h-screen">
          {children}
        </div>

        <div className="hidden lg:block lg:w-[250px]">
          <div className="">
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Last one</p>
          </div>
          <br />
          <br />
          <div className="top-0 sticky">
            <p>Copyright info</p>
          </div>
        </div>
        <div className="sm:hidden w-full fixed bottom-0 bg-yellow-200">Yo</div>
      </div>
    </div>
  );
}
