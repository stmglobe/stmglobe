import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  authService.signOut();
  history.push("/");
  alert("You are logged out!");
}
