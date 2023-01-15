import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import "simpledotcss/simple.min.css";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const userDataSnapshot = await dbService
          .ref(`users/${user.displayName}`)
          .once("value");
        const isValid = userDataSnapshot.val()?.isValid;
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          isValid: isValid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
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
      {init ? (
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
