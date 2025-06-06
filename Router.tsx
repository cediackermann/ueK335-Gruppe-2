import { useActiveUser } from "./services/ActiveUser";
import Main from "./pages/Main";
import Login from "./pages/Login";

export default function Router() {
  const activeUser = useActiveUser();
  return <>{activeUser.data !== null ? <Main /> : <Login />}</>;
}
