/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRecapComponent } from './booking-recap.component';
import { BookingService } from '../service/booking.service';
import { RoomService } from '../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../model/room';
import { Booking } from '../model/booking';
import { of } from 'rxjs';

describe('BookingRecapComponent', () => {
  let component: BookingRecapComponent;
  let fixture: ComponentFixture<BookingRecapComponent>;
  let bookingService: any;
  let roomService: any;
  let router: any;
  let activatedRoute: any;

  beforeEach(() => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getBookingByConfirmationCode']);
    const roomServiceSpy = jasmine.createSpyObj('RoomService', ['getRoom']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [BookingRecapComponent,
        {provide: BookingService, useValue: bookingServiceSpy},
        {provide: RoomService, useValue: roomServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {
              code: '39248274829',
              id: '3'
            }
          }
        } }
      ]
    })
    .compileComponents();

    bookingService = TestBed.inject(BookingService);
    roomService = TestBed.inject(RoomService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute)

    fixture = TestBed.createComponent(BookingRecapComponent);
    component = fixture.componentInstance;
  });

    

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const mockRoom =
      { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
        services: ['WiFi']};
    const mockBooking = {
      checkIn: '2024-07-08',
      checkOut: '2024-07-10',
      guestName: 'Matteo Carello',
      guestEmail: 'adgjgd@gmail.com',
      numberOfGuest: 2
    }

    bookingService.getBookingByConfirmationCode.and.returnValue(of(mockBooking));
    roomService.getRoom.and.returnValue(of(mockRoom));
    component.ngOnInit();

    expect(bookingService.getBookingByConfirmationCode).toHaveBeenCalledWith('39248274829');
    expect(component.booking).toEqual(jasmine.objectContaining(mockBooking));
    expect(roomService.getRoom).toHaveBeenCalledWith('3');
    expect(component.room).toEqual(jasmine.objectContaining(mockRoom));
    expect(component.totalPrice).toBe(400);  //100 * 2 guests * 2 night
  })
});

