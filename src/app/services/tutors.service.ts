import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tutor } from '../interfaces/tutors';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  
  constructor(private http: HttpClient) {}

  getTutors(page: number, itemsPerPage: number): Observable<Tutor[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Tutor[]>(`${environment.baseUrl}/tutors`, { params }).pipe(
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

  


