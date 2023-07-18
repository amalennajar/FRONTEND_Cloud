import { formatDate } from "@angular/common";
export class MedicineList {
  id: number;
  nom: string;
  description: string;
  prix: string;
  stock: string;
  constructor(medicineList) {
    {
      this.id = medicineList.id ;
      this.nom = medicineList.nom || "";
      this.description = medicineList.description || "";
      this.prix = medicineList.prix || "";
      this.stock = medicineList.stock || "";
    }
  }
}
