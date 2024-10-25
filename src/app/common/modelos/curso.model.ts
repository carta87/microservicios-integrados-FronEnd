import { EstudianteModel } from "./estudiante.model";

export interface CursoModel{
  id: number,
  numberCourse : number,
  name: string,
  teacher: string,
  studentDTOList?: EstudianteModel[]
}
