import logo from "../imgs/Logo-light-green.png";
import "../styles/logo.css";

export default function Logo({ size }) {
  return (
    <img src={logo} alt="light green logo" className={`size-${size} logo`} />
  );
}
