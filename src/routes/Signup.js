import SignUpForm from "components/SignupForm";
import { authService, dbService, firebaseInstance } from "fbase";
import { useState } from "react";
import "../styles/signUpForm.css";

export default function Signup() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);
  const getDomainFromEmail = (email) => {
    return email.split("@")[1];
  };
  const handleGoogleSignIn = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const domain = getDomainFromEmail(user.email);

        if (domain === "smschool.us") {
          setIsNewUser(result.additionalUserInfo.isNewUser);
          dbService.collection("users").doc(user.uid).set({
            isValid: true,
          });
        } else {
          authService.currentUser.delete();
          throw new Error(
            "You are not allowed to sign up with this email address."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      {isNewUser ? (
        <SignUpForm />
      ) : (
        <button onClick={handleGoogleSignIn}>Sign up with Google</button>
      )}
      {error && <span className="error-message">{error}</span>}
    </>
  );
}
