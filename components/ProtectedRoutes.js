import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/UserContext";
export default function ProtectedRoutes({ children }) {
  const { user } = useContext(UserContext);
  const Router = useRouter();

  useEffect(() => {
    let unprotectedRoutes = [
      "/",
      "/home",
      "/login",
      "/signup",
      "/leaderboard",
      "/search",
      "/map",
    ];

    let pathIsProtected = unprotectedRoutes.indexOf(Router.pathname) === -1;

    if (!user && pathIsProtected) {
      Router.push("/");
    }
  });

  return children;
}
