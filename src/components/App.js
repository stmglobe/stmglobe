import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import "../styles/app.css";
import "../styles/reset.css";

function App() {
  const [init, setInit] = useState(true);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const userDataSnapshot = await dbService
          .ref(`users/${user.uid}`)
          .once("value");
        const isValid = userDataSnapshot.val()?.isValid;
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          isValid: isValid,
          profilePhotoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(false);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    user.reload();
    authService.updateCurrentUser(user);
    console.log("user refreshed!");
    console.log(user);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {!init ? (
        <BrowserRouter>
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={userObj && userObj.isValid}
            userObj={userObj}
          />
        </BrowserRouter>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
