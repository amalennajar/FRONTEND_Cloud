import { Role } from "./role";

export class UserDetails {
  idUser: string;
  img: string;
  username: string;
  password: string;
  nom: string;;
  prenom: string;
  email: string
  role: Role
  constructor(userDetails) {
    this.idUser = userDetails.idUser|| "";
  }
}

