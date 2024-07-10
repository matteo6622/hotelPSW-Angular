import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Observable, catchError, throwError } from 'rxjs';


let httpOptions: Object = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*',
                             //'Content-Type': 'application/json',
                             //'Accept': 'application/json',
                             'Authorization': 'Bearer'
                             
    }),
  responseType: 'text'
};

let httpOptions2: Object = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'
                             //'Content-Type': 'application/json',
                             //'Accept': 'application/json',
                             
    }),
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = "http://localhost:8090/bookings"

  constructor(private http: HttpClient) { }

  bookRoom(roomId: number, booking: Booking): Observable<Object> {
    const url = this.baseUrl+"/"+roomId+"/booking";
    return this.http.post<Object>(url,booking,httpOptions).pipe(catchError(this.handleError));
  }

  getAllBookings() {
    return this.http.get<Booking[]>(this.baseUrl,httpOptions2).pipe(catchError(this.handleError));
  }

  getBookingByConfirmationCode(confirmationCode:String) {
    const url = this.baseUrl+"/confirmation/"+confirmationCode;
    return this.http.get<Booking>(url,httpOptions2).pipe(catchError(this.handleError));
  }

  deleteBooking(bookId: number) {
    const url = this.baseUrl+"/delete/"+bookId;
    return this.http.delete<Booking>(url,httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
   if (error.status === 0) {
     // A client-side or network error occurred. Handle it accordingly.
     console.error('An error occurred:', error.error);
   } else {
     // The backend returned an unsuccessful response code.
     // The response body may contain clues as to what went wrong.
     console.error(
       `Backend returned code ${error.status}, body was: `, error.error);
   }
    // Return an observable with a user-facing error message.
   return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
