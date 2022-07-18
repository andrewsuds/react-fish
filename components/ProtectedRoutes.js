import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import { useRouter } from "next/router";

export default function ProtectedRoutes({ children }) {
  const Router = useRouter();
  const { user } = useContext(UserContext);

  let unprotectedRoutes = ["/", "/home", "/login", "/signup"];

  let pathIsProtected = unprotectedRoutes.indexOf(Router.pathname) === -1;

  if (!user && pathIsProtected) {
    Router.push("/");
  }

  return children;
}
