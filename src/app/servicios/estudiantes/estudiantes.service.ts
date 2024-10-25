import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EstudianteModel } from '../../common/modelos/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  http = inject(HttpClient);
  headers = new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'application/json'
  });

  public getAllEstudiantes(): Observable<EstudianteModel[]>{
    return this.http.get<EstudianteModel[]>(environment.apiUrlStudent, {headers: this.headers});
  }

  public getEstudianteId(id: number): Observable<EstudianteModel>{
    return this.http.get<EstudianteModel>(environment.apiUrlStudent + '/' + id, {headers: this.headers})
  }

  public deleteEstudiante(id: number): Observable<EstudianteModel> {
    return this.http.delete<EstudianteModel>(environment.apiUrlStudent + '/' + id, {headers: this.headers});
  }

  public saveEstudiante(estudiante: EstudianteModel): Observable<Blob>{
    return this.http.post<Blob>(environment.apiUrlStudent, JSON.stringify(estudiante),
          {headers: this.headers, responseType: 'blob' as 'json'} )
  }
  public updateEstudiante(estudiante: EstudianteModel): Observable<EstudianteModel>{
    return this.http.put<EstudianteModel>(environment.apiUrlStudent, estudiante, {headers: this.headers})
  }
}
