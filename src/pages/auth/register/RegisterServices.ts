import RegisterRepository from "./RegisterRepository";

const registerRepository = new RegisterRepository();

export default class RegisterServices {
  register(dataForm: any) {
    const entity_user: any = {
      email: dataForm.email,
      password: dataForm.password,
      firstName: dataForm.firstName,
      lastName: dataForm.lastName,
      created_at: new Date().toISOString(),
      status: "active",
    };

    const users = registerRepository.getAllUser();
    const userExists = users.find(
      (item: any) => item.email === entity_user.email
    );

    if (!userExists) {
      const ret = registerRepository.insertUser(entity_user);

      if (ret) {
        const msgSuccess = {
          status: "success",
          data: ret,
          message: "Đăng ký thành công",
        };
        console.log(msgSuccess);
        return msgSuccess;
      }
      const msgFail = {
        status: "failure",
        data: ret,
        message: "Đăng ký thất bại",
      };
      console.log(msgFail);

      return msgFail;
    }

    const msgTrungLap = {
      status: "failure",
      message:
        "Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một tài khoản khác",
    };
    console.log(msgTrungLap);
    return msgTrungLap;
  }

  validator(user: any) {
    const error = {
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
