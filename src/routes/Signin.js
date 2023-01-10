import SignInForm from "components/SigninForm";
import { authService, firebaseInstance } from "fbase";
import { useEffect, useState } from "react";

export default function Signin({ userObj }) {
  function GoogleLogin() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unregisterAuthObserver = authService.onAuthStateChanged(
        async (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
        }
      );
      return () => {
        unregisterAuthObserver();
      };
    }, []);
    const handleSignIn = () => {
      const provider = new firebaseInstance.GoogleAuthProvider();
      authService.signInWithPopup(provider);
    };
  }
  return (
    <>
      <SignInForm userObj={userObj} />
      {/* sign in with google */}
    </>
  );
}
