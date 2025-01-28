import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Booking } from '../interfaces/booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getBooking(): Observable<Booking[]> {
    return this.http
      .get<Booking[]>(`${environment.baseUrl}/booking`)
      .pipe(catchError(this.handleError));
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
