import { inject, Injectable } from '@angular/core';
import { LogingRequest } from '../../modelos/loginRequest.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../../modelos/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //se mejora almecenando la informacion en sesion
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});


  login(credentials: LogingRequest): Observable<User>{
    return this.http.get<User>('../../../assets/data.json').pipe(
      tap((userData: User) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status ===0){
      console.error('se ha producido un error', error.error)
    }else{
      console.error('el Backend retorno codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo fallo. intente nuevamente'))
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
