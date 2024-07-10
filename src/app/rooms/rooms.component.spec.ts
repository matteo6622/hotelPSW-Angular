/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { RoomService } from '../service/room.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomService: any;
  let router: any;

  beforeEach(() => {
    const roomServiceSpy = jasmine.createSpyObj('RoomService', ['getRooms', 'getRoomTypes',
      'getRoomServices', 'deleteRoom']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RoomsComponent],
      providers: [RoomsComponent,
        { provide: RoomService, useValue: roomServiceSpy},
        { provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    roomService.getRooms.and.returnValue(of([]));
    roomService.getRoomTypes.and.returnValue(of([]));
    roomService.getRoomServices.and.returnValue(of([]));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and load data', () => {
    component.ngOnInit();

    expect(roomService.getRooms).toHaveBeenCalled();
    expect(roomService.getRoomTypes).toHaveBeenCalled();
    expect(roomService.getRoomServices).toHaveBeenCalled();
  });

  it('should call deleteRoom and navigate', () => {
    const roomId = 1;
    roomService.deleteRoom.and.returnValue(of({}));
    spyOn(component, 'reloadPage');
    component.deleteRoom(roomId);
    expect(roomService.deleteRoom).toHaveBeenCalledWith(roomId);
    expect(router.navigate).toHaveBeenCalledWith(['rooms']);
    expect(component.reloadPage).toHaveBeenCalled();
  });

  it('should call updateRoom and navigate', () => {
    const roomId = 3;
    component.updateRoom(roomId);
    
    expect(router.navigate).toHaveBeenCalledWith(['rooms/update/'+roomId]);
  });
});
