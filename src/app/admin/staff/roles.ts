export interface Role {
  idRole: number;
  name: string;
}

export enum RoleName {
  All = "All",
  Admin = "admin",
  Doctor = "doctor",
  Patient = "patient",
  None = "",
}