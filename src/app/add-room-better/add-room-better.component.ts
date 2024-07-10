import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Room } from '../model/room';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  standalone: true,
  selector: 'app-add-room-better',
  templateUrl: './add-room-better.component.html',
  styleUrls: ['./add-room-better.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, ReactiveFormsModule,
     MatButtonModule, MessagesModule, ToastModule, MultiSelectModule
  ],
  
})
export class AddRoomBetterComponent implements OnInit {

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    roomType: new FormControl('',Validators.required),
    services: new FormControl('', Validators.required)
  });
  services: String[] = ['Aria condizionata', 'WiFi', 'Minibar', 'TV', 'Lavatrice', 'Balcone'];

  constructor(private roomService: RoomService,
     private messageService:MessageService) { }


  ngOnInit() {

  }

  onSubmit() {
    
    console.log(JSON.stringify(this.addForm.value));
    this.roomService.addRoom(new Room(this.addForm.value.name,this.addForm.value.description,
      this.addForm.value.price,this.addForm.value.roomType,
      this.addForm.value.services)).subscribe(() => {
        this.messageService.add({key:'bc', severity: 'success', detail: 'Stanza aggiunta correttamente!'});
      this.addForm.reset();
      });
      
      
      
  }

}
