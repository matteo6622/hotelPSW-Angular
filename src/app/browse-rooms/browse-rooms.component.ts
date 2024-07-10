import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { Room } from '../model/room';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TrashIcon } from 'primeng/icons/trash';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  standalone: true,
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.css'],
  imports: [TableModule, ButtonModule, TagModule, CurrencyPipe, TrashIcon, DropdownModule, FormsModule,
    CommonModule, MatFormFieldModule, MatDatepickerModule, CalendarModule, InputTextModule, ToastModule
  ],
  providers: [provideNativeDateAdapter()]
})

export class BrowseRoomsComponent implements OnInit {
  rooms!: Room[];
  type!: String[];
  services!: String[];
  checkIn!: Date;
  checkOut!: Date;
  availableRooms!: Room[];

  constructor(private roomService: RoomService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {

    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log(rooms)});
    this.roomService.getRoomTypes().subscribe((res) => {this.type = res.reverse()});
    this.roomService.getRoomServices().subscribe((res) => {this.services = res.sort()});
  }


  book(roomId: number) {
    this.router.navigate(['book/'+roomId]);
  }

  getAvailableRooms() {
    if(this.checkIn >= this.checkOut) {
      this.messageService.add({key:'bc', severity: 'error', detail:
        'La data di check-in viene prima della data di check-out!'});
    }
    else {
    this.router.navigate(['browse-rooms/'+this.checkIn+'/'+this.checkOut]);
    }
  }

}
