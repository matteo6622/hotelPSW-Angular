/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Booking } from '../model/booking';

describe('BookingService', () => {
  let service: BookingService
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService)
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Get All Bookings', () => {
    const dummyBookings: Booking[] = [
      { checkIn: new Date('2024-07-08'), checkOut: new Date('2024-07-10'), guestName: 'Matteo Carello',
        guestEmail: 'adggdjg@gmail.com', numberOfGuest: 2, room: [], numberOfDays: 4 },
      { checkIn: new Date('2024-07-09'), checkOut: new Date('2024-07-11'), guestName: 'Matteo Carello',
        guestEmail: 'adggdjg@gmail.com', numberOfGuest: 2, room: [], numberOfDays: 4 }
    ];
    service.getAllBookings().subscribe((bookings) => {
      expect(bookings.length).toBe(2);
      expect(bookings).toEqual(dummyBookings);
    });
    
    const request = httpMock.expectOne('http://localhost:8090/bookings');
    expect(request.request.method).toBe('GET');
    request.flush(dummyBookings);
  });

  it('Get Booking By ConfirmationCode', () => {
    const dummyBooking: Booking = 
      { checkIn: new Date('2024-07-08'), checkOut: new Date('2024-07-10'), guestName: 'Matteo Carello',
        guestEmail: 'adggdjg@gmail.com', numberOfGuest: 2, room: [], numberOfDays: 4 };
    const confirmationCode = '1258385938';
    service.getBookingByConfirmationCode(confirmationCode).subscribe((booking) => {
      expect(booking).toEqual(dummyBooking);
    });
    
    const request = httpMock.expectOne('http://localhost:8090/bookings/confirmation/'+confirmationCode);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBooking);
  });

  it('Add Room', () => {
    const dummyBooking: Booking = 
      { checkIn: new Date('2024-07-08'), checkOut: new Date('2024-07-10'), guestName: 'Matteo Carello',
        guestEmail: 'adggdjg@gmail.com', numberOfGuest: 2, room: [], numberOfDays: 4 } ;
    const roomId = 3;
    const responseText = JSON.stringify(dummyBooking);
    service.bookRoom(roomId, dummyBooking).subscribe((booking) => {
      expect(booking).toEqual(responseText);
    });
    
    const request = httpMock.expectOne('http://localhost:8090/bookings/'+roomId+'/booking');
    expect(request.request.method).toBe('POST');
    request.flush(dummyBooking);
  });

  it('Delete Room', () => {
    const dummyBooking: Booking = 
      { checkIn: new Date('2024-07-08'), checkOut: new Date('2024-07-10'), guestName: 'Matteo Carello',
        guestEmail: 'adggdjg@gmail.com', numberOfGuest: 2, room: [], numberOfDays: 4 } ;
    const bookId = 3;
    service.deleteBooking(3).subscribe((response) => {
      expect(response).toBeNull();
    });
    
    const request = httpMock.expectOne('http://localhost:8090/bookings/delete/'+bookId);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
