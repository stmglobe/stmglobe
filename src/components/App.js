import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService, dbService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          isValid: dbService.collection("users").doc(user.uid).get(),
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
            isLoggedI={userObj && userObj.isValid}
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
