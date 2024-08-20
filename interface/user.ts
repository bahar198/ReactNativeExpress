import { Language } from "./language";
import { Role } from "./role";

export interface User {
  id: String;
  password: String;
  email: String;
  userName: String;
  isAnonymous: Boolean;
  role: Role;
  language: Language;
}
