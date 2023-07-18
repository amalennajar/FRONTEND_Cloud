import { TypeSanguin } from "./TypeSanguin"

  export class Donateur {
    idDonateur: number;
    nomDonateur: string;
    prenomDonateur: string;
    adresse: string;
    numeroTelephone: string;
    typeS: TypeSanguin;
    quantiteTotale: number;
    dernierDon: Date;
    banqueSang: any;
  
    constructor(donateur
    ) {
      this.idDonateur = donateur.idDonateur;
      this.nomDonateur = donateur.nomDonateur;
      this.prenomDonateur = donateur.prenomDonateur;
      this.adresse = donateur.adresse;
      this.numeroTelephone = donateur.numeroTelephone;
      this.typeS = donateur.typeS;
      this.quantiteTotale = donateur.quantiteTotale;
      this.dernierDon = donateur.dernierDon;
      this.banqueSang = donateur.banqueSang;
    }
   
    }
  
    
  
  