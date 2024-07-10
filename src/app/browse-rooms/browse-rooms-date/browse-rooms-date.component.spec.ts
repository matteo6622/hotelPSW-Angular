/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRoomsDateComponent } from './browse-rooms-date.component';
import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Room } from '../../model/room';

describe('BrowseRoomsDateComponent', () => {
  let component: BrowseRoomsDateComponent;
  let fixture: ComponentFixture<BrowseRoomsDateComponent>;
  let roomService: any;
  let router: any;
  let messageService: any;
  let activatedRoute: any;

  beforeEach(() => {
    const roomServiceSpy = jasmine.createSpyObj
    ('RoomService', ['getAvailableRooms', 'getRoomTypes', 'getRoomServices']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [BrowseRoomsDateComponent,
        {provide: RoomService, useValue: roomServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MessageService, useValue: messageServiceSpy},
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {
              checkIn: new Date('2024-07-08'),
              checkOut: new Date('2024-07-10')
            }
          }
        } }
      ]
    })
    .compileComponents();

    roomService = TestBed.inject(RoomService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(BrowseRoomsDateComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const mockRooms: Room[] = [
      { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] },
      { name: 'Room 2', description: 'Room 2 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] }
    ];
    const mockTypes: string[] = ['Single', 'Double'];
    const mockServices: string[] = ['WiFi', 'TV'];
    roomService.getAvailableRooms.and.returnValue(of(mockRooms));
    roomService.getRoomTypes.and.returnValue(of(mockTypes));
    roomService.getRoomServices.and.returnValue(of(mockServices));
    component.ngOnInit();

    expect(roomService.getAvailableRooms).toHaveBeenCalledWith
    (new Date('2024-07-08'), new Date('2024-07-10'));
    expect(roomService.getRoomTypes).toHaveBeenCalled();
    expect(roomService.getRoomServices).toHaveBeenCalled();

    expect(component.availableRooms).toEqual(mockRooms);
    expect(component.type).toEqual(mockTypes.reverse());
    expect(component.services).toEqual(mockServices.sort());
  })

  it('book', () => {
    component.checkIn = new Date('2024-07-08');
    component.checkOut = new Date('2024-07-10');
    component.book(3);

    expect(router.navigate).toHaveBeenCalledWith
    (['book/3/'+component.checkIn + '/'+ component.checkOut]);
  })

  it('book ERROR', () => {
    component.checkIn = new Date('2024-07-10');
    component.checkOut = new Date('2024-07-08');
    component.book(3);

    expect(messageService.add).toHaveBeenCalledWith({
      key: 'bc',
      severity: 'error',
      detail: 'La data di check-in viene prima della data di check-out!'
    });
  });

  it('back', () => {
    component.back();
    
    expect(router.navigate).toHaveBeenCalledWith(['browse-rooms']);
  })
});
