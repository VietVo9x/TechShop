import {
  I_UserRegister,
  I_UserRegisterFormError,
  I_UserRegisterStatus,
} from "../../types/registerType";
import RegisterServices from "./RegisterServices";

const registerServices = new RegisterServices();

export class RegisterEvent {
  onRegister(dataForm: I_UserRegister) {
    // validator form --> thông báo lỗi form
    const errorResponse: I_UserRegisterFormError =
      registerServices.validator(dataForm);
    if (errorResponse.isError) {
      return errorResponse;
    }
    // --> đăng ký --> status, data, message
    const registerResponse: I_UserRegisterStatus =
      registerServices.register(dataForm);

    return registerResponse;
  }
}
