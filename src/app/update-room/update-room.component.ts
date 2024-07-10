import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Room } from '../model/room';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, withViewTransitions } from '@angular/router';
import { MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  standalone: true,
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, ReactiveFormsModule,
    MatButtonModule, MessagesModule, ToastModule, MultiSelectModule]
})
export class UpdateRoomComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    roomType: new FormControl('',Validators.required),
    services: new FormControl('', Validators.required)
  });
  services: String[] = ['Aria condizionata', 'WiFi', 'Minibar', 'TV', 'Lavatrice', 'Balcone'];



  constructor(private router:Router, private roomService:RoomService, private aRouter: ActivatedRoute) {
    }

  ngOnInit() {
   this.roomService.getRoomAdmin(this.aRouter.snapshot.params['id']).subscribe((res) => {
    this.updateForm = new FormGroup( {
      name: new FormControl(res['name'], Validators.required),
      description: new FormControl(res['description'], Validators.required),
      price: new FormControl(res['price'], Validators.required),
      roomType: new FormControl(res['roomType'],Validators.required),
      services: new FormControl(res['services'], Validators.required)
    })
   });
  }

  onSubmit() {
      console.log(JSON.stringify(this.updateForm.value));
      this.roomService.updateRoom(this.aRouter.snapshot.params['id'],
        new Room(this.updateForm.value.name,this.updateForm.value.description,
        this.updateForm.value.price,this.updateForm.value.roomType,
        this.updateForm.value.services)).subscribe((res) => {
          console.log(res);
          this.router.navigate(['admin/manage-rooms']);
        });
      
  }

}
