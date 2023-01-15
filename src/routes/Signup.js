import SignUpForm from "components/SignupForm";
import { authService, firebaseInstance } from "fbase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/signUpForm.css";

export default function Signup() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsNewUser(searchParams.get("isNewUser") ? true : false);
  }, [location]);

  const getDomainFromEmail = (email) => {
    return email.split("@")[1];
  };
  const handleGoogleSignIn = () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService
      .signInWithRedirect(provider)
      .then((result) => {
        const user = result.user;
        const domain = getDomainFromEmail(user.email);

        if (domain === "smschool.us") {
          setIsNewUser(result.additionalUserInfo.isNewUser);
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
