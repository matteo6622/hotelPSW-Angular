/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRoomsComponent } from './browse-rooms.component';
import { RoomService } from '../service/room.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Room } from '../model/room';
import { of } from 'rxjs';

describe('BrowseRoomsComponent', () => {
  let component: BrowseRoomsComponent;
  let fixture: ComponentFixture<BrowseRoomsComponent>;
  let roomService: any;
  let router: any;
  let messageService: any;

  beforeEach(() => {
    const roomServiceSpy = jasmine.createSpyObj
      ('RoomService', ['getRooms', 'getRoomTypes', 'getRoomServices']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [BrowseRoomsComponent, 
        {provide: RoomService, useValue: roomServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MessageService, useValue: messageServiceSpy}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BrowseRoomsComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
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

    roomService.getRooms.and.returnValue(of(mockRooms));
    roomService.getRoomTypes.and.returnValue(of(mockTypes));
    roomService.getRoomServices.and.returnValue(of(mockServices));
    component.ngOnInit();

    expect(component.rooms).toEqual(mockRooms);
    expect(component.type).toEqual(mockTypes.reverse());
    expect(component.services).toEqual(mockServices.sort());
  });

  it('book(roomId)', () => {
    const roomId = 3;
    component.book(roomId);

    expect(router.navigate).toHaveBeenCalledWith(['book/'+roomId]);
  })

  it('get Available Rooms ERROR', () => {
    component.checkIn = new Date('2024-07-10');
    component.checkOut = new Date('2024-07-08');
    component.getAvailableRooms();

    expect(messageService.add).toHaveBeenCalledWith({
      key: 'bc',
      severity: 'error',
      detail: 'La data di check-in viene prima della data di check-out!'
    })
  });

  it('get Available Rooms ', () => {
    component.checkIn = new Date('2024-07-08');
    component.checkOut = new Date('2024-07-10');
    component.getAvailableRooms();

    expect(router.navigate).toHaveBeenCalledWith
    (['browse-rooms/'+component.checkIn + '/'+ component.checkOut]);
  });
});
