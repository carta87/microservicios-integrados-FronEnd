import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../../common/modelos/registerRequest.model';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterResponse } from '../../common/modelos/registerResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  http = inject(HttpClient);

  public crearUsuario(dataUsuario: RegisterRequest): Observable<RegisterResponse> {
    let _headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post<RegisterResponse>(environment.apiUrlAuth + '/register',
        dataUsuario, { headers: _headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('se ha producido un error', error.error);
      return throwError(
        () => new Error('se ha producido un error de conexion', error.error)
      );
    } else {
      console.error('el Backend retorno codigo de estado ', error.status,
        error.error);
    }
    return throwError(
      () => new Error(error.error.message.length <= 50
            ? error.error.message : 'Algo fallo. intente nuevamente')
    );
  }
}
