import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router";
import EmailVerifyForm from "./EmailVerifyForm";
import "../styles/signInForm.css";

export default function SignInForm({ userObj }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = authService.signInWithEmailAndPassword(email, password);
      if (data.user.emailVerified) console.log(data);
      else {
        setError("Please verify your email.");
        setVerify(true);
        return;
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        />
        <input type="submit" className="authInput authSubmit" value="Sign in" />
        {error && (
          <span className="authError">
            {error}
            {verify && <EmailVerifyForm userObj={userObj} />}
          </span>
        )}
      </form>
      <span className="authSwitch" onClick={() => history.push("/signup")}>
        <span>Don't have an account? </span>
        <strong>Sign up</strong>
      </span>
    </>
  );
}
