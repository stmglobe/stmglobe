import { authService, dbService, firebaseInstance } from "fbase";
import { useState } from "react";
import "../styles/signIn.css";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function Signin() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const handleSignIn = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService
      .signInWithPopup(provider)
      .then((userCredential) => {
        const { email, displayName, uid } = userCredential.user;
        const { isNewUser } = userCredential.additionalUserInfo;
        const [firstName, lastName] = displayName.split(" ");
        const domain = email.split("@")[1];
        if (domain === "smschool.us" || true) {
          if (isNewUser) {
            dbService.ref(`users/${uid}`).set({
              isValid: true,
              firstName: firstName,
              lastName: lastName,
            });
          } else {
            history.push("/");
          }
        } else {
          throw new Error(
            "You are only allowed to sign up with 'smschool.us' email address."
          );
        }
      })
      .catch((error) => {
        setError(error);
        authService.currentUser.delete();
      });
  };

  return (
    <div className="container googleSignIn">
      <button onClick={handleSignIn}>
        <FaGoogle /> Sign in with Google
      </button>
      {error && <span>{error}</span>}
    </div>
  );
}
