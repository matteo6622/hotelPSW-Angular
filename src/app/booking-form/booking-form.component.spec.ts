/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingFormComponent } from './booking-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../service/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { RoomService } from '../service/room.service';
import { HttpClientTestingModule} from '@angular/common/http/testing'

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;
  let bookingService: any;
  let router: any;
  let messageService: any;
  let activatedRoute: any;
  let roomService: any;

  beforeEach(() => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['bookRoom']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    const roomServiceSpy = jasmine.createSpyObj('RoomService', ['getRooms']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BookingFormComponent, HttpClientTestingModule],
      providers: [BookingFormComponent,
        { provide: BookingService, useValue: bookingServiceSpy},
        { provide: RoomService, useValue: roomServiceSpy},
        { provide: Router, useValue: routerSpy},
        { provide: MessageService, useValue: messageServiceSpy},
        { provide: ActivatedRoute, useValue: { 
          snapshot: {
            params: {
              id: '3'
            }
          }
        }}
      ]
    })
    .compileComponents();

    bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit and handle form submission', () => {
    component.bookForm.setValue({
      guestName: 'Matteo Carello',
      guestEmail: 'affd@gmail.com',
      checkIn: '2024-07-08',
      checkOut: '2024-07-10',
      guestsNumber: 2
    });

    const mockResponse = 'Booking successful';
    bookingService.bookRoom.and.returnValue(of(mockResponse));
    component.onSubmit();

    expect(bookingService.bookRoom).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['book-success/recap/'
      + activatedRoute.snapshot.params['id'] + '/'+ mockResponse]);
  });

  

});