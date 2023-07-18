import { formatDate } from "@angular/common";
export class IssuedItems {
  id: number;
  email:string;
  description: string;
  testType: string;
  testDate: string;
  resultat: string;
  status: string;
  constructor(issuedItems) {
    {
      this.id = issuedItems.id;
      this.email = issuedItems.email;
      this.description = issuedItems.description || "";
      this.testType = issuedItems.testType ;
      this.testDate = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.resultat = issuedItems.resultat || "";
      this.status = issuedItems.status || "Issued";
    }
  }
}
