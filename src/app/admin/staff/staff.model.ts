import { Role } from "src/app/admin/staff/role.model"

export interface Userr {
    nom: string;
    prenom: string;
    username: string;
    password: string;
    email: string;
    role: Role[];
  }