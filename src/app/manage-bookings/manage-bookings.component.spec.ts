/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ManageBookingsComponent } from './manage-bookings.component';
import { BookingService } from '../service/booking.service';
import { of } from 'rxjs';

describe('ManageBookingsComponent', () => {
  let component: ManageBookingsComponent;
  let fixture: ComponentFixture<ManageBookingsComponent>;
  let bookingService: any;

  beforeEach(() => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getAllBookings', 'deleteBooking']);
    TestBed.configureTestingModule({
      providers: [ManageBookingsComponent,
        {provide: BookingService, useValue: bookingServiceSpy}
      ]
    })
    .compileComponents();
    bookingService = TestBed.inject(BookingService);

    fixture = TestBed.createComponent(ManageBookingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const mockBookings = [
      {
      checkIn: new Date('2024-07-08'),
      checkOut: new Date('2024-07-10'),
      guestName: 'Matteo Carello',
      guestEmail: 'adgjgd@gmail.com',
      numberOfGuest: 2,
      room: [],
      numberOfDays: 2
    },
    {
      checkIn: new Date('2024-07-10'),
      checkOut: new Date('2024-07-11'),
      guestName: 'Matteo Carello',
      guestEmail: 'adgjgd@gmail.com',
      numberOfGuest: 2,
      room: [],
      numberOfDays: 2
    }
    ];

    bookingService.getAllBookings.and.returnValue(of(mockBookings));
    component.ngOnInit();

    expect(component.bookings).toEqual(mockBookings);
    expect(component.bookings[0].numberOfDays).toBe(2);
    expect(component.bookings[1].numberOfDays).toBe(1);
  })

  it('delete Booking', () => {
    bookingService.deleteBooking.and.returnValue(of({}));
    spyOn(component, 'reloadPage')
    component.deleteBooking(3);

    expect(bookingService.deleteBooking).toHaveBeenCalledWith(3);
  })
});
