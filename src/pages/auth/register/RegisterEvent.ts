import RegisterServices from "./RegisterServices";

const registerServices = new RegisterServices();

export class RegisterEvent {
  onRegister(dataForm: any) {
    // validator form --> status
    const errorResponse = registerServices.validator(dataForm);
    if (errorResponse.isError) {
      console.log(errorResponse);
      return errorResponse;
    }
    // --> đăng ký --> status, data, message
    const registerResponse = registerServices.register(dataForm);

    if (registerResponse.status === "success") {
    }
  }
}
