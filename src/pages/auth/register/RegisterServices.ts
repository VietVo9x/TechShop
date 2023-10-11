import { I_UserEntity } from "../../types/entities";
import {
  I_UserRegister,
  I_UserRegisterFormError,
} from "../../types/registerType";
import RegisterRepository from "./RegisterRepository";

const registerRepository = new RegisterRepository();

export default class RegisterServices {
  register(dataForm: I_UserRegister) {
    const entity_user: I_UserEntity = {
      email: dataForm.email,
      password: dataForm.password,
      name: dataForm.name,
      created_at: new Date().toISOString(),
      status: "active",
      role: 1,
    };

    const users = registerRepository.getAllUser();
    const userExists = users.find(
      (item: I_UserRegister) => item.email === entity_user.email
    );

    if (!userExists) {
      const ret = registerRepository.insertUser(entity_user);

      if (ret) {
        const msgSuccess = {
          status: "success",
          data: ret,
          message: "Đăng ký thành công",
        };
        return msgSuccess;
      }
    }

    const msgFail = {
      status: "failure",
      message: "Đăng ký thất bại",
    };
    return msgFail;
  }

  validator(user: I_UserRegister) {
    const error: I_UserRegisterFormError = {
      isError: false,
      msgEmail: "",
      msgName: "",
      msgPassword: "",
      msgPasswordConfirm: "",
    };
    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email) {
      error.isError = true;
      error.msgEmail = "Email cannot be empty";
    } else if (!validRegex.test(user.email)) {
      error.isError = true;
      error.msgEmail = "Email is not in the correct format";
    }
    //check name
    if (!user.name) {
      error.isError = true;
      error.msgName = "Name cannot be empty";
    } else if (user.name.length < 6) {
      console.log(user.name);
      error.isError = true;
      error.msgName = "Name cannot be shorter than 6 characters";
    }
    //check password
    if (!user.password) {
      error.isError = true;
      error.msgPassword = "Password cannot be empty";
    } else if (user.password.length < 6) {
      error.isError = true;
      error.msgPassword = "Password must be at least 6 characters long";
    } else if (user.password.length > 20) {
      error.isError = true;
      error.msgPassword = "Password cannot exceed 20 characters";
    }
    //check repeat password
    if (!user.repeatPassword) {
      error.isError = true;
      error.msgPasswordConfirm = "Password confirmation cannot be empty";
    } else if (user.repeatPassword !== user.password) {
      error.isError = true;
      error.msgPasswordConfirm = "Password confirmation does not match";
    }
    //return all errors
    return error;
  }
}
