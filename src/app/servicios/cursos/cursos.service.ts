import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CursoModel } from '../../common/modelos/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  htpp = inject(HttpClient);
  headers = new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'application/json'
  });

  public getAllCursos(): Observable<CursoModel[]>{
    return this.htpp.get<CursoModel[]>(environment.apiUrlCourse, {headers: this.headers});
  }

  public getCursoId(id: number): Observable<CursoModel>{
    return this.htpp.get<CursoModel>(environment.apiUrlCourse + '/' + id, {headers: this.headers});
  }

  public saveCursos(curso: CursoModel){
    return this.htpp.post<CursoModel>(environment.apiUrlCourse, JSON.stringify(curso), {headers: this.headers});
  }

  public updateCursos(curso: CursoModel){
    return this.htpp.put<CursoModel>(environment.apiUrlCourse, JSON.stringify(curso), {headers: this.headers});
  }

  public deleteCurso(id: number): Observable<CursoModel>{
    return this.htpp.delete<CursoModel>(environment.apiUrlCourse + '/'+ id, {headers: this.headers});
  }

  public getCursoAllEstudiantes(id: number): Observable<CursoModel>{
    return this.htpp.get<CursoModel>(environment.apiUrlCourse + '/search-student/' + id, {headers: this.headers});
  }

}
