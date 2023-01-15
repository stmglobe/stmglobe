import { useState } from "react";

export default function SignupForm({ email, user, handleSignUp }) {
  const [firstName, setFirstName] = useState(user.displayName.split(" ")[0]);
  const [lastName, setLastName] = useState(user.displayName.split(" ")[1]);
  const [preferredName, setPreferredName] = useState("");
  const [grade, setGrade] = useState(9);

  return (
    <form
      className="signupForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleSignUp({ firstName, lastName, preferredName, grade });
      }}
    >
      <label>
        Email:
        <input type="email" value={email} required readOnly />
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
        <select onChange={(event) => setGrade(event.target.value)}>
          <option value="9">9th grade</option>
          <option value="10">10th grade</option>
          <option value="11">11th grade</option>
          <option value="12">12th grade</option>
        </select>
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}
