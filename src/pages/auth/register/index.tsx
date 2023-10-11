import { useState } from "react";
import "./style.scss";
import { RegisterEvent } from "./RegisterEvent";

const registerEvent = new RegisterEvent();
export default function Register() {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formError, setFormError] = useState({
    msgEmail: "",
    msgName: "",
    msgPassword: "",
    msgPasswordConfirm: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataForm({ ...dataForm, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resError = registerEvent.onRegister(dataForm);
  };
  return (
    <div>
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
