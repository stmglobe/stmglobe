import { authService, dbService, firebaseInstance } from "fbase";
import { useState } from "react";
import "../styles/signIn.css";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function Signin() {
  // const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const getDomainFromEmail = (email) => {
    return email.split("@")[1];
  };
  const handleSignIn = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService
      .signInWithPopup(provider)
      .then((userCredential) => {
        const domain = getDomainFromEmail(userCredential.user.email);
        if (domain === "smschool.us") {
          if (userCredential.additionalUserInfo.isNewUser) {
            dbService.ref(`users/${userCredential.user.displayName}`).set({
              uid: userCredential.user.uid,
              isValid: true,
              firstName: userCredential.user.displayName.split(" ")[0],
              lastName: userCredential.user.displayName.split(" ")[1],
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
