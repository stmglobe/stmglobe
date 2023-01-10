import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { dbService } from "fbase";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [grade, setGrade] = useState(9);
  const [error, setError] = useState(null);

  const handleSignup = async (event, history) => {
    event.preventDefault();
    const userCredential = await authService.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    // Add the user's name and preferred name to the "users" collection
    console.log(user.uid);
    console.log(firstName, lastName, preferredName, grade);
    try {
      await dbService.doc("users/" + user.uid).set({
        firstName: firstName,
        lastName: lastName,
        preferredName: preferredName,
        grade: grade,
      });
      authService.currentUser.sendEmailVerification();
      console.log("Verify Email sent");
      alert("Please verify your email before signing in.");
      history.push("/signin");
    } catch (error) {
      setError(error.message);
      console.log(error);
      authService.currentUser.delete();
    }
  };
  const history = useHistory();
  return (
    <form onSubmit={(event) => handleSignup(event, history)}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Preferred Name:
        <input
          type="text"
          value={preferredName}
          placeholder="Optional"
          onChange={(event) => setPreferredName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Grade:
        <select
          onChange={(event) => {
            setGrade(event.target.value);
            console.log(event.target.value);
          }}
        >
          <option value="9">9th grade</option>
          <option value="10">10th grade</option>
          <option value="11">11th grade</option>
          <option value="12">12th grade</option>
        </select>
      </label>
      {error && <p color="red">{error}</p>}
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}
