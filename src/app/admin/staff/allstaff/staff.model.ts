import { formatDate } from "@angular/common";

export class Staff {
  idUser: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  password: string;
  statut: boolean;
  specialite: string;
  job: string;
  constructor(staff) {
    {
      this.idUser = staff.id || this.getRandomID();
      this.nom = staff.nom || "";
      this.prenom = staff.prenom || "";
      this.email = staff.email || "";
      this.specialite = staff.specialite || "";
      this.job = staff.job || "";
      this.password= staff.password ||"";
      this.statut= staff.statut || false ; 
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
