import { useState } from "react";
import "./style.scss";
import { RegisterEvent } from "./RegisterEvent";
import { I_UserRegister } from "../../types/registerType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const registerEvent = new RegisterEvent();

export default function Register() {
  const initialDataForm: I_UserRegister = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [formError, setFormError] = useState({
    msgEmail: "",
    msgName: "",
    msgPassword: "",
    msgPasswordConfirm: "",
  });
  const navigate = useNavigate();
  const delayToast = () => {
    toast.success("Đăng ký thành công!", { autoClose: 1000 });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataForm({ ...dataForm, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resError = registerEvent.onRegister(dataForm);
    if ("isError" in resError) {
      // Đây là một I_UserRegisterFormError, có thể truy cập isError
      if (resError.isError) {
        setFormError({
          msgEmail: resError.msgEmail,
          msgName: resError.msgName,
          msgPassword: resError.msgPassword,
          msgPasswordConfirm: resError.msgPasswordConfirm,
        });
      }
    } else {
      // Đây là một I_UserRegisterStatus, xử lý trạng thái đăng ký
      if (resError.status === "success") {
        delayToast();
      } else {
        toast.error("Email này đã tồn tại", { autoClose: 1000 });
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <form
        id="form-register"
        className="form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={handleChange} name="name" />
          <p className="error-msg">{formError.msgName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" onChange={handleChange} name="email" />
          <p className="error-msg">{formError.msgEmail}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            onChange={handleChange}
            name="password"
          />
          <p className="error-msg">{formError.msgPassword}</p>
        </div>
        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="text"
            id="repeat-password"
            onChange={handleChange}
            name="repeatPassword"
          />
          <p className="error-msg">{formError.msgPasswordConfirm}</p>
        </div>
        <div className="btn">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
