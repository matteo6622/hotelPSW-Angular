/* tslint:disable:no-unused-variable */

import { TestBed} from '@angular/core/testing';
import { RoomService } from './room.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Room } from '../model/room';

describe('RoomService', () => {
  let service: RoomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService]
    });
    service = TestBed.inject(RoomService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Get Rooms', () => {
    const dummyRooms: Room[] = [
      { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] },
      { name: 'Room 2', description: 'Room 2 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] },
    ];
    service.getRooms().subscribe((rooms) => {
      expect(rooms.length).toBe(2);
      expect(rooms).toEqual(dummyRooms);
    });
    const request = httpMock.expectOne('http://localhost:8090/rooms');
    expect(request.request.method).toBe('GET');
    request.flush(dummyRooms);
  });

  it('Add Room(room)', () => {
    const newRoom: Room =
      { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] };

    service.addRoom(newRoom).subscribe((room) => {
      expect(room).toEqual(newRoom);
    });
    const request = httpMock.expectOne('http://localhost:8090/rooms/add/new-room');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newRoom);
    request.flush(newRoom);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Get Room(id)', () => {
    const dummyRoom: Room =
      { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
        services: ['WiFi'], bookings: [] };
    service.getRoom(1).subscribe((room) => {
      expect(room).toEqual(dummyRoom);
    });

    const request = httpMock.expectOne('http://localhost:8090/rooms/1');
    expect(request.request.method).toBe('GET');
    request.flush(dummyRoom);
  });

  it('Get RoomTypes', () => {
    const dummyRoomTypes: String[] =
      ['Singola', 'Doppia', 'Royal', 'Quadrupla'];
    service.getRoomTypes().subscribe((types) => {
      expect(types).toEqual(dummyRoomTypes);
    });

    const request = httpMock.expectOne('http://localhost:8090/rooms/roomtypes');
    expect(request.request.method).toBe('GET');
    request.flush(dummyRoomTypes);
  });

  it('Get RoomServices', () => {
    const dummyServices: String[] =
      ['WiFi', 'TV', 'AC'];
    service.getRoomServices().subscribe((services) => {
      expect(services).toEqual(dummyServices);
    });

    const request = httpMock.expectOne('http://localhost:8090/rooms/services');
    expect(request.request.method).toBe('GET');
    request.flush(dummyServices);
  });

  it('Delete Room(id)', () => {
    const dummyRoom: Room =
    { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
      services: ['WiFi'], bookings: [] };
    service.deleteRoom(1).subscribe((room) => {
      expect(room).toEqual(dummyRoom);
    });

    const request = httpMock.expectOne('http://localhost:8090/rooms/delete/room/1');
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyRoom);
  });

  it('Update Room(id)', () => {
    const updatedRoom: Room =
    { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
      services: ['WiFi'], bookings: [] };
    service.updateRoom(1, updatedRoom).subscribe((room) => {
      expect(room).toEqual(updatedRoom);
    });

    const request = httpMock.expectOne('http://localhost:8090/rooms/update/1');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(updatedRoom);
    request.flush(updatedRoom);
  });

  it('Get AvailableRooms(id)', () => {
    const dummyRooms: Room[] = [
    { name: 'Room 1', description: 'Room 1 description', price: 100, roomType: 'Single',
      services: ['WiFi'], bookings: [] },
    { name: 'Room 2', description: 'Room 2 description', price: 100, roomType: 'Single',
      services: ['WiFi'], bookings: [] },
    ];
    const checkIn = new Date('2024-07-08');
    const checkOut = new Date('2024-07-08');

    service.getAvailableRooms(checkIn, checkOut).subscribe((rooms) => {
      expect(rooms.length).toBe(2);
      expect(rooms).toEqual(dummyRooms);
    });

    const request = httpMock.expectOne
    ('http://localhost:8090/rooms/available-rooms/'+checkIn+'/'+checkOut);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRooms);
  });
});
