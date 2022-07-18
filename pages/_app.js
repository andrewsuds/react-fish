import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { UserContext } from "../lib/UserContext";
import { useState, useMemo } from "react";
import ProtectedRoutes from "../components/ProtectedRoutes";

function App({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerUser}>
      <SiteLayout>
        <ProtectedRoutes>
          <Component {...pageProps} />
        </ProtectedRoutes>
      </SiteLayout>
    </UserContext.Provider>
  );
}

export default App;
