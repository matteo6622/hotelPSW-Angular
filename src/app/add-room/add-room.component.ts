import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from '../model/room';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RoomService } from '../service/room.service';

@Component({
  standalone: true,
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
  imports: [ ReactiveFormsModule]
})
export class AddRoomComponent implements OnInit {

  hide = true;
  addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required)
  });
  rooms!: Room[];
  index:number = 0;

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
  //  this.roomService.getRooms().subscribe(res =>
  //    this.rooms.push(res));
  }

  onSubmit() {
    console.log(JSON.stringify(this.addForm.value));
    console.log(this.addForm.value);
    this.roomService.addRoom(new Room (this.addForm.value.name,this.addForm.value.description,
      this.addForm.value.price,this.addForm.value.roomType,
      this.addForm.value.quantity)).subscribe((res:Room) => this.rooms.push(res));
  }


}
