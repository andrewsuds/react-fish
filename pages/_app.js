import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { UserContext } from "../lib/UserContext";
import { AvatarContext } from "../lib/AvatarContext";
import { useState, useMemo } from "react";
import ProtectedRoutes from "../components/ProtectedRoutes";

function App({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const providerAvatar = useMemo(
    () => ({ avatar, setAvatar }),
    [avatar, setAvatar]
  );

  return (
    <UserContext.Provider value={providerUser}>
      <AvatarContext.Provider value={providerAvatar}>
        <SiteLayout>
          <ProtectedRoutes>
            <Component {...pageProps} />
          </ProtectedRoutes>
        </SiteLayout>
      </AvatarContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
