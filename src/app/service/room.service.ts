import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Room } from '../model/room';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*',
                             //'Content-Type': 'application/json',
                             //'Accept': 'application/json'
                             'Authorization': 'Bearer'
    }),
};

const httpOptions2 = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'
    //'Content-Type': 'application/json',
    //'Accept': 'application/json'
}),
responseType: 'text'
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = "http://localhost:8090/rooms";

  constructor(private http: HttpClient) {

   }

  addRoom(room: Room): Observable<Room> {
    const url = this.baseUrl+"/add/new-room";
    return this.http.post<Room>(url,room,httpOptions).pipe(catchError(this.handleError));
  }

  getRooms():Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl,httpOptions);
  }

  getRoom(roomId: number): Observable<Room> {
    const url = this.baseUrl+"/"+roomId;
    return this.http.get<Room>(url,httpOptions).pipe(catchError(this.handleError));
  }

  getRoomAdmin(roomId: number): Observable<Room> {
    const url = this.baseUrl+"/"+roomId+"/admin";
    return this.http.get<Room>(url,httpOptions).pipe(catchError(this.handleError));
  }

  getRoomTypes(): Observable<String[]> {
    const url = this.baseUrl+"/roomtypes";
    return this.http.get<String[]>(url,httpOptions).pipe(catchError(this.handleError));
  }

  getRoomServices(): Observable<String[]> {
    const url = this.baseUrl+"/services";
    return this.http.get<String[]>(url, httpOptions).pipe(catchError(this.handleError));
  }

  deleteRoom(roomId: number): Observable<Room>{
    const url = this.baseUrl+"/delete/room/"+roomId;
    return this.http.delete<Room>(url,httpOptions).pipe(catchError(this.handleError));
  }

  updateRoom(id: number,room: Room): Observable<Room> {
    const url = this.baseUrl+"/update/"+id;
    return this.http.put<Room>(url,room,httpOptions).pipe(catchError(this.handleError));
  }

  getAvailableRooms(checkIn: Date, checkOut: Date) {
    const url = this.baseUrl+"/available-rooms/"+checkIn+"/"+checkOut;
    return this.http.get<Room[]>(url,httpOptions).pipe(catchError(this.handleError));
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
