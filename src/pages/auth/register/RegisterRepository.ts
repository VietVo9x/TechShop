import { getAllItems, insertItem } from "../../../utils/DB.util";

export default class RegisterRepository {
  getAllUser() {
    const users = getAllItems("accounts"); // trả về array
    return users;
  }

  insertUser(entity: any) {
    return insertItem("accounts", entity); // trả về id
  }
}
