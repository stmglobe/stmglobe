import { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const handleLogOutClick = () => {
    authService.signOut();
    history.push("/");
    alert("You are logged out!");
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is signed in. Get their name from the "users" collection.
        const userDataSnapshot = await dbService
          .ref(`users/${authUser.displayName}`)
          .once("value");
        const userData = userDataSnapshot.val();
        setUser(userData);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => {
      // Perform cleanup on unmount.
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        {user && (
          <>
            <h1>Hello, {user.preferredName || user.firstName}!</h1>
            <p>
              Your name is {user.firstName} {user.lastName}.
            </p>
          </>
        )}
      </div>
      <button onClick={handleLogOutClick}>log out</button>
    </>
  );
}
