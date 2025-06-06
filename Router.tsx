import { useActiveUser } from "./services/ActiveUser";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

import React from "react";

export default function Router() {
  const activeUser = useActiveUser();
  return <>{activeUser.data !== null ? <Main /> : <Auth />}</>;
}
