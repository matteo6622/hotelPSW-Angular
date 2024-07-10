/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomComponent } from './update-room.component';
import { of } from 'rxjs';
import { RoomService } from '../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('UpdateRoomComponent', () => {
  let component: UpdateRoomComponent;
  let fixture: ComponentFixture<UpdateRoomComponent>;
  let roomServiceStub: any;
  let activatedRouteStub: any;
  let routerStub: any;

  beforeEach(() => {
    roomServiceStub = { 
      getRoomAdmin: () => of({
        name: 'Room 1',
        description: 'A nice room',
        price: 100,
        roomType: 'Singola',
        services: 'WiFi'
      }),
      updateRoom: () => of({
        success: true
      })
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    
    activatedRouteStub = {
      snapshot: {
        params: { id: '3'}
      }
    };
    
    // TestBed.configureTestingModule({
    //   providers: [AddRoomBetterComponent, {provide: RoomService, useClass: MockRoomService},
    //                                       {provide: MessageService}
    //   ],
    // });
    TestBed.configureTestingModule({
      imports: [ UpdateRoomComponent],
      providers: [UpdateRoomComponent,
        { provide: RoomService, useValue: roomServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub}
      ]
    })
    .compileComponents();
    //component = TestBed.inject(AddRoomBetterComponent);
   // roomServiceMock = TestBed.inject(RoomService);
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoomComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit and navigate to the manage rooms page', () => {
    component.ngOnInit();
    component.onSubmit();

    expect(routerStub.navigate).toHaveBeenCalledWith(['admin/manage-rooms']);
  });
});