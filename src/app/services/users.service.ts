import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getStudents(page: number, itemsPerPage: number): Observable<User[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http
      .get<User[]>(`${environment.baseUrl}/users`, { params })
      .pipe(catchError(this.handleError));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
