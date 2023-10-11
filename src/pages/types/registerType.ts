export interface I_UserRegister {
  name: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
export interface I_UserRegisterFormError {
  isError: boolean;
  msgEmail: string;
  msgName: string;
  msgPassword: string;
  msgPasswordConfirm: string;
}
export interface I_UserRegisterStatus {
  status: string;
  message: string;
  data?: number;
}
