/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRoomBetterComponent } from './add-room-better.component';
import { RoomService } from '../service/room.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('AddRoomBetterComponent', () => {
  let component: AddRoomBetterComponent;
  let fixture: ComponentFixture<AddRoomBetterComponent>;
  let roomServiceMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    roomServiceMock = jasmine.createSpyObj('RoomService', ['addRoom']);
    roomServiceMock.addRoom.and.returnValue(of({}));
    
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    // TestBed.configureTestingModule({
    //   providers: [AddRoomBetterComponent, {provide: RoomService, useClass: MockRoomService},
    //                                       {provide: MessageService}
    //   ],
    // });
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddRoomBetterComponent, HttpClientModule],
      providers: [AddRoomBetterComponent,
        { provide: RoomService, useValue: roomServiceMock },
        { provide: MessageService, useValue: messageServiceMock}
      ]
    })
    .compileComponents();
    //component = TestBed.inject(AddRoomBetterComponent);
   // roomServiceMock = TestBed.inject(RoomService);
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomBetterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit and addRoom method', () => {
    component.addForm.setValue({
      name: 'Test Room',
      description: 'Test description',
      price: 100,
      roomType: 'Single',
      services: []
    });

    component.onSubmit();

    expect(roomServiceMock.addRoom).toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      key: 'bc',
      severity: 'success',
      detail: 'Stanza aggiunta correttamente!'
    });
  });
});
