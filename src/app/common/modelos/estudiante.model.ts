import {AcudienteModel } from "./acudiente.model";

export interface EstudianteModel {
  id: number,
  name: string,
  lastName: string,
  email: string,
  courseNumber: number,
  attendant: AcudienteModel
}
