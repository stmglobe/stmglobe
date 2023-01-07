import { auth } from "fbase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const handleLogOutClick = () => {
    signOut(auth);
    history.push("/");
    alert("You are logged out!");
  };
  return (
    <>
      <h1>This is Profile Page!</h1>

      <button onClick={handleLogOutClick}>log out</button>
    </>
  );
}
