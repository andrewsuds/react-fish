import { useContext } from "react";
import { UserContext } from "../lib/UserContext";

export default function ProtectedRoutes({ router, children }) {
  const { user } = useContext(UserContext);

  let unprotectedRoutes = ["/", "/home", "/login", "/signup"];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (!user && pathIsProtected) {
    router.push("/");
  }

  return children;
}
