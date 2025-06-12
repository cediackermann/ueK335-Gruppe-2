import { useActiveUser } from "./services/ActiveUser";
import Auth from "./pages/Auth";

import React from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";

export default function Router() {
  const activeUser = useActiveUser();
  return <>{activeUser.data !== null ? <Main /> : <Auth />}</>;
}
