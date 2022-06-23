import Link from "next/link";
import { useRouter } from "next/router";
import { TiHome, TiHomeOutline } from "react-icons/ti";

export default function SideBar(props) {
  const router = useRouter();
  let icon;
  let selectedIcon;

  if (props.icon == "home") {
    icon = <TiHome size="26" />;
  }

  if (props.selectedIcon == "homeoutline") {
    selectedIcon = <TiHomeOutline size="26" />;
  }

  return (
    <div className="mt-1">
      <Link href={props.url}>
        {router.pathname == props.url ? (
          <button className="flex items-center hover:bg-gray-200 p-2.5 rounded-full">
            {icon}
            <span className="ml-4 font-bold text-xl hidden xl:block">
              {props.name}
            </span>
          </button>
        ) : (
          <button className="flex items-center hover:bg-gray-200 p-2.5 rounded-full">
            {selectedIcon}
            <span className="ml-4 text-xl hidden xl:block">{props.name}</span>
          </button>
        )}
      </Link>
    </div>
  );
}
