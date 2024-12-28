import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import { registerNewUser } from "../../../service/authService";

import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

function Register(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isConfirmPassword: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);

    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    let regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      setObjCheckInput({ ...defaultValidInput, isConfirmPassword: false });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();
    let userData = { email, phone, username, password };
    if (check === true) {
      let serverData = await registerNewUser(userData);
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("row", "px-3", "px-sm-0")}>
          <div className={cx("content-left", "col-sm-7", "d-sm-block", "d-none", "col-0")}>
            <div className={cx("brand", "text-center")}>HVD75</div>
            <div className={cx("detail", "text-center")}>
            Build your own database and clone the Tiki project with Fontend ReactJs, ReduxJs And Backend Nodejs, ExpressJs
            </div>
          </div>
          <div className={cx("content-right", "col-sm-5", "col-12", "d-flex", "flex-column", "gap-3", "py-3", "px-3")}>
            <div className={cx("brand", "d-sm-none", "d-block")}>HVD75</div>
            <div className={cx("form-group")}>
              <input
                type="text"
                className={cx("form-control", { "is-invalid": !objCheckInput.isValidEmail })}
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <input
                type="text"
                className={cx("form-control", { "is-invalid": !objCheckInput.isValidPhone })}
                placeholder="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <input
                type="text"
                className={cx("form-control")}
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <input
                type="password"
                className={cx("form-control", { "is-invalid": !objCheckInput.isValidPassword })}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <input
                type="password"
                className={cx("form-control", { "is-invalid": !objCheckInput.isConfirmPassword })}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            <button className={cx("btn", "btn-primary")} onClick={handleRegister}>
              Register
            </button>
            <hr />
            <div className={cx("text-center")}>
              <button
                type="button"
                className={cx("btn", "btn-success")}
                onClick={handleLogin}
              >
                Already've an account, Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
