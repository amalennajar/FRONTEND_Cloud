export class Logistique {
  idLogi?: number;
  typeLogi!: string;
  nomLogi!: string;
  nombreLogi!: number;
  selected?: boolean; // add selected property here
  constructor(obj?: any) {
    this.idLogi = obj && obj.idLogi;
    this.nomLogi = obj && obj.name;
  }
}
