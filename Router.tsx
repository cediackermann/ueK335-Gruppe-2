import { useActiveUser } from "./services/ActiveUser";
import Main from "./pages/Main";
import Login from "./pages/Login";

import React from "react";

export default function Router() {
  const activeUser = useActiveUser();
  return (
    <React.Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
      {activeUser?.data !== null ? <Main /> : <Login />}
    </React.Suspense>
  );
}
