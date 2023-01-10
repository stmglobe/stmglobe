import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const EmailVerifyForm = ({ userObj }) => {
  const history = useHistory();
  const onVerifyClick = async () => {
    const user = authService.currentUser;
    await user.sendEmailVerification();
    history.push("/");
  };
  return (
    <div>
      <p className="verify-title">Verify Your Email</p>
      <button className="verify-send-btn" onClick={onVerifyClick}>
        Send Email Verification
      </button>
    </div>
  );
};

export default EmailVerifyForm;
